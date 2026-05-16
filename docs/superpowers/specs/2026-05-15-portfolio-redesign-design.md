# Portfolio Redesign Design Spec

**Date:** 2026-05-15
**Target site:** Bbrizly.github.io (Jekyll, single-page)
**Audience optimization:** General SWE recruiters (20-second scan)

## Goal

Convert the site from a "scrollable resume with pictures" into a portfolio that, in the first second, communicates: shipping production engineer with credible range across game engines, ML, and accessibility. The current site presents every project with identical resume-grade chrome and hides personality behind a paragraph blob.

## What's changing (top-level)

1. Top section-nav removed.
2. Hero replaced: split layout, full-bleed tilted project mosaic on the right, Apple-style frosted glass on the left holding identity.
3. About content reorganized from one paragraph into three icon-prefixed scannable lines.
4. Projects gain a filter row with a small intentional taxonomy plus a "no-image" card variant so text-only projects don't read as empty.
5. Awards reformatted as a continuous marquee strip (with guards: slow speed, hover-pause, static fallback under `prefers-reduced-motion`).
6. The two old hero CTAs ("View Projects" duplicate of the section below, "Download Resume" duplicate of the header icon) are removed and replaced with two new CTAs ("See projects ↓" primary, "Resume" secondary) that serve different purposes from the old ones (primary scroll action plus secondary direct-resume).

## Hero

**Structure:** Split, left 58% content + right 42% mosaic, full-bleed dark background `#060912`. Height ~680px desktop.

**Mosaic background:**
- Spans the full hero (extends behind the left content panel)
- 6 horizontal rows of project thumbnails, ~320×200 each, rounded 8px
- Rotated `-12deg`
- Alternating scroll directions, varied speeds (50s, 65s, 75s, 55s, 60s, 70s linear infinite)
- Tile content: project screenshot/video frame with label overlay
- Thumbnail sources: real images from `assets/images/*` (webp with png fallback) for each project that has media. Tiles for projects without media use the styled gradient placeholder from the no-image card variant so the mosaic is visually consistent. No CSS-only gradient placeholders ship to production.
- The mosaic is decorative. The whole `.mosaic-bg` wrapper carries `aria-hidden="true"` and all child `<img>` elements use `alt=""`. Screen readers skip the mosaic entirely. The about block on the left carries the actual identity content.

**Frosted glass (Apple-style, locked values):**

```css
:root {
  --blur: 47px;
  --falloff: 51;
  --softness: 32;
  --tint: 0.99;
  --width: 68;
}
```

Three stacked blur layers (8px / ~21px / 47px equivalents), each wider than the last, all using a horizontal mask gradient where the fade-out softness is driven by `--softness`. The outermost layer extends past `--falloff` to dissolve the edge organically. The right side of the hero remains nearly unobstructed mosaic.

**Foreground content (left panel):**

- Eyebrow: `Portfolio · 2026`
- H1: `Bassam Kamal` (60-64px, Poppins 600, letter-spacing -0.01em)
- About block: three icon-prefixed lines (see About section below)
- Two CTAs: `See projects ↓` (primary, accent blue) and `Resume` (frosted secondary)

**Removed from hero:** the original carousel, the GPA stat line, the "Shipping production code" filler chip, and the "Download Resume" button (resume is in header icons).

## About block

Three lines, each with a small rounded icon-tile prefix:

| Icon | Line | Meta |
|------|------|------|
| `SE` | **Software Engineer** at Iron Fox Games | Charlottetown PEI · Shipping production C++ and web tooling |
| `CS` | **B.Sc. Computer Science** · UPEI 2026 | Specialization in Video Games |
| `←→` | **I build** custom 3D engines, ML systems, and accessibility tools | (no meta) |

Stack vertically with 14px gap. Replaces the existing paragraph and the hero-stats trio.

## Header

Keep the existing header (name + 4 social icons: LinkedIn, GitHub, Email, Resume).

Remove the section navigation (`#about #projects #experience #skills #awards #education #contact`).

## Projects

**Filter row (the small intentional taxonomy):**

```
All (11) · Games & Graphics (7) · AI / ML (2) · Accessibility (2) · Mobile & Web (3) · Shipped (1)
```

"Shipped" filter is for projects deployed and actively in use by real users outside the dev environment. Currently QuadStick qualifies. Iron Fox production work is captured under Work Experience, not Projects.

Active chip: dark filled (`#1a2436` background, white text). Inactive: white pill, gray border, hover -> blue. Counts shown in muted suffix.

Project-to-tag mapping (matches current `index.html`):

