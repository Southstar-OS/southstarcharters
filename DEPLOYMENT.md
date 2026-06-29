# Deployment Guide

## How this site deploys

**Deployment is handled entirely by Vercel's Git integration.** There is **no**
GitHub Actions deploy workflow and **no `VERCEL_TOKEN`**.

- **Push to `main` → production** deploy (`https://southstarchartersnj.com`).
- **Open a PR → preview** deploy, with the preview URL posted on the PR.

Vercel builds and deploys on its own infrastructure. Nothing in this repo runs
`vercel pull` / `vercel build` / `vercel deploy`, and no Vercel credentials are
stored as GitHub Actions secrets.

### ⛔ Do NOT add a GitHub Actions deploy workflow

A token-based `deploy.yml` (using `VERCEL_TOKEN` / `VERCEL_ORG_ID` /
`VERCEL_PROJECT_ID`) was added and removed repeatedly in this repo's history. It
**always breaks** because Vercel tokens expire, and every re-add reintroduced the
same chronic failure. Don't bring it back.

A CI guard (`Reject token-based Vercel deploy` in `.github/workflows/ci.yml`)
**fails the build** if any workflow reintroduces `VERCEL_TOKEN` or a `vercel`
deploy command. If you hit that error, the fix is to remove the deploy workflow —
not to refresh a token.

### If deploys aren't happening

The fix is in the **Vercel dashboard**, not in this repo:

1. Project → **Settings → Git** → confirm the repo is connected and
   **Production Branch = `main`**, with automatic deployments enabled.
2. Confirm the `southstarchartersnj.com` domain is assigned to this project's
   **Production** environment.
3. To force a deploy of the latest commit: **Deployments → ⋯ → Redeploy**.

The `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` GitHub secrets are
unused and can be deleted.

## Build configuration

- Framework: **Next.js** (auto-detected by Vercel).
- Package manager: **pnpm** (pinned via `packageManager` in `package.json`).
- Required environment variables (set in Vercel → Settings → Environment Variables):
  - `NEXT_PUBLIC_SITE_URL` — `https://southstarchartersnj.com`.
- Optional environment variables:
  - `WEB3FORMS_ACCESS_KEY` — [Web3Forms](https://web3forms.com) access key the contact
    form uses to email submissions. A working key is committed as the default in
    `app/api/contact/route.ts` (Web3Forms keys are designed to be public), so the form
    works with **no configuration**. Only set this env var to **rotate** the key —
    generate a new one in the Web3Forms dashboard and the env var overrides the default
    with no code change.
  - `DATABASE_URL` — **not used.** This site has no database; the contact form delivers
    submissions by email via Web3Forms. If a leftover `DATABASE_URL` is set in Vercel, it
    can be deleted.

## Before production launch — SSL check

The `security-headers` workflow currently uses an insecure SSL flag (`-k`) in its
`curl` command so the CI check passes before the SSL/TLS certificate is fully
configured.

> **Important:** remove the `-k` flag from the `curl` command in
> `.github/workflows/security-headers.yml` before going live, to enforce secure
> SSL validation.

```sh
# Preview only — bypasses SSL verification. DO NOT use in production:
RESPONSE=$(curl -ksI https://southstarchartersnj.com)

# Production-safe version (no -k flag):
RESPONSE=$(curl -sI https://southstarchartersnj.com)
```

Leaving `-k` in production would let the CI check pass even if the certificate is
invalid or expired.

## Production launch checklist

- [ ] Vercel **Production Branch = `main`**, auto-deploy on, domain assigned to Production.
- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel env vars.
- [ ] Submit the live contact form once and confirm the email arrives (Web3Forms).
- [ ] `https://southstarchartersnj.com` has a valid SSL/TLS certificate.
- [ ] Remove the `-k` flag from `curl` in `.github/workflows/security-headers.yml`.
- [ ] Confirm all security headers pass in the "Verify Security Headers" workflow.
- [ ] Confirm the site is accessible over HTTPS without certificate errors.
