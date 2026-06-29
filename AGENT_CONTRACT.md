# SOUTHSTAR CHARTERS — AGENT OPERATING CONTRACT
Repo: Southstar-OS/southstarcharters | Stack: Next.js 16 + pnpm
Scope: This contract governs ALL agent-team work in this repo. Read first, every run.

## 0. ENTITY BOUNDARY
- This is a SouthStar-owned MARKETING site (fishing charters). Southstar Charters is a
  DBA of Southstar Technology (the marketing/tech parent). It holds NO borrower data,
  NO 1003 fields, NO regulated mortgage content.
- A SEPARATE, UNRELATED "SouthStar Technology LLC" exists in the owner's MORTGAGE
  business (licensor/IP entity). Nothing from that mortgage-side identity — no EIN,
  mortgage/LOS/patent language, or NorthStar Funding reference — may appear anywhere in
  this site's copy, schema, configs, or comments. This site's "Southstar Technology"
  context is ONLY the fishing/marketing parent.
- This repo is NOT part of HC (nsfunding-hero-control) or NP (northstar-platform).
  Agents may NEVER pull patterns, code, secrets, or config FROM or TO the mortgage
  repos. This repo is sandboxed. No cross-repo reads.

## 1. JOB CLASSIFICATIONS
- RECON    — read-only. No file writes. Produces findings only.
- DESIGN   — proposes an approach. STOPS for sign-off before any code.
- FIX      — narrow, single-concern correction of a known defect.
- IMPLEMENT— new feature/behavior.
- HARDEN   — security/correctness tightening; requires red→green proof.

## 2. PRE-FLIGHT (every job, before any work)
1. Confirm working dir is the southstarcharters checkout, branch = main (or the stated
   feature branch), clean tree.
2. git fetch origin; confirm clean tree ("nothing to commit").
3. State the current main SHA.
4. Restate the job in ONE sentence.
5. State the job classification (RECON/DESIGN/FIX/IMPLEMENT/HARDEN).

## 3. HARD RULES
- ONE CONCERN PER JOB. No scope expansion. No "while I'm here" edits.
- NO SELF-MERGE. Joe reviews every diff before merge. Hard stop at the gate.
- GROUND TRUTH OVER MEMORY. Every claim resolves to file:line at the stated SHA or a
  live read. No inference. Contradictions are findings, reported — never silently
  reconciled.
- DESIGN stops for sign-off before code. FIX/IMPLEMENT/HARDEN present a short plan
  first and WAIT for approval unless explicitly marked trivial.
- Read the file before editing it. Never edit against memory of the file.
- No new dependencies without naming them in the plan and getting approval.
- Do NOT touch pnpm-lock.yaml unless the job IS the lockfile.
- TypeScript strict. Zod on all external/runtime inputs. No `any` without justification.
- Branch naming: fix/, feat/, chore/ prefixes. Cut fresh from origin/main.
- NO AI co-author attribution in commits. No Co-authored-by from any agent.

## 4. DATA INTEGRITY (regulatory + factual content)
- Regulatory data (fishing seasons, size/bag limits, licensing/registration rules) is
  legally specific and changes. NEVER generate it from model knowledge. Use VERIFY-
  flagged placeholders sourced from the governing authority (NOAA Fisheries / ASMFC /
  NJ DEP), owner-confirmed before publish.
- NAP / location / phone data must be EXACT and owner-verified. Invent nothing — no fake
  addresses, hours, emails, or numbers.
- Imagery must be rights-cleared (NOAA public-domain or owner-licensed), credited, with
  a rightsVerified flag. No image committed without owner approval.
- Season dates live in ONE source of truth; other surfaces reference, never restate.

## 5. PARALLELISM GUARD
- The WIP cap was removed upstream. Agents must respect file-conflict detection and NOT
  run concurrent steps that touch the same file.
- For any multi-step write job, use git worktree isolation per step.
- If two steps would edit one file, serialize them. Report the conflict.

## 6. DEFINITION OF DONE (every job closes with this block)
- [ ] Classification + one-sentence job restated
- [ ] Pre-flight confirmed (clean tree, SHA stated)
- [ ] Scope held — only the named concern changed
- [ ] git diff reviewed and pasted for Joe
- [ ] Tests/build pass (pnpm install --frozen-lockfile; pnpm build) OR reason stated
- [ ] No cross-repo reads; no mortgage/borrower PII; no entity-boundary violation
- [ ] No invented regulatory/NAP data; placeholders VERIFY-flagged where applicable
- [ ] Branch pushed, PR opened against main, NOT merged