| Project | Tags |
|---------|------|
| Volpe Engine | Games & Graphics |
| Adaptiv AI | AI / ML, Accessibility |
| QuadStick Config | Accessibility, Shipped |
| Pokemon Go-style | Mobile & Web, Games & Graphics |
| OpenGL Cityscape | Games & Graphics |
| GPU Particle System | Games & Graphics |
| Multiplayer Racing | Games & Graphics |
| Upstart | AI / ML, Mobile & Web |
| Cabin Boy | Games & Graphics |
| Expiry | Mobile & Web |
| OpenGL Text Renderer | Games & Graphics |

Total: 11 projects. Expiry was missing from the prior version of this spec and is now included.

Volpe gets an "Open source" badge. Adaptiv AI and Upstart get award badges. QuadStick gets a "Deployed & in use" badge. The other projects show no badge.

**Filter chip behavior:**
- Rendered as `<button role="tab" aria-pressed="false">` (active chip has `aria-pressed="true"`)
- Exactly one active at a time (radio semantics)
- Clicking applies `display: none` to non-matching cards. The featured card (Volpe) loses its `span-2` class when filtered out of the active set and is restored on `All`. When the active filter hides Volpe entirely, the next-most-featurable card with media steps into the span-2 slot (priority order: Adaptiv AI, OpenGL Cityscape, GPU Particle System).
- Card-to-tag association is declared via `data-tags="games-graphics accessibility"` on each `.card`. Filter JS reads this and toggles a `.is-hidden` class (CSS handles `display: none` via that class so the animation hook stays clean).
- Counts in the chip labels are computed at page load from the same `data-tags` attributes, not hand-written, to prevent drift.
- The chip row container gets `aria-label="Filter projects by category"`. After a filter is applied, an `aria-live="polite"` element (visually hidden) announces "Showing N of 11 projects in {category}".
- Keyboard: arrow keys move between chips per WAI-ARIA tablist pattern, Enter/Space activate.
- Reduced motion: filter transitions disabled, cards swap instantly.

**Grid:** three columns. Featured (Volpe) spans 2 columns with a wider 16:8 image. Remaining cards 1 column each.

**Card variant — with image:**
- Top: 16:10 image area (real screenshot or video frame)
- Body: tag chips, h3 title, 2-3 line description, optional footer badge

**Card variant — no image:**
- Top: 16:10 styled stack-tile with a gradient matching the project's domain (blue=engine/graphics, green=accessibility, purple=AI, deep-blue=mobile)
- Three text rows on the tile: small monospace glyph (e.g. `// AI · COMPUTER VISION`), large project name (26px, 700), framework tag chips
- Body: description and optional footer badge
- The card body suppresses its own `.tags` row because the tile already shows them

Badge styles:
- Award: warm cream background `#fff5e1`, brown text
- Shipped: green `#e8f7ed`, dark green text

## Awards & Recognition

Replace the vertical icon-row list with a horizontal continuous marquee.

**Card structure** (340px wide, gap 24px, padding 20px 22px, dark gradient surface with subtle white border):

```
[64x64 tile w/ icon]  WHEN · WHERE
                      Award Title
                      Venue · Project
```

Animation: `scroll-l` **80s** linear infinite (slower than the original 45s so cards stay on screen long enough for a recruiter to actually read them). Duplicate the 4 award cards once for seamless loop. Edge mask on the marquee container (`mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`) so cards fade into the background on both sides instead of clipping abruptly. Hover-to-pause via `animation-play-state: paused`. Focus within any award card also pauses (keyboard).

**`prefers-reduced-motion` fallback:** The marquee track stops animating and is laid out as a static 2-row × 2-column grid of award cards. Same visual style, no motion, no edge mask. This guarantees the awards remain readable proof for users with reduced motion preferences.

**Why marquee survives the recruiter-scan critique:** A purely static list of four awards reads as "this person has four awards" and the eye stops. A slow marquee with hover-pause reads as "this person has won enough that it doesn't all fit in one row," which is the scan signal we actually want. The 80s speed plus hover-pause plus reduced-motion fallback addresses the legibility concern without losing the visual cue. If implementation reveals it still scans poorly, the fallback grid is a one-class swap away.

Section background: same dark `#060912` as the hero, so the awards bookend the page in the same palette and the projects section sits between them as a light interlude.

## Sections to keep mostly as-is

- **Work Experience** — keep the existing two-tab structure (Iron Fox / Teaching Assistant). Bullets are fine. Restyle to match new spacing scale only.
- **Technical Skills** — keep three-column grouping (Languages / Frameworks & Tools / Technical Areas). User said it's fine, just looks slightly off. Apply unified card padding and tag style.
- **Education** — keep card. GPA stays in this section only, not in hero.
- **Contact** — keep three-link layout.

## Sections to remove

