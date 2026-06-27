# Vercel Deploy — Credentials Refresh Runbook

Runbook for the recurring **"Deploy to Vercel" failure** (tracked in issue #47).

**Symptom:** the `Deploy to Vercel` workflow fails at the `vercel pull` step with
`Error: Could not retrieve Project Settings`. The three repo secrets exist but no
longer resolve to a reachable Vercel project — most likely the **token expired**,
or the project was **moved / renamed / deleted**.

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

## Step 2a — Create a fresh token

Vercel dashboard → **Account Settings → Tokens → Create Token**. Scope it to the
**team that owns the project**; set a long (or no) expiration to avoid recurrence.
Copy it once.

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
