# Domain Cutover Guide & Performance Analysis

This document outlines the recommended process for pointing your domain to Vercel and compares the performance implications of the two primary methods.

## 1. The Recommended Process (Option A: CNAME)

To point `southstarchartersnj.com` to your new Vercel site without moving your nameservers from GoDaddy:

### Step 1: Add Domain to Vercel
1. In your Vercel Dashboard, go to **Settings > Domains**.
2. Click **Add**.
3. Enter `southstarchartersnj.com` and click **Add**.
4. Vercel will suggest adding the `www` version as well. Accept this.

### Step 2: Update DNS at GoDaddy
1. Log in to your **GoDaddy DNS Management** panel.
2. Find the **CNAME** record for `www` and update its value to: `cname.vercel-dns.com`
3. Find the **A** record for the root domain (`@`) and update its value to: `76.76.21.21`
4. Save changes.

---

## 2. Performance Comparison: Option A vs. Option B

| Feature | Option A (CNAME/A Record) | Option B (Vercel Nameservers) |
|---|---|---|
| **DNS Management** | Remains at GoDaddy | Moves to Vercel |
| **Setup Speed** | Fast (2-5 minutes) | Medium (Requires NS propagation) |
| **Propagation Time** | 1-2 hours | Up to 48 hours |
| **Performance** | Excellent (Global Anycast) | **Superior** (Optimized Edge Routing) |
| **Reliability** | High (GoDaddy DNS) | Very High (Vercel Edge) |
| **Complexity** | Simple | Moderate (Must re-create MX/TXT records) |
| **Rollback** | **Instant** (Change records back) | Slow (Must change NS back) |

### Why we recommend Option A for Launch:
For a small business like SouthStar Charters, the performance difference between A and B is measured in milliseconds and is practically unnoticeable to users. However, the **safety** of Option A is significantly higher because it allows for an instant rollback if any issues are discovered post-launch.

---

## 3. SEO Migration Checklist

- [ ] **Verify Redirects:** Ensure `southstarchartersnj.com/harbor-tours/` (with trailing slash) and without it both work.
- [ ] **Sitemap Submission:** Once live, submit the new `sitemap.xml` to Google Search Console.
- [ ] **Robots.txt:** Verify that the new site is not blocking crawlers.
- [ ] **SSL Certificate:** Vercel will automatically provision a Let's Encrypt SSL once the DNS points to them.

## 4. Final Cutover Runbook

1. **Test the "Hidden" Rates Page:** Verify `/rates` is live on the Vercel preview URL.
2. **Form Test:** Submit a test lead on the Vercel preview URL and verify it appears in the Neon database.
3. **Point DNS:** Execute the GoDaddy DNS changes.
4. **Monitor:** Use Vercel's "Realtime Logs" to watch for any 404s or errors as traffic shifts.