- Top section-nav (`<nav>` block inside `_includes/header.html`)
- The `.hero-cta` block (both buttons)
- The `.hero-stats` trio
- The original `.showcase` carousel (replaced by mosaic)

## Color and typography

- Background dark: `#060912` (hero, awards)
- Background mid: `#0a0f1a` (page chrome, dark sections)
- Background light: `#f7f9fc` (projects section)
- Accent: `#3b6fe5` (CTAs, links, active chip)
- Accent light: `#7aa7ff` (hover, glyphs, subtle highlights)
- Ink: `#e6ecf4` (primary on dark)
- Ink muted: `#cfd8e3`, dim: `#9bb5d6`
- Body type: Poppins (already loaded), 300/400/500/600/700
- No em dashes anywhere (project style)
- Accent stays blue across the site; no warm accents except award badge cream

## Implementation notes

**Files touched:**
- `index.html` — hero replacement, about lines, projects markup, awards marquee, remove deprecated sections. Each project `.card` gets a `data-tags="games-graphics accessibility"` attribute that drives both the filter behavior and the filter-chip counts.
- `_includes/header.html` — remove `<nav>` block
- `assets/css/style.css` — replace hero, projects, awards styles; introduce CSS variables; new card variants
- `assets/js/myscripts.js` — remove old showcase carousel logic and section-nav scroll logic; add filter-chip behavior (toggle active state, hide/show cards by `data-tags` membership, recompute featured slot, announce result count via `aria-live`); marquees are pure CSS, no JS
- Per-project pages live as `projects/project*.md` (Jekyll Markdown, rendered via `_layouts/project.html`). Restyling those pages is out of scope for this redesign and stays unchanged.

**Accessibility:**
- Honor `prefers-reduced-motion`: pause both the hero mosaic and the awards marquee
- Frosted glass needs a `@supports not (backdrop-filter: blur(10px))` fallback that uses a solid `rgba(6,9,18,0.85)` panel
- Filter chips use proper `<button>` elements with `aria-pressed` state
- Skip link kept; section IDs remain since the section-nav removal still allows direct linking

**Performance:**
- Hero mosaic: ~6 rows × 12 thumbnails = 72 DOM tiles. Each is an `<img>` with webp src (existing pattern, `<picture>` with png fallback). Off-screen duplicates use `loading="lazy"`. To keep memory reasonable, the mosaic should reference a small set of distinct images (one per project) repeated across rows, not 72 unique decodes.
- Marquee uses `transform: translateX` keyframes (GPU-friendly, no layout thrash).
- The 3-layer `backdrop-filter` stack only renders on Desktop. Tablet drops to a single 32px layer; Phone uses a solid panel. This is the main mitigation against the mobile-Safari paint cost called out during review.
- Color contrast: the muted text colors (`#cfd8e3`, `#9bb5d6`) on `#060912` background must hit WCAG AA (4.5:1 for normal text, 3:1 for large). Verify during implementation, darken the dim ink if needed.

**Out of scope for this redesign:**
- Real project screenshots for the no-image cards. Cards work without them but capture real visuals in a follow-up. Volpe, Cityscape, Text Renderer, Particle System already have media.
- Per-project deep pages (`projects/project*.md`) keep current styling, restyle later.

## Responsive breakpoints

Three explicit breakpoints. The transition between them must not require any JS.

**Desktop (≥1024px):** as specified above. Split hero 58/42, mosaic with 6 rows, full blur stack, 3-column project grid with Volpe spanning 2 columns, full marquee.

**Tablet (640–1023px):**
- Hero collapses to a single column. Identity content on top (centered or left-aligned), mosaic clipped to a ~280px tall band beneath the content. Glass blur becomes a single 32px layer (drop the 3-layer stack to ease GPU load).
- H1 scales to 48px.
- Project grid becomes 2 columns. Featured (Volpe) spans both columns. No-image and image cards both keep their full tile design.
- Filter chip row stays as a single horizontal row with `overflow-x: auto`, `scrollbar-width: thin`, and a `mask-image` edge fade to hint scrollability.
- Awards marquee continues, card width reduces to 280px.

**Phone (<640px):**
- Mosaic hides entirely (`display: none` for the mosaic, dark gradient background only). Glass blur becomes a solid `rgba(6,9,18,0.92)` panel (no `backdrop-filter`).
- H1 scales to 36px. About lines drop the icon-tile prefix, become plain lines with `→` separators (saves horizontal space).
- Project grid collapses to 1 column. Featured card becomes a regular 1-column card.
- Filter chips: horizontal scroll as on tablet.
- Awards marquee continues at the same 80s speed but card width shrinks to 240px and the icon tile shrinks to 48px.
- All section vertical padding reduces by ~30%.

**Below all breakpoints:** the reduced-motion fallback for the awards strip applies regardless of viewport.
