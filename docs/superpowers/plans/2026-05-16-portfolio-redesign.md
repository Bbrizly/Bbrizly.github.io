# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Jekyll portfolio site with the design described in `docs/superpowers/specs/2026-05-15-portfolio-redesign-design.md`: split hero with frosted glass over a tilted project mosaic, reorganized about block, filterable projects with no-image card variant, and a continuous awards marquee.

**Architecture:** Static Jekyll site, no build pipeline beyond `bundle exec jekyll build`. Three files do almost all the work: `index.html` (markup), `assets/css/style.css` (styles), `assets/js/myscripts.js` (filter chip behavior + work tabs). One include changes: `_includes/header.html` (remove section nav). Mosaic and marquee are pure CSS animations. Filter chips and project tag membership are driven by `data-tags` attributes on each `.project-card`.

**Tech Stack:** Jekyll 4, kramdown, Poppins via Google Fonts, Font Awesome icons (already loaded), vanilla JS, plain CSS with custom properties for the locked frosted-glass values.

**Verification approach:** No formal test framework existed on the site before. Each task verifies through `bundle exec jekyll serve` on `http://localhost:4000` followed by explicit visual or DOM-level checks called out per task. The filter chip JS does have a small behavioral check at Task 8 that runs the actual page in a real browser. Commit after every task.

---

## File Structure

| File | Responsibility | Changes |
|------|----------------|---------|
| `_includes/header.html` | Header shell (name + 4 social icons). Section nav lives here today and must go. | Delete `<nav>` block, leave header content intact. |
| `index.html` | Whole page markup. Hero, projects, experience, skills, awards, education, contact. | Replace hero block, replace projects block, replace awards block. Experience/skills/education/contact stay structurally; only class hooks and minor copy updates. |
| `assets/css/style.css` | All styles. | Add CSS custom properties block at top, add new sections (`.hero-v2`, `.mosaic-bg`, `.glass-*`, `.projects-v2`, `.filter-chip`, `.awards-marquee`), then delete old hero (`.showcase`, `.showcase-*`), old hero-cta, hero-stats, awards-list (vertical), and projects-featured/projects-grid styles. |
| `assets/js/myscripts.js` | Page behavior. Today: showcase carousel, work tabs, smooth scroll nav, intersection observer. After: work tabs + new filter-chip module. | Remove showcase block, smooth-scroll-nav block, intersection-observer block. Keep work tabs. Add filter-chip module. |
| `.gitignore` | Already excludes `_site/` per prior commit. | No change. |

---

## Task 0: Confirm dev environment

**Files:** none (verification only)

- [ ] **Step 1: Confirm Jekyll runs**

Run:
```bash
cd /Users/adptivai/Documents/GitHub/Bbrizly.github.io
bundle install
bundle exec jekyll serve --livereload --port 4000
```

Expected: no errors, server message `Server running... http://127.0.0.1:4000/`. If `bundle install` fails, run `gem install bundler` first.

- [ ] **Step 2: Open the current site in a browser**

Visit `http://localhost:4000`. Confirm the existing site loads (carousel rotates, projects render, etc). This is your "before" baseline. Take a quick screenshot at this URL for comparison later.

- [ ] **Step 3: Stop the server**

`Ctrl+C` in the terminal.

- [ ] **Step 4: Create a working branch**

```bash
git checkout -b portfolio-redesign
```

- [ ] **Step 5: No commit needed**

This is just environment confirmation.

---

## Task 1: Add design tokens at top of stylesheet

Introduce the CSS custom properties block that drives the locked frosted-glass values and the new color palette. Add it but don't apply it yet, so the page stays visually unchanged until later tasks consume the variables.

**Files:**
- Modify: `assets/css/style.css:1` (prepend)

- [ ] **Step 1: Add design tokens before the existing `/* Global */` comment**

Edit `assets/css/style.css`, insert at the very top:

```css
/* ==========================================================================
   Design tokens (locked values from design spec)
   ========================================================================== */
:root {
  /* Frosted glass (tuned in design phase, do not adjust without spec update) */
  --blur: 47px;
  --falloff: 51;
  --softness: 32;
  --tint: 0.99;
  --width: 68;

  /* Backgrounds */
  --bg-dark: #060912;
  --bg-mid: #0a0f1a;
  --bg-light: #f7f9fc;

  /* Accent */
  --accent: #3b6fe5;
  --accent-light: #7aa7ff;

  /* Ink (text colors) */
  --ink: #e6ecf4;
  --ink-mute: #cfd8e3;
  --ink-dim: #9bb5d6;

  /* Surfaces */
  --surface-card: #ffffff;
  --surface-card-border: #e5ebf3;
}

```

- [ ] **Step 2: Confirm the file still builds**

Run:
```bash
bundle exec jekyll build
```

Expected: builds without errors. Open `_site/assets/css/style.css` and confirm the new `:root` block appears at the top.

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "Add design tokens for portfolio redesign"
```

---

## Task 2: Remove section nav from header include

The site is short and single-page, the nav was never sticky and never carried weight. Drop it. Keep the name and social icons.

**Files:**
- Modify: `_includes/header.html:12-20`

- [ ] **Step 1: Delete the `<nav>` block**

Open `_includes/header.html`. Replace the entire file contents with:

```html
<header>
  <div class="header-content">
    <h1>Bassam Kamal</h1>
    <p class="subtitle">Software Engineer · Game Engine Developer · CS Graduate, UPEI</p>
    <div class="social-links">
      <a href="https://www.linkedin.com/in/bassam-k/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
      <a href="https://github.com/Bbrizly" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
      <a href="mailto:bassamkamal.py@gmail.com" title="Email" aria-label="Email"><i class="fas fa-envelope" aria-hidden="true"></i></a>
      <a href="/documents/Bassam's tech resume.pdf" target="_blank" rel="noopener noreferrer" title="Resume" aria-label="Resume"><i class="fas fa-file-alt" aria-hidden="true"></i></a>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Remove the old nav CSS block from `assets/css/style.css`**

In `assets/css/style.css`, find the `/* Nav */` comment (around line 65) and delete the `/* Nav */` comment plus the `nav { ... }` and `nav a { ... }` and `nav a:hover, nav a.active { ... }` rules that follow. Stop at the next `/* ==================== */` divider.

- [ ] **Step 3: Verify in dev server**

Run `bundle exec jekyll serve --livereload`. Visit `http://localhost:4000`. The nav row should be gone. Header name and social icons still visible.

- [ ] **Step 4: Commit**

```bash
git add _includes/header.html assets/css/style.css
git commit -m "Remove section nav from header"
```

---

## Task 3: Replace hero markup with split-layout structure

Build the new hero HTML scaffold: section wrapper, mosaic container with 6 reel rows, three glass overlay divs, and a foreground content panel with placeholders for the about block and CTAs. CSS in the next tasks fills these out visually.

**Files:**
- Modify: `index.html:32-99`

- [ ] **Step 1: Replace the existing hero section**

Open `index.html`. Find the section that starts at line 32 (`<!-- HERO SHOWCASE -->`) and ends at line 99 (the closing `</section>` of the `.hero` block). Replace those lines entirely with:

