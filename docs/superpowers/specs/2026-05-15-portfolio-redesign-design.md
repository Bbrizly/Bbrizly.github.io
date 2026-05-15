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
5. Awards reformatted as a continuous marquee strip.
6. Two redundant CTAs ("View Projects", "Download Resume") removed.

## Hero

**Structure:** Split, left 58% content + right 42% mosaic, full-bleed dark background `#060912`. Height ~680px desktop.

**Mosaic background:**
- Spans the full hero (extends behind the left content panel)
- 6 horizontal rows of project thumbnails, ~320×200 each, rounded 8px
- Rotated `-12deg`
- Alternating scroll directions, varied speeds (50s, 65s, 75s, 55s, 60s, 70s linear infinite)
- Tile content: project screenshot/video frame with label overlay
- Thumbnail sources reuse existing `assets/images/*` and project poster frames

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
All (9) · Games & Graphics (7) · AI / ML (2) · Accessibility (2) · Mobile & Web (2) · Shipped (1)
```

"Shipped" filter is for projects deployed and actively in use by real users outside the dev environment. Currently QuadStick qualifies. Iron Fox production work is captured under Work Experience, not Projects.

Active chip: dark filled (`#1a2436` background, white text). Inactive: white pill, gray border, hover -> blue. Counts shown in muted suffix.

Project-to-tag mapping:

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
| OpenGL Text Renderer | Games & Graphics |

Volpe gets an "Open source" badge. Adaptiv AI and Upstart get award badges. QuadStick gets a "Deployed & in use" badge. The other projects show no badge.

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

Animation: `scroll-l` 45s linear infinite. Duplicate the 4 award cards once for seamless loop. Edge mask on the marquee container (`mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`) so cards fade into the background on both sides instead of clipping abruptly. Hover-to-pause via `animation-play-state: paused`.

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
- `index.html` — hero replacement, about lines, projects markup, awards marquee, remove deprecated sections
- `_includes/header.html` — remove `<nav>` block
- `assets/css/style.css` — replace hero, projects, awards styles; introduce CSS variables; new card variants
- `assets/js/myscripts.js` — remove old showcase carousel logic; no new JS needed for marquees (CSS animation), filter chips need light JS to toggle visibility
- New: small project-tag data structure inline in HTML via `data-tags="games-graphics accessibility"` on each card

**Accessibility:**
- Honor `prefers-reduced-motion`: pause both the hero mosaic and the awards marquee
- Frosted glass needs a `@supports not (backdrop-filter: blur(10px))` fallback that uses a solid `rgba(6,9,18,0.85)` panel
- Filter chips use proper `<button>` elements with `aria-pressed` state
- Skip link kept; section IDs remain since the section-nav removal still allows direct linking

**Performance:**
- Hero mosaic: ~6 rows × 12 thumbnails = 72 DOM tiles. Each is a CSS gradient, no images yet. When real images go in, use `loading="lazy"` on off-screen duplicates, `picture` with webp sources (existing pattern).
- Marquee uses `transform: translateX` keyframes (GPU-friendly, no layout thrash)

**Out of scope for this redesign:**
- Real project screenshots for the 5 no-image cards. Cards work without them but capture real visuals in a follow-up. Volpe, Cityscape, Text Renderer, Particle System already have media.
- Per-project deep pages (`projects/project1.html` etc.) — keep current, restyle later
- Mobile breakpoint specifics beyond stacking the split hero — handle during implementation
