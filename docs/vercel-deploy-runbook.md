# Vercel Deploy — Credentials Refresh Runbook

Runbook for the recurring **"Deploy to Vercel" failure** (tracked in issue #47).

**Symptom:** the `Deploy to Vercel` workflow fails at the `vercel pull` step with
`Error: Could not retrieve Project Settings`. The three repo secrets exist but no
longer resolve to a reachable Vercel project — most likely the **token expired**,
the token lacks **team scope**, or the project was **moved / renamed / deleted**.

The three secrets the workflow uses (`.github/workflows/deploy.yml`):
`VERCEL_TOKEN`, `VERCEL_ORG_ID` (team id), `VERCEL_PROJECT_ID`.

> Run all of this from your own machine where you're logged into Vercel.
> **Never paste a token into chat, a PR, an issue, or this repo.**

## Step 1 — Diagnose which of the three is wrong (optional, fast)

```bash
npm i -g vercel                                  # if you don't have the CLI
vercel whoami --token=YOUR_CURRENT_TOKEN         # auth error => token expired/invalid
vercel projects ls --token=YOUR_CURRENT_TOKEN    # project absent => moved/deleted
```

- Auth error → it's the **token** (Step 2a).
- Auth OK but the project isn't listed → it was **moved / renamed / deleted** →
  confirm it still exists, then re-link (Step 2b).

### Common error: "Not authorized: Trying to access resource under scope"

```
Error: Not authorized: Trying to access resource under scope "southstar-os".
You must re-authenticate to this scope or use a token with access to this scope.
```

This means the token is recognized but **was not scoped to the `southstar-os` team**
when it was created. The fix is in Step 2a — create a new token and scope it to the
**team** (not just your personal account).

## Step 2a — Create a fresh token

Vercel dashboard → **Account Settings → Tokens → Create Token**. Scope it to the
**team that owns the project** (`southstar-os`); set a long (or no) expiration to
avoid recurrence. Copy it once.

> **Important:** when creating the token, set the scope to the **team** (e.g.
> `southstar-os`), not to your personal account. A personal-account token will
> authenticate (`vercel whoami` passes) but will fail at `vercel pull` / `vercel deploy`
> with a scope-authorization error.

## Step 2b — Get the current Org (team) ID + Project ID

Easiest is to let the CLI write them for you:

```bash
cd <the southstarcharters repo>
vercel login
vercel link                 # pick the correct team + the southstarcharters project
cat .vercel/project.json    # -> { "orgId": "team_xxx", "projectId": "prj_xxx" }
rm -rf .vercel              # don't commit this; .vercel is gitignored anyway
```

`orgId` = `VERCEL_ORG_ID`, `projectId` = `VERCEL_PROJECT_ID`.
(Or read them in the dashboard: Project → **Settings → General** for the Project
ID; Team → **Settings** for the Team ID.)

## Step 3 — Update the three GitHub Actions secrets

UI: repo → **Settings → Secrets and variables → Actions** → update each.
Or with the `gh` CLI:

```bash
gh secret set VERCEL_TOKEN      --repo Southstar-OS/southstarcharters   # paste the new token when prompted
gh secret set VERCEL_ORG_ID     --repo Southstar-OS/southstarcharters --body "team_xxx"
gh secret set VERCEL_PROJECT_ID --repo Southstar-OS/southstarcharters --body "prj_xxx"
```

## Step 4 — Verify

Re-run the deploy: push to `main`, or **Actions → Deploy to Vercel → Run
workflow** (workflow_dispatch), or **Re-run failed jobs** on the latest run.

- ✅ `vercel pull` now succeeds and the build/deploy completes.
- The `Deploy Preview` check on PRs should also go green.

## After it's green

- Note the new token's expiry somewhere so it doesn't silently lapse again.
- For zero maintenance, the Vercel **Git integration** (connect the repo in the
  Vercel dashboard) deploys without storing a CLI token in GitHub at all — an
  alternative to this token-based workflow.

## What the workflow does to surface this faster

The workflow (`deploy.yml`) includes two preflight checks in both jobs:

1. **"Verify Vercel secrets are configured"** — fails immediately with a clear error if
   any of the three secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) are
   empty, before spending time installing dependencies or the Vercel CLI.

2. **`vercel whoami` authentication probe** — runs inside the "Pull Vercel project
   settings" step, immediately after installing the Vercel CLI. `VERCEL_ORG_ID` is
   intentionally unset for this check so it tests **token identity only** (not team
   scope); Vercel CLI ≥54 scopes `whoami` to the org when `VERCEL_ORG_ID` is present,
   which causes misleading scope-auth failures for otherwise valid tokens. If the token
   is expired or invalid, the step fails with:
   ```
   ::error::Vercel authentication failed. VERCEL_TOKEN may be expired or invalid.
   ::error::See docs/vercel-deploy-runbook.md for instructions to refresh credentials.
   ```
   A valid token that lacks **team scope** will pass `whoami` and fail at `vercel pull`
   instead — look for `Not authorized: Trying to access resource under scope` in that
   step's output, and follow Step 2a above to create a team-scoped token.