```html
  <!-- HERO -->
  <section class="hero-v2" id="about" aria-label="About">

    <!-- Decorative project mosaic (hidden from assistive tech) -->
    <div class="mosaic-bg" aria-hidden="true">
      <div class="mosaic-reel reel-a">
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="cityscape"></a>
        <a class="mosaic-tile" data-thumb="text-renderer"></a>
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="quadstick"></a>
        <!-- Loop pair: duplicate the set so the keyframe end aligns visually -->
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="cityscape"></a>
        <a class="mosaic-tile" data-thumb="text-renderer"></a>
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="quadstick"></a>
      </div>
      <div class="mosaic-reel reel-b">
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
        <a class="mosaic-tile" data-thumb="upstart"></a>
        <a class="mosaic-tile" data-thumb="racing"></a>
        <a class="mosaic-tile" data-thumb="expiry"></a>
        <a class="mosaic-tile" data-thumb="pokemon"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
        <a class="mosaic-tile" data-thumb="upstart"></a>
        <a class="mosaic-tile" data-thumb="racing"></a>
        <a class="mosaic-tile" data-thumb="expiry"></a>
        <a class="mosaic-tile" data-thumb="pokemon"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
      </div>
      <div class="mosaic-reel reel-c">
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="quadstick"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="upstart"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="quadstick"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="upstart"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
      </div>
      <div class="mosaic-reel reel-d">
        <a class="mosaic-tile" data-thumb="cityscape"></a>
        <a class="mosaic-tile" data-thumb="text-renderer"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="upstart"></a>
        <a class="mosaic-tile" data-thumb="cityscape"></a>
        <a class="mosaic-tile" data-thumb="text-renderer"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="upstart"></a>
      </div>
      <div class="mosaic-reel reel-e">
        <a class="mosaic-tile" data-thumb="quadstick"></a>
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
        <a class="mosaic-tile" data-thumb="racing"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="pokemon"></a>
        <a class="mosaic-tile" data-thumb="expiry"></a>
        <a class="mosaic-tile" data-thumb="quadstick"></a>
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
        <a class="mosaic-tile" data-thumb="racing"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="pokemon"></a>
        <a class="mosaic-tile" data-thumb="expiry"></a>
      </div>
      <div class="mosaic-reel reel-f">
        <a class="mosaic-tile" data-thumb="upstart"></a>
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="quadstick"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
        <a class="mosaic-tile" data-thumb="upstart"></a>
        <a class="mosaic-tile" data-thumb="adaptiv"></a>
        <a class="mosaic-tile" data-thumb="volpe"></a>
        <a class="mosaic-tile" data-thumb="quadstick"></a>
        <a class="mosaic-tile" data-thumb="particle"></a>
        <a class="mosaic-tile" data-thumb="cabin-boy"></a>
      </div>
    </div>

    <!-- Frosted glass layers (3-stack for soft Apple-style falloff) -->
    <div class="glass glass-3" aria-hidden="true"></div>
    <div class="glass glass-2" aria-hidden="true"></div>
    <div class="glass glass-1" aria-hidden="true"></div>

    <!-- Foreground identity panel -->
    <div class="hero-content">
      <p class="hero-eyebrow">Portfolio · 2026</p>
      <h2 class="hero-name">Bassam Kamal</h2>

      <ul class="about-lines">
        <li class="about-line">
          <span class="about-ico" aria-hidden="true">SE</span>
          <span class="about-text">
            <strong>Software Engineer</strong> at Iron Fox Games
            <span class="about-meta">Charlottetown PEI · Shipping production C++ and web tooling</span>
          </span>
        </li>
        <li class="about-line">
          <span class="about-ico" aria-hidden="true">CS</span>
          <span class="about-text">
            <strong>B.Sc. Computer Science</strong> · UPEI 2026
            <span class="about-meta">Specialization in Video Games</span>
          </span>
        </li>
        <li class="about-line">
          <span class="about-ico" aria-hidden="true">&#8596;</span>
          <span class="about-text">
            <strong>I build</strong> custom 3D engines, ML systems, and accessibility tools
          </span>
        </li>
      </ul>

      <div class="hero-ctas">
        <a href="#projects" class="cta-primary"><i class="fas fa-arrow-down" aria-hidden="true"></i> See projects</a>
        <a href="/documents/Bassam's tech resume.pdf" class="cta-secondary" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-arrow-down" aria-hidden="true"></i> Resume</a>
      </div>
    </div>

  </section>
```

- [ ] **Step 2: Confirm it builds**

Run `bundle exec jekyll build`. Expected: no errors. The page will look broken (no CSS yet) but should render.

- [ ] **Step 3: Open the page**

Run `bundle exec jekyll serve --livereload`, visit `http://localhost:4000`. You'll see the new hero markup as unstyled content (text and empty `<a>` elements). The carousel is gone. That's expected. Don't worry about the visual.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Replace hero markup with split-layout structure"
```

---

## Task 4: Style the hero section, mosaic, and glass layers

Add the full hero CSS to `assets/css/style.css`. This includes the section frame, the tilted mosaic with 6 keyframe animations, the 3 stacked frosted-glass overlays driven by the design tokens, and the mosaic tile gradient placeholders that show project names.

**Files:**
- Modify: `assets/css/style.css` (append a new block after the existing global rules)

- [ ] **Step 1: Append hero styles**

Open `assets/css/style.css`. Append the following block at the very end of the file. (Important: end of file, not before the old hero block. The new hero defines `.cta-primary` / `.cta-secondary` which also exist in the old hero CSS; appending guarantees the new rules win on equal-specificity collisions while both blocks coexist during the transition. Task 12 deletes the old block once the new one is verified.)

```css
/* ==========================================================================
   HERO v2 (split layout with frosted glass + tilted project mosaic)
   ========================================================================== */
.hero-v2 {
  position: relative;
  height: 680px;
  background: var(--bg-dark);
  overflow: hidden;
  color: var(--ink);
  isolation: isolate;
}

/* Mosaic background -------------------------------------------------------- */
.mosaic-bg {
  position: absolute;
  top: -120px;
  bottom: -120px;
  left: -8%;
  right: -8%;
  transform: rotate(-12deg);
  display: flex;
  flex-direction: column;
  gap: 22px;
  z-index: 1;
}

.mosaic-reel {
  display: flex;
  gap: 22px;
  flex: none;
  will-change: transform;
}

