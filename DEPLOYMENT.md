# Deployment Guide

## Preview / Development

The site is currently in **preview** mode. The security headers workflow uses an insecure SSL flag (`-k`) in the `curl` command to allow the CI check to pass while the SSL/TLS certificate is not yet fully configured.

## Before Production Launch!

> **Important:** Remove the `-k` flag from the `curl` command in `.github/workflows/security-headers.yml` before going live to enforce secure SSL validation.

In `.github/workflows/security-headers.yml`, restore the curl command to:

```sh
# Production-safe version (no -k flag):
RESPONSE=$(curl -sI https://southstarchartersnj.com)
```

The current preview version uses:

```sh
# Preview only — bypasses SSL verification. DO NOT use in production:
RESPONSE=$(curl -ksI https://southstarchartersnj.com)
```

Leaving the `-k` flag in production would allow the CI check to pass even if the SSL certificate is invalid or expired, which is a security risk.

## Production Launch Checklist

- [ ] Ensure `https://southstarchartersnj.com` has a valid SSL/TLS certificate
- [ ] Remove the `-k` flag from `curl` in `.github/workflows/security-headers.yml`
- [ ] Verify all security headers are present and passing in the "Verify Security Headers" workflow
- [ ] Run a full deployment and confirm the site is accessible over HTTPS without certificate errors
