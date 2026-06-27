# Owner Data-Fill Checklist — Species & Seasons

This page (`/species`) ships with **placeholder data only**. Every season window is
the sentinel `"00-00"`, every entry is `verify: true`, and the page renders
"Dates pending verification" with **no** in/out-of-season claim until you fill in
real values. Nothing on the page is presented as factual until you clear it.

This checklist is the systematic path to clearing every placeholder. All edits are
in **`lib/data/speciesSeasons.ts`**.

## How to fill one season

For each `season` entry in a species:

1. Replace `openDate: "00-00"` and `closeDate: "00-00"` with the real
   `"MM-DD"` window from the governing authority. If the season wraps the year
   end (e.g. autumn → spring), set `closeDate` earlier than `openDate`
   (e.g. open `"10-10"`, close `"04-30"`) — the calendar handles the wrap.
2. Add `minSizeInches:` and `bagLimit:` with the confirmed values.
3. Update `notes:` (or remove the PLACEHOLDER note).
4. When **all** of a species' seasons are filled and confirmed, change that
   species' `verify: true` to `verify: false`. The "Unverified placeholder"
   badge disappears only when `verify` is false.

> Closed for a jurisdiction? Use a window that reflects it, or remove that
> jurisdiction's season entry. Don't leave `"00-00"` on a published species.

## Sourcing map — which authority each jurisdiction resolves against

| Jurisdiction | Authority to check |
|---|---|
| `federal` | **NOAA Fisheries (NMFS)** recreational regs. HMS species also need a **NOAA HMS Angling/Charter permit**. |
| `interstate` | **ASMFC** fishery management plan, **as implemented by NJ** (NJ adopts the ASMFC-coordinated rule). |
| `state` | **NJ DEP Division of Fish & Wildlife** marine digest (0–3 nmi). |

## Per-species checklist

Each box is one season window to confirm (open, close, min size, bag limit).
HMS = requires NOAA Highly Migratory Species permit.

### Inshore / nearshore
- [ ] **Striped Bass** — `interstate` (ASMFC) · `state` (NJ F&W)
- [ ] **Summer Flounder (Fluke)** — `federal` (NOAA) · `state` (NJ F&W) — *state and federal windows often differ; confirm both*
- [ ] **Bluefish** — `interstate` (ASMFC)
- [ ] **Weakfish** — `interstate` (ASMFC) · `state` (NJ F&W)
- [ ] **False Albacore (Little Tunny)** — `state` (NJ F&W) — *confirm whether NJ sets any limit*
- [ ] **Atlantic Bonito** — `state` (NJ F&W) — *confirm whether NJ sets any limit*

### Offshore canyons
- [ ] **Bluefin Tuna** — `federal` (NOAA **HMS**) — *category/size-class rules change in-season*
- [ ] **Yellowfin Tuna** — `federal` (NOAA **HMS**)
- [ ] **Big-Eye Tuna** — `federal` (NOAA **HMS**)
- [ ] **Longfin Tuna (Albacore)** — `federal` (NOAA **HMS**)
- [ ] **Mahi (Dolphinfish)** — `federal` (Mid-Atlantic FMP) — *no HMS permit*
- [ ] **Wahoo** — `federal` — *no HMS permit*
- [ ] **Marlin (Billfish)** — `federal` (NOAA **HMS**) — *confirm retention vs catch-and-release / landing rules*
- [ ] **Swordfish** — `federal` (NOAA **HMS**)

## Before publish

- [ ] Every `"00-00"` replaced with a real window (or the season entry removed).
- [ ] `minSizeInches` / `bagLimit` filled where the authority sets them.
- [ ] `permitRequired` still correct (tunas, billfish, swordfish, sharks = `true`).
- [ ] All confirmed species set to `verify: false`.
- [ ] Re-read the on-page disclaimer — it stays regardless; regulations change.

> Reminder: seasons and limits change yearly (and sometimes in-season). Even after
> filling, the disclaimer and a periodic re-check against NOAA / ASMFC / NJ F&W
> remain necessary.