.mosaic-tile {
  position: relative;
  flex: none;
  width: 320px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(135deg, #1e3a8a, #0a0f1a);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.04);
  text-decoration: none;
}

/* Per-thumb gradient placeholders (real images can replace these later) */
.mosaic-tile[data-thumb="volpe"]         { background: linear-gradient(135deg, #1e3a8a, #0a0f1a); }
.mosaic-tile[data-thumb="particle"]      { background: linear-gradient(135deg, #2d4a76, #0a0f1a); }
.mosaic-tile[data-thumb="cityscape"]     { background: linear-gradient(135deg, #3a5e9e, #0a0f1a); }
.mosaic-tile[data-thumb="text-renderer"] { background: linear-gradient(135deg, #0f1b33, #243b55); }
.mosaic-tile[data-thumb="adaptiv"]       { background: linear-gradient(135deg, #4a3a7e, #0a0f1a); }
.mosaic-tile[data-thumb="quadstick"]     { background: linear-gradient(135deg, #2d6e5e, #0a0f1a); }
.mosaic-tile[data-thumb="cabin-boy"]     { background: linear-gradient(135deg, #7e3a5a, #0a0f1a); }
.mosaic-tile[data-thumb="upstart"]       { background: linear-gradient(135deg, #1e5a8a, #0a0f1a); }
.mosaic-tile[data-thumb="racing"]        { background: linear-gradient(135deg, #2d4a76, #0a0f1a); }
.mosaic-tile[data-thumb="expiry"]        { background: linear-gradient(135deg, #3a5e9e, #0a0f1a); }
.mosaic-tile[data-thumb="pokemon"]       { background: linear-gradient(135deg, #0f1b33, #243b55); }

.mosaic-tile::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.06) 0 2px, transparent 2px 14px);
}

.mosaic-tile::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 50%);
}

/* Keyframes: each row scrolls in alternating directions at varied speeds.
   Translate range is -50% because each reel duplicates its content once. */
@keyframes mosaic-scroll-l { 0% { transform: translateX(0); }    100% { transform: translateX(-50%); } }
@keyframes mosaic-scroll-r { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

.reel-a { animation: mosaic-scroll-l 50s linear infinite; }
.reel-b { animation: mosaic-scroll-r 65s linear infinite; transform: translateX(-200px); }
.reel-c { animation: mosaic-scroll-l 75s linear infinite; }
.reel-d { animation: mosaic-scroll-r 55s linear infinite; transform: translateX(-150px); }
.reel-e { animation: mosaic-scroll-l 60s linear infinite; }
.reel-f { animation: mosaic-scroll-r 70s linear infinite; transform: translateX(-300px); }

/* Frosted-glass stack ------------------------------------------------------ */
/* Three layers: glass-3 widest/softest, glass-1 narrowest/strongest.
   The mask gradient stops are computed from --softness so we can re-tune the
   single value in :root and the falloff curve updates everywhere. */
.glass {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}

.glass-3 {
  width: calc(var(--falloff) * 1% + 20%);
  backdrop-filter: blur(calc(var(--blur) * 0.15)) saturate(110%);
  -webkit-backdrop-filter: blur(calc(var(--blur) * 0.15)) saturate(110%);
  background: linear-gradient(90deg,
    rgba(6, 9, 18, calc(var(--tint) * 0.08)) 0%,
    rgba(6, 9, 18, 0) 100%);
  mask-image: linear-gradient(90deg,
    #000 0%,
    #000 calc((100 - var(--softness)) * 1%),
    rgba(0, 0, 0, 0.15) 92%,
    rgba(0, 0, 0, 0) 100%);
  -webkit-mask-image: linear-gradient(90deg,
    #000 0%,
    #000 calc((100 - var(--softness)) * 1%),
    rgba(0, 0, 0, 0.15) 92%,
    rgba(0, 0, 0, 0) 100%);
}

.glass-2 {
  width: calc(var(--falloff) * 1% + 5%);
  backdrop-filter: blur(calc(var(--blur) * 0.45)) saturate(125%);
  -webkit-backdrop-filter: blur(calc(var(--blur) * 0.45)) saturate(125%);
  background: linear-gradient(90deg,
    rgba(6, 9, 18, calc(var(--tint) * 0.45)) 0%,
    rgba(6, 9, 18, calc(var(--tint) * 0.3)) 45%,
    rgba(6, 9, 18, 0) 100%);
  mask-image: linear-gradient(90deg,
    #000 0%,
    #000 calc((100 - var(--softness)) * 1%),
    rgba(0, 0, 0, 0.25) 85%,
    rgba(0, 0, 0, 0) 100%);
  -webkit-mask-image: linear-gradient(90deg,
    #000 0%,
    #000 calc((100 - var(--softness)) * 1%),
    rgba(0, 0, 0, 0.25) 85%,
    rgba(0, 0, 0, 0) 100%);
}

.glass-1 {
  width: calc(var(--width) * 1%);
  backdrop-filter: blur(calc(var(--blur) * 1px)) saturate(145%);
  -webkit-backdrop-filter: blur(calc(var(--blur) * 1px)) saturate(145%);
  background: linear-gradient(90deg,
    rgba(6, 9, 18, var(--tint)) 0%,
    rgba(6, 9, 18, calc(var(--tint) * 0.8)) 40%,
    rgba(6, 9, 18, calc(var(--tint) * 0.4)) 70%,
    rgba(6, 9, 18, calc(var(--tint) * 0.1)) 88%,
    rgba(6, 9, 18, 0) 100%);
  mask-image: linear-gradient(90deg,
    #000 0%,
    #000 calc((100 - var(--softness)) * 1%),
    rgba(0, 0, 0, 0.3) 80%,
    rgba(0, 0, 0, 0) 100%);
  -webkit-mask-image: linear-gradient(90deg,
    #000 0%,
    #000 calc((100 - var(--softness)) * 1%),
    rgba(0, 0, 0, 0.3) 80%,
    rgba(0, 0, 0, 0) 100%);
}

/* Foreground content ------------------------------------------------------- */
.hero-content {
  position: relative;
  z-index: 4;
  width: 58%;
  height: 100%;
  padding: 70px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-eyebrow {
  font-size: 11px;
  letter-spacing: 0.32em;
  color: var(--ink-dim);
  text-transform: uppercase;
  margin: 0 0 18px;
}

.hero-name {
  font-size: 64px;
  font-weight: 600;
  line-height: 1.0;
  letter-spacing: -0.01em;
  margin: 0 0 28px;
  color: #fff;
}

.about-lines {
  list-style: none;
  margin: 0 0 30px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.about-line {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 16px;
  color: var(--ink-mute);
  line-height: 1.4;
}

.about-ico {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: rgba(123, 167, 255, 0.12);
  border: 1px solid rgba(123, 167, 255, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-light);
  font-size: 12px;
  font-weight: 600;
  margin-top: 1px;
}

.about-text {
  padding-top: 4px;
}

.about-text strong {
  color: #fff;
  font-weight: 600;
}

.about-meta {
  display: block;
  font-size: 13px;
  color: var(--ink-dim);
  margin-top: 2px;
}

.hero-ctas {
  display: flex;
  gap: 12px;
}

.hero-ctas a {
  padding: 13px 26px;
  font-size: 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.15s ease;
}

.hero-ctas a:hover { transform: translateY(-1px); }

.cta-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 4px 20px rgba(59, 111, 229, 0.4);
}

.cta-primary:hover { color: #fff; background: #2f5cd6; }

.cta-secondary {
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--ink);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.cta-secondary:hover { color: #fff; background: rgba(255, 255, 255, 0.08); }

```

- [ ] **Step 2: Verify in the browser**

Run `bundle exec jekyll serve --livereload` if it's not still running. Visit `http://localhost:4000`. The hero should now look like the mockup: dark hero, tilted mosaic visible on the right, frosted glass panel on the left, big "Bassam Kamal" with three icon-prefixed about lines and two CTAs. The mosaic should be animating (rows drifting in alternating directions).

- [ ] **Step 3: Sanity check the glass falloff**

The right edge of the glass should dissolve gradually into the sharp mosaic, not cut off as a hard column. If you see a vertical line, double check that the `--softness` value resolved (the file should have `--softness: 32;` at the top of `:root`).

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m "Style hero, mosaic, and frosted-glass layers"
```

---

## Task 5: Replace projects section markup

Swap the existing `.projects-featured` and `.projects-grid` blocks for a single new structure: a section header with a filter chip row and a single 3-column grid of `.project-card` items each carrying a `data-tags` attribute. Includes Expiry, which was missing.

**Files:**
- Modify: `index.html` (the `<section id="projects">` block, currently lines 103-268)

- [ ] **Step 1: Replace the entire projects section**

Open `index.html`. Find `<section id="projects" data-aos="fade-up">` and replace from that opening tag through its closing `</section>` with:

```html
    <!-- PROJECTS -->
    <section class="projects-v2" id="projects" data-aos="fade-up">
      <div class="projects-head">
        <h2>Projects</h2>
        <p class="projects-sub">Filter to focus on what matters.</p>
      </div>

      <div class="filter-row" role="group" aria-label="Filter projects by category">
        <button type="button" class="filter-chip" data-filter="all" aria-pressed="true">All <span class="filter-count" data-count="all">0</span></button>
        <button type="button" class="filter-chip" data-filter="games-graphics" aria-pressed="false">Games &amp; Graphics <span class="filter-count" data-count="games-graphics">0</span></button>
        <button type="button" class="filter-chip" data-filter="ai-ml" aria-pressed="false">AI / ML <span class="filter-count" data-count="ai-ml">0</span></button>
        <button type="button" class="filter-chip" data-filter="accessibility" aria-pressed="false">Accessibility <span class="filter-count" data-count="accessibility">0</span></button>
        <button type="button" class="filter-chip" data-filter="mobile-web" aria-pressed="false">Mobile &amp; Web <span class="filter-count" data-count="mobile-web">0</span></button>
        <button type="button" class="filter-chip" data-filter="shipped" aria-pressed="false">Shipped <span class="filter-count" data-count="shipped">0</span></button>
      </div>

      <p class="filter-status visually-hidden" aria-live="polite" data-filter-status></p>

      <div class="projects-grid-v2">

        <a href="/projects/project3.html" class="project-card project-card-featured" data-tags="games-graphics">
          <video class="card-media" autoplay muted loop playsinline poster="/assets/images/s1.webp" aria-label="Volpe Engine demo">
            <source src="/assets/images/gif.mp4" type="video/mp4">
          </video>
          <div class="card-body">
            <div class="card-tags">
              <span>C++</span><span>OpenGL</span><span>GLSL</span><span>PBR</span>
            </div>
            <h3>Volpe Engine</h3>
            <p>Custom 3D game engine built from scratch with PBR lighting, dynamic-tree spatial partitioning, frustum culling, localization-aware text rendering, and an instanced particle system with custom GLSL shaders.</p>
            <span class="card-badge badge-ship"><i class="fab fa-github" aria-hidden="true"></i> Open source</span>
          </div>
        </a>

        <div class="project-card no-image" data-tags="ai-ml accessibility">
          <div class="card-stack-tile" data-stack-color="ai">
            <span class="card-stack-glyph">// AI · COMPUTER VISION</span>
            <span class="card-stack-name">Adaptiv AI</span>
            <span class="card-stack-tags"><span>Python</span><span>TF Lite</span><span>PyTorch</span></span>
          </div>
          <div class="card-body">
            <p>AI fitness coach using on-device pose estimation to analyze exercise form in real time. Custom ML models for pose estimation and exercise classification, from training to on-device deployment.</p>
            <span class="card-badge badge-award"><i class="fas fa-trophy" aria-hidden="true"></i> Spark Tank 2.1 Winner</span>
          </div>
        </div>

        <div class="project-card no-image" data-tags="accessibility shipped">
          <div class="card-stack-tile" data-stack-color="accessibility">
            <span class="card-stack-glyph">// ACCESSIBILITY · DESKTOP</span>
            <span class="card-stack-name">QuadStick Config</span>
            <span class="card-stack-tags"><span>C#</span><span>.NET</span><span>WPF</span><span>Serial</span></span>
          </div>
          <div class="card-body">
            <p>Desktop application for quadriplegic gamers to configure accessibility hardware controllers. Real-time serial port communication for profile flashing, multi-screen configuration workflow, and automated CI/CD pipelines.</p>
            <span class="card-badge badge-ship"><i class="fas fa-rocket" aria-hidden="true"></i> Deployed &amp; in use</span>
          </div>
        </div>

        <div class="project-card no-image" data-tags="mobile-web games-graphics">
          <div class="card-stack-tile" data-stack-color="mobile">
            <span class="card-stack-glyph">// MOBILE · AR · CLOUD</span>
            <span class="card-stack-name">Pokemon Go Mobile Game</span>
            <span class="card-stack-tags"><span>Flutter</span><span>Firebase</span><span>AWS</span><span>Docker</span></span>
          </div>
          <div class="card-body">
            <p>Pokemon Go-style mobile game with real-time map rendering, AR capture mechanics, and cloud-synced user state. RESTful API architecture connecting Flutter frontend to Firebase and AWS Lambda, with CI/CD via GitHub Actions and Docker.</p>
          </div>
        </div>

        <a href="/projects/project1.html" class="project-card" data-tags="games-graphics">
          <picture class="card-media">
            <source srcset="/assets/images/s1.webp" type="image/webp">
            <img src="/assets/images/s1.png" alt="OpenGL Cityscape" width="1919" height="1009" loading="lazy">
          </picture>
          <div class="card-body">
            <div class="card-tags"><span>C++</span><span>OpenGL</span><span>Procedural</span></div>
            <h3>OpenGL Cityscape</h3>
            <p>Procedurally generated city with Voronoi-based layouts, dynamic day/night cycle, and optimized rendering.</p>
          </div>
        </a>

        <a href="/projects/project4.html" class="project-card" data-tags="games-graphics">
          <video class="card-media" autoplay muted loop playsinline poster="/assets/images/particle2.webp" aria-label="GPU particle system">
            <source src="/assets/images/particle2.mp4" type="video/mp4">
          </video>
          <div class="card-body">
            <div class="card-tags"><span>C++</span><span>OpenGL</span><span>GLSL</span></div>
            <h3>GPU Particle System</h3>
            <p>GPU-accelerated particle system with multiple emitter shapes, physics-based effects, and custom shaders.</p>
          </div>
        </a>

        <div class="project-card no-image" data-tags="games-graphics">
          <div class="card-stack-tile" data-stack-color="games">
            <span class="card-stack-glyph">// MULTIPLAYER · STEAM</span>
            <span class="card-stack-name">Multiplayer Racing</span>
            <span class="card-stack-tags"><span>C++</span><span>Steam</span><span>GLSL</span><span>Procedural</span></span>
          </div>
          <div class="card-body">
            <p>Final-year project with Steam-integrated multiplayer, physics-based vehicle mechanics, procedural map generation, and custom GLSL shaders for dynamic environments.</p>
          </div>
        </div>

        <div class="project-card no-image" data-tags="ai-ml mobile-web">
          <div class="card-stack-tile" data-stack-color="ai">
            <span class="card-stack-glyph">// SAAS · AI · TELEMETRY</span>
            <span class="card-stack-name">Upstart</span>
            <span class="card-stack-tags"><span>React</span><span>Python</span><span>TensorFlow</span><span>Firebase</span></span>
          </div>
          <div class="card-body">
            <p>AI-driven SaaS platform automating business department workflows with real-time data visualizations and telemetry-style monitoring pipelines.</p>
            <span class="card-badge badge-award"><i class="fas fa-trophy" aria-hidden="true"></i> Panther Pitch Finalist</span>
          </div>
        </div>

        <a href="/projects/project2.html" class="project-card" data-tags="games-graphics">
          <picture class="card-media">
            <source srcset="/assets/images/s2.webp" type="image/webp">
            <img src="/assets/images/s2.png" alt="OpenGL text renderer" width="1272" height="745" loading="lazy">
          </picture>
          <div class="card-body">
            <div class="card-tags"><span>C++</span><span>OpenGL</span></div>
            <h3>OpenGL Text Renderer</h3>
            <p>Dynamic text rendering with font-sheet optimization, multi-language support, and word-wrapping.</p>
          </div>
        </a>

        <div class="project-card no-image" data-tags="mobile-web">
          <div class="card-stack-tile" data-stack-color="mobile">
            <span class="card-stack-glyph">// HACKATHON · WASTE</span>
            <span class="card-stack-name">Expiry</span>
            <span class="card-stack-tags"><span>Web</span><span>Hackathon</span></span>
          </div>
          <div class="card-body">
            <p>Restaurant waste-reduction web app that tracks ingredient expiry dates and suggests usage priorities. Built during UPEI Hackathon.</p>
          </div>
        </div>

        <div class="project-card no-image" data-tags="games-graphics">
          <div class="card-stack-tile" data-stack-color="games">
            <span class="card-stack-glyph">// INDIE GAME · JAM RELEASE</span>
            <span class="card-stack-name">Cabin Boy</span>
            <span class="card-stack-tags"><span>Game Dev</span><span>Game Jam</span></span>
          </div>
          <div class="card-body">
            <p>Indie game developed and released at the XP Indie Biz Connect Game Jam. Full development lifecycle from concept to playable release.</p>
            <span class="card-badge badge-award"><i class="fas fa-trophy" aria-hidden="true"></i> Community Choice Award</span>
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 2: Verify the build**

Run `bundle exec jekyll build`. Expected: no errors. The projects section will look broken visually until the CSS in the next task is added. That's expected.

- [ ] **Step 3: Verify in browser**

Visit `http://localhost:4000#projects`. You should see 11 project cards in an unstyled list, including Expiry. Confirm all 11 are present in the DOM (use browser devtools).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Replace projects markup with filter chips and new card variants"
```

---

## Task 6: Style the projects section, filter chips, and card variants

Add the CSS for the projects section, filter chip row, card grid, image-card variant, and no-image stack-tile card variant.

**Files:**
- Modify: `assets/css/style.css` (append after the hero block from Task 4)

- [ ] **Step 1: Append the projects styles**

Append at the end of `assets/css/style.css` (after the hero block from Task 4):

```css
/* ==========================================================================
   PROJECTS v2
   ========================================================================== */
.projects-v2 {
  padding: 90px 64px;
  background: var(--bg-light);
  color: #1a2436;
}

.projects-head { margin-bottom: 28px; }
.projects-head h2 {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #1a2436;
  margin: 0 0 6px;
}
.projects-sub {
  font-size: 14px;
  color: #6b7a90;
  margin: 0;
}

/* Filter chips ------------------------------------------------------------- */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 36px;
}

.filter-chip {
  font-family: inherit;
  padding: 9px 18px;
  font-size: 13px;
  border-radius: 22px;
  border: 1px solid #d4dce9;
  color: #4a5670;
  background: #fff;
  cursor: pointer;
  font-weight: 500;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}
.filter-chip:hover { border-color: var(--accent); color: var(--accent); }
.filter-chip:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.filter-chip[aria-pressed="true"] {
  background: #1a2436;
  color: #fff;
  border-color: #1a2436;
}
.filter-count {
  opacity: 0.55;
  margin-left: 4px;
  font-weight: 400;
}

.visually-hidden {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* Projects grid ------------------------------------------------------------ */
.projects-grid-v2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-card {
  background: var(--surface-card);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--surface-card-border);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(26, 36, 54, 0.12);
}
.project-card:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.project-card-featured { grid-column: span 2; }

.project-card.is-hidden { display: none; }

/* Card media (image / video) ---------------------------------------------- */
.card-media {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: linear-gradient(135deg, #1e3a8a, #0a0f1a);
  object-fit: cover;
}
.card-media img,
.card-media source { width: 100%; height: 100%; object-fit: cover; display: block; }
.project-card-featured .card-media { aspect-ratio: 16 / 8; }

/* Card body --------------------------------------------------------------- */
.card-body {
  padding: 20px 22px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.card-tags span {
  font-size: 10.5px;
  padding: 4px 10px;
  background: #eef4ff;
  color: var(--accent);
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.card-body h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #1a2436;
  letter-spacing: -0.01em;
}
.card-body p {
  font-size: 14px;
  color: #5a6680;
  line-height: 1.55;
  margin: 0;
}

.card-badge {
  align-self: flex-start;
  margin-top: auto;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid;
}
.card-badge i { margin-right: 4px; }
.badge-award { background: #fff5e1; color: #8a6312; border-color: #ecd9a7; }
.badge-ship  { background: #e8f7ed; color: #1f6e3a; border-color: #b9e2c8; }

/* No-image card variant (styled stack tile) ------------------------------- */
.project-card.no-image .card-stack-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  aspect-ratio: 16 / 10;
  padding: 26px 30px;
  background: linear-gradient(135deg, #1a2436 0%, #0a0f1a 100%);
  position: relative;
  color: #fff;
  overflow: hidden;
}
.project-card-featured.no-image .card-stack-tile { aspect-ratio: 16 / 8; }
.project-card.no-image .card-stack-tile::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, rgba(123, 167, 255, 0.05) 0 2px, transparent 2px 18px);
}
.card-stack-glyph {
  position: relative; z-index: 1;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--accent-light);
  margin-bottom: 14px;
}
.card-stack-name {
  position: relative; z-index: 1;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.01em;
}
.card-stack-tags {
  position: relative; z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}
.card-stack-tags span {
  font-size: 10px;
  padding: 4px 10px;
  background: rgba(123, 167, 255, 0.12);
  color: var(--accent-light);
  border: 1px solid rgba(123, 167, 255, 0.25);
  border-radius: 12px;
  font-weight: 500;
}

/* Per-domain colorways for the no-image stack tile */
.card-stack-tile[data-stack-color="games"]         { background: linear-gradient(135deg, #1a2436 0%, #0a0f1a 100%); }
.card-stack-tile[data-stack-color="accessibility"] { background: linear-gradient(135deg, #1a2e2a 0%, #0a0f1a 100%); }
.card-stack-tile[data-stack-color="accessibility"] .card-stack-glyph { color: #7ad1b0; }
.card-stack-tile[data-stack-color="accessibility"] .card-stack-tags span {
  background: rgba(122, 209, 176, 0.12);
  color: #7ad1b0;
  border-color: rgba(122, 209, 176, 0.25);
}
.card-stack-tile[data-stack-color="ai"]            { background: linear-gradient(135deg, #2a2348 0%, #0a0f1a 100%); }
.card-stack-tile[data-stack-color="ai"] .card-stack-glyph { color: #b09ee0; }
.card-stack-tile[data-stack-color="ai"] .card-stack-tags span {
  background: rgba(176, 158, 224, 0.12);
  color: #b09ee0;
  border-color: rgba(176, 158, 224, 0.25);
}
.card-stack-tile[data-stack-color="mobile"]        { background: linear-gradient(135deg, #1e3a55 0%, #0a0f1a 100%); }
.card-stack-tile[data-stack-color="mobile"] .card-stack-glyph { color: #8ec5e8; }
.card-stack-tile[data-stack-color="mobile"] .card-stack-tags span {
  background: rgba(142, 197, 232, 0.12);
  color: #8ec5e8;
  border-color: rgba(142, 197, 232, 0.25);
}

```

- [ ] **Step 2: Reload the page**

`http://localhost:4000#projects`. The projects section should now match the mockup: dark filter chips with counts (showing `0` for now — JS adds the real numbers in Task 8), 3-column grid with Volpe spanning 2 columns, image cards with screenshots, no-image cards with styled stack tiles in domain colors.

- [ ] **Step 3: Sanity check**

Verify the no-image cards have distinct tinted gradients (Adaptiv AI is purple, QuadStick is green, Pokemon and Expiry are blue, Multiplayer Racing and Cabin Boy are slate). Image-bearing cards (Volpe, Cityscape, Particle, Text Renderer) show their real screenshots / video poster frames.

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m "Style projects section, filter chips, and card variants"
```

---

## Task 7: Implement filter-chip JS module

Add the JS that drives the filter chips: compute counts at page load, toggle `aria-pressed`, hide non-matching cards by adding `.is-hidden`, swap the featured-span when Volpe is filtered out, and announce result count via `aria-live`.

**Files:**
- Modify: `assets/js/myscripts.js` (add a new module inside the existing `DOMContentLoaded` handler)

- [ ] **Step 1: Add the filter-chip module**

Open `assets/js/myscripts.js`. Inside the existing `document.addEventListener('DOMContentLoaded', () => { ... })` handler, add the following block at the end of the body (after the existing intersection observer code, before the closing `});`):

```javascript
  // =====================
  // PROJECT FILTER CHIPS
  // =====================
  (function initProjectFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.project-card');
    const status = document.querySelector('[data-filter-status]');
    if (chips.length === 0 || cards.length === 0) return;

    // Image-bearing fallback priority for the featured-card slot when Volpe
    // is filtered out. Order from the design spec.
    const FEATURED_FALLBACKS = ['cityscape', 'particle', 'text-renderer'];

    function tagsOf(card) {
      return (card.dataset.tags || '').split(/\s+/).filter(Boolean);
    }

    function cardHasImage(card) {
      return !card.classList.contains('no-image');
    }

    function computeCounts() {
      const counts = { all: cards.length };
      cards.forEach(card => {
        tagsOf(card).forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      });
      document.querySelectorAll('.filter-count').forEach(el => {
        const key = el.dataset.count;
        el.textContent = counts[key] || 0;
      });
    }

    function applyFilter(filter) {
      let visibleCount = 0;
      let volpeHidden = false;
      const volpeCard = document.querySelector('.project-card-featured');

      cards.forEach(card => {
        const match = filter === 'all' || tagsOf(card).includes(filter);
        card.classList.toggle('is-hidden', !match);
        if (match) visibleCount++;
      });

      // If the featured card (Volpe) is hidden under this filter, transfer
      // its featured class to the next visible image-bearing card per the
      // priority list. Reset on 'all'.
      if (volpeCard) {
        const volpeMatches = filter === 'all' || tagsOf(volpeCard).includes(filter);
        if (volpeMatches) {
          // Volpe is the featured card again. Remove the class from any other
          // card that previously carried it.
          document.querySelectorAll('.project-card-featured').forEach(c => {
            if (c !== volpeCard) c.classList.remove('project-card-featured');
          });
          volpeCard.classList.add('project-card-featured');
        } else {
          volpeHidden = true;
          volpeCard.classList.remove('project-card-featured');
          // Pick the next visible image-bearing fallback.
          let promoted = null;
          for (const fallbackId of FEATURED_FALLBACKS) {
            const candidate = Array.from(cards).find(card =>
              !card.classList.contains('is-hidden') &&
              cardHasImage(card) &&
              card.querySelector('h3') &&
              card.querySelector('h3').textContent.toLowerCase().includes(fallbackId.split('-')[0])
            );
            if (candidate) { promoted = candidate; break; }
          }
          // Clear any stale featured class first
          document.querySelectorAll('.project-card-featured').forEach(c =>
            c.classList.remove('project-card-featured'));
          if (promoted) promoted.classList.add('project-card-featured');
        }
      }

      // Announce
      if (status) {
        const label = filter === 'all'
          ? 'All projects'
          : (document.querySelector('.filter-chip[data-filter="' + filter + '"]')
              ?.textContent.trim().replace(/\s+\d+$/, '') || filter);
        status.textContent = `Showing ${visibleCount} of ${cards.length} projects in ${label}.`;
      }
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        applyFilter(chip.dataset.filter);
      });
    });

    computeCounts();
    applyFilter('all');
  })();

```

- [ ] **Step 2: Manual behavioral test (in browser, no test framework)**

Run `bundle exec jekyll serve --livereload`, visit `http://localhost:4000#projects`.

Verify each:
- Chip counts on page load read: All 11, Games & Graphics 7, AI / ML 2, Accessibility 2, Mobile & Web 3, Shipped 1
- Clicking "AI / ML" hides everything except Adaptiv AI and Upstart. Volpe loses `project-card-featured` (no longer span-2). Adaptiv AI does NOT become the featured card (it's a no-image card). Upstart shows but no card spans 2 columns. (You'll see 2 single-column cards.)
- Clicking "Games & Graphics" shows Volpe back at span-2 with its image, plus the other Games & Graphics cards
- Clicking "Accessibility" shows Adaptiv AI and QuadStick. No featured card promotion (neither has an image).
- Clicking "All" restores everything with Volpe featured
- `aria-pressed="true"` swaps to the clicked chip only (inspect via devtools)

- [ ] **Step 3: Verify `aria-live` works**

Open the page with a screen reader on (macOS VoiceOver: Cmd+F5). Click between filters. You should hear "Showing N of 11 projects in {category}". If you cannot test a screen reader, inspect the hidden `[data-filter-status]` element in devtools and confirm its text updates on each filter click.

- [ ] **Step 4: Commit**

```bash
git add assets/js/myscripts.js
git commit -m "Add filter-chip behavior with featured-card fallback and aria-live"
```

---

## Task 8: Replace awards section with marquee strip

Swap the existing `.awards-list` vertical block for a horizontal continuous marquee with hover-pause and a static fallback under `prefers-reduced-motion`.

**Files:**
- Modify: `index.html` (the `<section id="awards">` block, currently lines 360-392)
- Modify: `assets/css/style.css` (append a new awards block)

- [ ] **Step 1: Replace the awards markup**

Open `index.html`. Find `<section id="awards" data-aos="fade-up">` and replace through its closing `</section>` with:

```html
    <!-- AWARDS MARQUEE -->
    <section class="awards-v2" id="awards" data-aos="fade-up">
      <div class="awards-head">
        <h2>Awards &amp; Recognition</h2>
        <p class="awards-sub">Hover to pause.</p>
      </div>
      <div class="awards-marquee">
        <div class="awards-track">

          <div class="award-card">
            <div class="award-icon" data-icon-color="gold"><i class="fas fa-trophy" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2025 · PEI</p>
              <h3>Winner · Spark Tank 2.1</h3>
              <p class="award-venue">PEI IT Alliance · The Foundry · Adaptiv AI</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon" data-icon-color="silver"><i class="fas fa-medal" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2025 · UPEI</p>
              <h3>Finalist · Panther Pitch</h3>
              <p class="award-venue">Harry W. MacLauchlan Entrepreneurship Program · Upstart</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon" data-icon-color="blue"><i class="fas fa-gamepad" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2024 · PEI</p>
              <h3>Community Choice</h3>
              <p class="award-venue">XP Indie Biz Connect Game Jam · Cabin Boy</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon" data-icon-color="green"><i class="fas fa-star" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2022 · UPEI</p>
              <h3>Welcome Week Leadership</h3>
              <p class="award-venue">University of Prince Edward Island</p>
            </div>
          </div>

          <!-- Loop duplicate for seamless 50% translation -->

          <div class="award-card">
            <div class="award-icon" data-icon-color="gold"><i class="fas fa-trophy" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2025 · PEI</p>
              <h3>Winner · Spark Tank 2.1</h3>
              <p class="award-venue">PEI IT Alliance · The Foundry · Adaptiv AI</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon" data-icon-color="silver"><i class="fas fa-medal" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2025 · UPEI</p>
              <h3>Finalist · Panther Pitch</h3>
              <p class="award-venue">Harry W. MacLauchlan Entrepreneurship Program · Upstart</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon" data-icon-color="blue"><i class="fas fa-gamepad" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2024 · PEI</p>
              <h3>Community Choice</h3>
              <p class="award-venue">XP Indie Biz Connect Game Jam · Cabin Boy</p>
            </div>
          </div>

          <div class="award-card">
            <div class="award-icon" data-icon-color="green"><i class="fas fa-star" aria-hidden="true"></i></div>
            <div class="award-info">
              <p class="award-when">2022 · UPEI</p>
              <h3>Welcome Week Leadership</h3>
              <p class="award-venue">University of Prince Edward Island</p>
            </div>
          </div>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Append awards CSS**

Append to `assets/css/style.css` after the projects block from Task 6:

```css
/* ==========================================================================
   AWARDS v2 (continuous marquee with reduced-motion fallback)
   ========================================================================== */
.awards-v2 {
  padding: 80px 0 100px;
  background: var(--bg-dark);
  color: #fff;
  overflow: hidden;
}

.awards-head {
  padding: 0 64px;
  margin-bottom: 40px;
}
.awards-head h2 {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #fff;
  margin: 0 0 6px;
}
.awards-sub {
  font-size: 14px;
  color: var(--ink-dim);
  margin: 0;
}

.awards-marquee {
  position: relative;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

@keyframes awards-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.awards-track {
  display: flex;
  gap: 24px;
  width: max-content;
  animation: awards-scroll 80s linear infinite;
  padding: 0 64px;
  will-change: transform;
}
.awards-marquee:hover .awards-track,
.awards-marquee:focus-within .awards-track {
  animation-play-state: paused;
}

.award-card {
  flex: none;
  width: 340px;
  padding: 20px 22px;
  display: flex;
  gap: 18px;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.award-icon {
  flex: none;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--accent-light);
  background: linear-gradient(135deg, #1e3a8a, #0a0f1a);
  position: relative;
  overflow: hidden;
}
.award-icon::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.06) 0 2px, transparent 2px 12px);
}
.award-icon[data-icon-color="silver"] { background: linear-gradient(135deg, #4a3a7e, #0a0f1a); }
.award-icon[data-icon-color="silver"] i { color: #b09ee0; }
.award-icon[data-icon-color="blue"]   { background: linear-gradient(135deg, #1e5a8a, #0a0f1a); }
.award-icon[data-icon-color="blue"] i   { color: #8ec5e8; }
.award-icon[data-icon-color="green"]  { background: linear-gradient(135deg, #2d6e5e, #0a0f1a); }
.award-icon[data-icon-color="green"] i  { color: #7ad1b0; }

.award-info { flex: 1; min-width: 0; }
.award-when {
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--ink-dim);
  text-transform: uppercase;
  margin: 0 0 4px;
}
.award-info h3 {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  margin: 0 0 3px;
}
.award-venue {
  font-size: 12px;
  color: var(--ink-mute);
  margin: 0;
}

/* Reduced-motion fallback: stop the marquee and lay out as 2-col grid */
@media (prefers-reduced-motion: reduce) {
  .awards-marquee {
    mask-image: none;
    -webkit-mask-image: none;
  }
  .awards-track {
    animation: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: auto;
    gap: 16px;
  }
  /* Hide the duplicated set under reduced motion (first 4 cards only) */
  .awards-track .award-card:nth-child(n+5) { display: none; }
}

```

- [ ] **Step 3: Verify in browser**

Visit `http://localhost:4000#awards`. The marquee should drift left continuously. Hover the strip: it should pause. Mouse off: it resumes.

- [ ] **Step 4: Verify reduced-motion fallback**

Open browser devtools, in Rendering panel set "Emulate CSS media feature `prefers-reduced-motion`" to "reduce". Reload. The strip should now be a static 2-column grid of 4 award cards, no animation, no edge mask. Switch back to "no preference" and confirm the marquee returns.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Replace awards list with continuous marquee strip"
```

---

## Task 9: Responsive breakpoints

Add the tablet and phone layouts to `assets/css/style.css`. Desktop styling already lives in the v2 blocks; this task only adds the `@media` overrides for ≤1023px and ≤639px viewports.

**Files:**
- Modify: `assets/css/style.css` (append)

- [ ] **Step 1: Append the breakpoints block**

Append to `assets/css/style.css`:

```css
/* ==========================================================================
   Responsive — Tablet (640–1023px)
   ========================================================================== */
@media (max-width: 1023px) {
  .hero-v2 {
    height: auto;
    min-height: 640px;
  }
  .hero-content {
    width: 100%;
    padding: 48px 32px 40px;
  }
  .hero-name { font-size: 48px; }
  .mosaic-bg {
    top: auto;
    bottom: 0;
    height: 280px;
    transform: rotate(-8deg);
  }
  .mosaic-tile { width: 240px; height: 150px; }
  /* Single softer glass layer; mobile-Safari can't handle the 3-stack well */
  .glass-2, .glass-3 { display: none; }
  .glass-1 {
    width: 100%;
    backdrop-filter: blur(32px) saturate(120%);
    -webkit-backdrop-filter: blur(32px) saturate(120%);
    background: linear-gradient(180deg,
      rgba(6, 9, 18, 0.85) 0%,
      rgba(6, 9, 18, 0.6) 65%,
      rgba(6, 9, 18, 0.2) 100%);
    mask-image: linear-gradient(180deg,
      #000 0%, #000 55%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%);
    -webkit-mask-image: linear-gradient(180deg,
      #000 0%, #000 55%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%);
  }

  .projects-v2 { padding: 70px 32px; }
  .projects-grid-v2 { grid-template-columns: repeat(2, 1fr); }
  .project-card-featured { grid-column: span 2; }

  /* Filter chip row becomes a horizontal scroller with edge fade */
  .filter-row {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: thin;
    padding-bottom: 8px;
    mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  }
  .filter-chip { flex: none; }

  .awards-head { padding: 0 32px; }
  .awards-track { padding: 0 32px; }
  .award-card { width: 280px; }
}

/* ==========================================================================
   Responsive — Phone (<640px)
   ========================================================================== */
@media (max-width: 639px) {
  .hero-v2 { min-height: 560px; }
  .hero-content { padding: 36px 22px 32px; }
  .hero-name { font-size: 36px; margin-bottom: 18px; }
  .hero-eyebrow { margin-bottom: 12px; }

  /* Hide the mosaic entirely on phone; solid dark panel only */
  .mosaic-bg { display: none; }
  .glass-1 {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(6, 9, 18, 0.92);
    mask-image: none;
    -webkit-mask-image: none;
  }

  /* About lines drop the icon tile, become plain stacked rows */
  .about-line { gap: 0; flex-direction: column; align-items: stretch; }
  .about-ico { display: none; }
  .about-text { padding-top: 0; }
  .about-meta { display: inline; margin-top: 0; }
  .about-meta::before { content: ' · '; color: var(--ink-dim); }

  .hero-ctas { flex-direction: column; }
  .hero-ctas a { text-align: center; }

  .projects-v2 { padding: 56px 22px; }
  .projects-head h2 { font-size: 28px; }
  .projects-grid-v2 { grid-template-columns: 1fr; }
  .project-card-featured { grid-column: span 1; }
  .project-card-featured .card-media { aspect-ratio: 16 / 10; }
  .project-card-featured.no-image .card-stack-tile { aspect-ratio: 16 / 10; }

  .awards-v2 { padding: 56px 0 70px; }
  .awards-head { padding: 0 22px; }
  .awards-head h2 { font-size: 26px; }
  .awards-track { padding: 0 22px; gap: 16px; }
  .award-card { width: 240px; padding: 16px 18px; gap: 14px; }
  .award-icon { width: 48px; height: 48px; font-size: 20px; }
  .award-info h3 { font-size: 14px; }
}

```

- [ ] **Step 2: Verify each breakpoint**

Resize the browser to ~900px (tablet). Hero should collapse to single column with the mosaic showing as a band at the bottom and one big glass layer fading down. Project grid drops to 2 columns. Filter chips become a horizontal scroller. Awards cards narrow.

Resize down to ~400px (phone). Mosaic disappears (solid dark hero panel). About lines lose icon tiles and stack with bullet separators. CTAs stack vertically. Projects go to 1 column. Award icons shrink.

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "Add tablet and phone responsive breakpoints"
```

---

## Task 10: Reduced-motion, mask-image, and backdrop-filter fallbacks

The hero mosaic and the filter chip transitions should respect reduced-motion. The mask-image and backdrop-filter techniques need explicit fallbacks for browsers without support (older Safari, some Firefox configs).

**Files:**
- Modify: `assets/css/style.css` (append)

- [ ] **Step 1: Append the fallback block**

Append to `assets/css/style.css`:

```css
/* ==========================================================================
   Motion preferences and feature fallbacks
   ========================================================================== */

/* Stop the hero mosaic and remove filter-card transitions under reduced motion */
@media (prefers-reduced-motion: reduce) {
  .mosaic-reel { animation: none !important; }
  .project-card { transition: none; }
  .project-card:hover { transform: none; }
  .hero-ctas a { transition: none; }
  .hero-ctas a:hover { transform: none; }
}

/* backdrop-filter unsupported: fall back to solid tinted panel */
@supports not (backdrop-filter: blur(10px)) {
  .glass-1 {
    background: rgba(6, 9, 18, 0.85) !important;
    mask-image: none;
    -webkit-mask-image: none;
  }
  .glass-2, .glass-3 { display: none; }
  .cta-secondary {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* mask-image unsupported: drop the edge fade. Content still works. */
@supports not (mask-image: linear-gradient(90deg, transparent, #000)) {
  .awards-marquee {
    mask-image: none;
    -webkit-mask-image: none;
  }
  .filter-row {
    mask-image: none;
    -webkit-mask-image: none;
  }
}
```

- [ ] **Step 2: Verify reduced-motion stops the hero mosaic**

In Chrome devtools Rendering panel set `prefers-reduced-motion: reduce`. Reload `http://localhost:4000`. The mosaic should freeze (no animation). The awards strip should be a 2x2 grid (from Task 8). Hover transitions on project cards should be off.

- [ ] **Step 3: Visually verify backdrop-filter fallback (optional, only if you have an older browser available)**

If you have an older Safari (<14) or Firefox with `layout.css.backdrop-filter.enabled` set to `false`, the hero should fall back to a solid `rgba(6,9,18,0.85)` panel with no blur. If you cannot test this, that's fine, the `@supports not` block is defensive.

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m "Add reduced-motion and backdrop-filter/mask-image fallbacks"
```

---

## Task 11: Color contrast verification

The spec calls out muted ink (`#cfd8e3`, `#9bb5d6`) on the dark background as needing WCAG AA verification. Use Chrome's Accessibility tab to confirm each pairing. Bump colors only if they fail.

**Files:**
- Modify (only if needed): `assets/css/style.css:1` (the `:root` token block)

- [ ] **Step 1: Open the Accessibility audit**

In Chrome devtools, open the Lighthouse tab. Run an Accessibility-only audit on `http://localhost:4000`. Scroll to the Contrast section.

- [ ] **Step 2: Inspect specific failing elements**

Pay particular attention to:
- `.about-meta` (`var(--ink-dim)` on `var(--bg-dark)`)
- `.awards-sub` (`var(--ink-dim)` on `var(--bg-dark)`)
- `.filter-count` (opacity 0.55 on dark chip)
- `.card-body p` (`#5a6680` on `#fff` light card)

Check each pairing with [contrast-ratio.com](https://contrast-ratio.com) or the devtools color picker contrast hint. Target: ≥4.5:1 for normal text, ≥3:1 for ≥18.66px.

- [ ] **Step 3: If any pairing fails, brighten the relevant token**

If `--ink-dim` fails AA, change `:root --ink-dim` from `#9bb5d6` to `#b0c5e0` (lighter). If `--ink-mute` fails, brighten similarly. If the filter-count opacity drops it below threshold, raise from `0.55` to `0.7`. Re-run Lighthouse.

- [ ] **Step 4: Commit (only if you changed anything)**

If you adjusted any colors:
```bash
git add assets/css/style.css
git commit -m "Adjust muted ink tokens for WCAG AA contrast"
```

If nothing changed, skip the commit and proceed to the next task.

---

## Task 12: Remove dead CSS and JS

Now that the new structure is fully in place, delete the old hero, projects, and awards styles and the old JS modules that no longer have markup to hook into.

**Files:**
- Modify: `assets/css/style.css` (delete old blocks)
- Modify: `assets/js/myscripts.js` (delete old blocks)

- [ ] **Step 1: Delete old CSS blocks**

Open `assets/css/style.css`. Find and DELETE each of these blocks entirely (use search):

- The `/* ==================== */` header for `/* HERO SHOWCASE */` and everything through the end of `.showcase-progress.running { ... }` (the old carousel styles).
- The `.hero-text { ... }` block, `.hero-cta { ... }`, `.cta-primary { ... }`, `.cta-secondary { ... }`, `.hero-stats { ... }` blocks IF they appear in the old hero section. The new versions of `.cta-primary` and `.cta-secondary` we wrote in Task 4 should be the only definitions of those selectors. Confirm via search: each of those selectors should appear exactly once in the file.
- The `/* PROJECTS */` block: `.projects-featured`, `.projects-grid`, `.project-card` (old version), `.project-card.featured`, `.project-card.no-image` (old version), `.tag` styles, `.award-badge`, `.shipped-badge` related to the old layout. Replace with what's in Task 6.
- The `/* AWARDS */` block: `.awards-list`, `.award-item`, `.award-icon` (old version), `.award-info` (old version).

For each block, search for its top-level selector. Delete from the comment header (or the first selector if no comment) through the last `}` of that block.

Verify nothing was broken by reloading the page. The new v2 hero, projects, and awards should all still render. If something breaks, you accidentally deleted a `.project-card` rule used by the new variant. Restore from git and try again with smaller deletions.

- [ ] **Step 2: Delete dead JS blocks**

Open `assets/js/myscripts.js`. Delete the entire blocks for:
- `// SHOWCASE SLIDESHOW` (lines that handle `.showcase`, `.showcase-slide`, `.showcase-dot`, `.showcase-progress`)
- `// SMOOTH SCROLL NAV` (handles `nav a` clicks)
- `// ACTIVE NAV ON SCROLL (IntersectionObserver)` (handles section highlights in nav)

Keep:
- The `prefersReducedMotion` constant declaration at top
- `// WORK EXPERIENCE TABS` block
- `// PROJECT FILTER CHIPS` block added in Task 7

After deletion the file should be roughly 60 lines.

- [ ] **Step 3: Final smoke test**

Reload `http://localhost:4000`. Confirm:
- Hero looks right
- Projects filter still works
- Work experience tabs (Iron Fox / Teaching Assistant) still toggle
- Awards marquee still scrolls
- No JS errors in the console

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css assets/js/myscripts.js
git commit -m "Remove dead carousel and section-nav code"
```

---

## Task 13: Final QA pass

Walk the site at all three breakpoints, with reduced-motion both off and on. Catch anything we missed.

**Files:** none (verification only)

- [ ] **Step 1: Desktop pass (1440×900 viewport)**

Visit `http://localhost:4000`. Check:
- Hero glass falloff is smooth, mosaic visible on right
- All 11 projects render with correct domain colors on no-image cards
- Filter chips work, counts read correctly, featured swap fires when filtering away from Volpe
- Awards marquee scrolls slowly, pauses on hover
- Work Experience tabs work
- Skills, Education, Contact sections render with the existing styling
- No console errors

- [ ] **Step 2: Tablet pass (820×1180 viewport)**

Resize to ~820px wide. Check:
- Hero collapses to a single column with mosaic band at bottom
- Glass blur uses the single-layer fallback
- Project grid is 2 columns
- Filter chips become a horizontal scroller
- Awards cards are ~280px wide
- No layout overlap

- [ ] **Step 3: Phone pass (390×844 viewport)**

Resize to ~390px wide. Check:
- Mosaic disappears, solid dark hero panel only
- About lines stack without icon tiles, bullet separators between role and meta
- CTAs stack vertically
- Project grid is 1 column
- Filter chips still scroll horizontally
- Award icons shrink, cards narrower
- No horizontal overflow on the page

- [ ] **Step 4: Reduced-motion pass**

Toggle reduced-motion on in Chrome devtools Rendering panel. Reload. Check:
- Mosaic freezes
- Project card hover transforms disabled
- Awards becomes a static 2x2 grid (only 4 cards visible)

- [ ] **Step 5: Keyboard pass**

Click into the page and use Tab. Verify focus rings are visible and reach every interactive element in a reasonable order: header social links, then hero CTAs, then filter chips (one at a time), then project cards, then work tabs.

- [ ] **Step 6: Lighthouse**

Run Lighthouse (Accessibility + Performance). Aim for ≥95 Accessibility and ≥85 Performance on desktop. If Performance is lower than 85, check for unoptimized image weight in the network panel; the existing webp/png pattern should already be efficient.

- [ ] **Step 7: Commit anything you noticed (only if you fixed something)**

If you noticed a small bug during QA and fixed it inline:
```bash
git add -A
git commit -m "QA pass fixes"
```

If everything passed, no commit needed.

- [ ] **Step 8: Open a PR**

```bash
git push origin portfolio-redesign
gh pr create --title "Portfolio redesign" --body "$(cat <<'EOF'
## Summary

Implements the design spec at `docs/superpowers/specs/2026-05-15-portfolio-redesign-design.md`.

Hero replaced with a split layout: tilted scrolling project mosaic on the right, Apple-style frosted glass panel on the left holding identity (name, role, education, what I build). About content is now three scannable lines, not a paragraph. Projects gain a filter chip row driven by `data-tags` attributes and a no-image card variant for projects without screenshots. Awards is a continuous marquee strip. Section nav removed, top-level CTAs simplified to one primary scroll button plus a Resume secondary.

Locked design tokens for the frosted-glass tuning live in `:root` at the top of `style.css`.

## Test plan

- [ ] Desktop pass (1440×900): hero, projects, filter chips with featured swap, awards marquee, work tabs, no console errors
- [ ] Tablet pass (820×1180): hero collapses, single-layer glass, 2-column project grid, filter chip horizontal scroller
- [ ] Phone pass (390×844): mosaic hidden, about lines stacked, CTAs stacked, 1-column projects
- [ ] Reduced-motion: mosaic frozen, awards is static 2x2 grid
- [ ] Keyboard: focus reaches every interactive element with visible ring
- [ ] Lighthouse Accessibility ≥95

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Spec coverage check

Spec section → Plan task that implements it:

| Spec section | Implementing task(s) |
|---|---|
| Section nav removed | Task 2 |
| Hero structure (split, dark background, 680px) | Task 3, Task 4 |
| Mosaic background (6 rows, tilt, varied speeds, aria-hidden) | Task 3, Task 4 |
| Frosted glass with locked tokens | Task 1 (tokens), Task 4 (CSS) |
| About block (3 icon-prefixed lines) | Task 3 (markup), Task 4 (CSS) |
| Hero CTAs (primary + secondary) | Task 3 (markup), Task 4 (CSS) |
| Projects filter row taxonomy and counts | Task 5 (markup), Task 6 (CSS), Task 7 (JS counts) |
| Filter chip behavior (aria-pressed, aria-live, featured-fallback, keyboard, reduced-motion) | Task 7 (JS), Task 6 (focus-visible CSS), Task 10 (reduced-motion) |
| Project image-card variant | Task 5, Task 6 |
| Project no-image card variant with domain color | Task 5, Task 6 |
| Badge styles (award, ship) | Task 6 |
| Awards marquee (80s, hover-pause, edge mask) | Task 8 |
| Awards reduced-motion fallback (2x2 grid) | Task 8 (in same block) |
| Color palette via tokens | Task 1 |
| No em dashes in homepage chrome | enforced by spec, no specific task (existing copy already complies; verification at Task 13) |
| Files touched: index.html, header.html, style.css, myscripts.js | All tasks above |
| Accessibility: prefers-reduced-motion, backdrop-filter fallback, mask-image fallback, aria-pressed, skip-link kept | Task 10 (fallbacks), Task 7 (aria), Task 8 (reduced motion for awards) |
| Performance: 3-layer blur desktop only, tablet single layer, phone solid panel | Task 9 (breakpoints) |
| Color contrast WCAG AA verification | Task 11 |
| Mobile breakpoints (1024 / 640 / 640-) | Task 9 |
| Per-project pages stay unchanged | Out of scope; no task touches `projects/project*.md` or `_layouts/project.html` |
| Sections kept as-is (Experience, Skills, Education, Contact) | Verified at Task 13 |

All spec sections accounted for.
