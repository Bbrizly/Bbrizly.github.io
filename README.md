# Bbrizly.github.io

Personal portfolio site for Bassam Kamal. Built with **Jekyll** (static site generator) and deployed via **GitHub Pages** at <https://bbrizly.github.io>.

> TL;DR — edit `index.html` for the homepage, drop images into `assets/images/`, push to `main`, GitHub Pages rebuilds automatically.

---

## 1. Stack & how it works

| Layer | What it is | Where |
|---|---|---|
| Static site generator | **Jekyll 4** (Ruby) | `Gemfile`, `_config.yml` |
| Templating | **Liquid** (`{% %}` / `{{ }}` tags) | `_layouts/`, `_includes/`, `.md` files |
| Theme base | `minima` gem (lightly used) | `Gemfile` |
| Styles | Plain CSS, single file | `assets/css/style.css` |
| JS | Vanilla JS, single file | `assets/js/myscripts.js` |
| Animations | [AOS](https://michalsnik.github.io/aos/) (CDN) | loaded in `index.html` + `_layouts/project.html` |
| Icons | Font Awesome 6 (CDN) | same |
| Font | Poppins (Google Fonts, CDN) | `index.html` |
| Hosting | GitHub Pages (auto-deploys from `main`) | — |

**How a request flows:**
1. `index.html` is the homepage. Its `---\n---` front matter (the empty YAML block at the top) tells Jekyll “process this file”.
2. Jekyll runs the file through Liquid, substituting `{% include header.html %}` and `{% include footer.html %}` from `_includes/`.
3. Each `.md` file in `projects/` declares `layout: project`, so Jekyll wraps its markdown content inside `_layouts/project.html` and outputs it as `/projects/projectN.html`.
4. The whole built site lands in `_site/` (gitignored / not edited by hand).

---

## 2. Project layout

```
.
├── _config.yml              # Site title, URL, theme
├── Gemfile / Gemfile.lock   # Ruby dependencies (Jekyll, minima)
├── index.html               # ← The homepage (hero, projects grid, exp, skills, …)
├── _includes/
│   ├── header.html          # Top bar: name, social links, nav menu
│   └── footer.html          # Footer copyright
├── _layouts/
│   └── project.html         # Wrapper template for every project sub-page
├── projects/
│   ├── project1.md          # OpenGL Cityscape  → /projects/project1.html
│   ├── project2.md          # OpenGL Text-Renderer
│   ├── project3.md          # Volpe Engine
│   └── project4.md          # OpenGL Particle System
├── assets/
│   ├── css/style.css        # All styles
│   ├── js/myscripts.js      # Slideshow, tabs, smooth scroll, active-nav
│   └── images/              # All images & GIFs referenced by the site
├── documents/
│   └── Bassam's tech resume.pdf  # Linked from the header resume icon
├── _site/                   # Build output — DO NOT EDIT (regenerated)
└── vendor/                  # Locally bundled gems (gitignore-able)
```

---

## 3. Local development

### One-time setup (macOS)

The `Gemfile.lock` pins **Bundler 2.6.6**, which needs **Ruby ≥ 3.1**. macOS ships an old Ruby 2.6, so use Homebrew’s Ruby:

```bash
brew install ruby                                      # if not already installed
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify:
```bash
ruby -v       # should be 3.x or 4.x
bundle -v     # should be 2.6.6
```

Install gems:
```bash
bundle install
```

### Run / build

```bash
bundle exec jekyll serve --livereload   # dev server → http://127.0.0.1:4000
bundle exec jekyll build                # one-shot build → _site/
```

Other useful flags:
- `--port 4001` if 4000 is busy
- `--drafts` to include drafts (none currently used)

---

## 4. Common edits — recipes

### Change the rotating hero images
`index.html`, `<section class="hero">` block. Each slide is a `<div class="showcase-slide">` with an `<img src="/assets/images/...">` and a `<span class="showcase-label">`. The number of `<span class="showcase-dot">` elements must match the number of slides.

### Change profile copy / intro paragraph
`index.html`, `<div class="hero-text">` (right under the showcase).

### Change name, subtitle, social links, nav, resume link
`_includes/header.html`. Resume PDF lives in `documents/`; if you rename it, update the link there.

### Edit / add a project card on the homepage
`index.html` has two grids:
- **Featured** (`.projects-featured`) — top 3 large cards.
- **Other** (`.projects-grid`) — the rest.

A card looks like this. Wrap it in `<a href="…">` only if it links to a sub-page; otherwise use a `<div>`.

```html
<a href="/projects/project5.html" class="project-card" data-aos="zoom-in">
  <img src="/assets/images/myshot.png" alt="My Project">
  <div class="content">
    <div class="project-tags">
      <span class="tag">C++</span>
      <span class="tag">Vulkan</span>
    </div>
    <h3>My Project</h3>
    <p>One-line description of what it does.</p>
    <span class="project-link"><i class="fab fa-github"></i> View on GitHub</span>
  </div>
</a>
```

Useful card modifiers:
- `class="project-card featured"` → larger card, used in the top grid.
- `class="project-card no-image"` or `featured no-image` → text-only card with a cyan accent border.
- `<span class="award-badge"><i class="fas fa-trophy"></i> Some Award</span>` → cyan award pill.
- `<span class="shipped-badge"><i class="fas fa-rocket"></i> Deployed & In Use</span>` → green “shipped” pill.

### Add a new project sub-page
1. Create `projects/project5.md`:
   ```markdown
   ---
   layout: project
   title: "My New Project"
   github_link: "https://github.com/Bbrizly/MyRepo"
   images:
     - "/assets/images/myshot1.png"
     - "/assets/images/myshot2.png"
   ---

   Markdown body goes here. Use normal markdown — headings, lists, links, images.
   ```
2. Link to it from `index.html` with `href="/projects/project5.html"` (note: `.html`, not `.md` — Jekyll converts it).
3. The images listed in front matter render in a gallery at the bottom of the page automatically (`_layouts/project.html`).

### Change images
Drop any new file into `assets/images/` and reference it as `/assets/images/yourfile.png`. Supported: PNG, JPG, GIF, WebP. Big GIFs (`gif.gif`, `particle2.gif`) are several MB — consider compressing or converting to MP4 if performance matters.

### Edit work experience tabs
`index.html`, `<section id="experience">`. Each tab is one `<button class="job-btn" data-job="ID">` paired with one `<div class="job-description" id="ID">`. The `data-job` and `id` must match. JS handles the toggling.

### Edit skills, awards, education, contact
All inline in `index.html` under their respective `<section>` blocks. Self-explanatory once you open the file.

### Restyle the site
All CSS is in `assets/css/style.css`. The accent color is `#0dcaf0` (cyan); the background is `#141e30`. Search-and-replace those if you want a new palette.

---

## 5. Deployment

Just push to `main`:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages picks it up automatically and rebuilds the site (usually within ~30 seconds). Live URL: <https://bbrizly.github.io>.

`_config.yml` settings that matter for deployment:
- `url: "https://bbrizly.github.io"` — used by `jekyll-seo-tag` for absolute URLs.
- `baseurl: ""` — empty because the site is at the domain root, not a sub-path.

---

## 6. Troubleshooting

**`Could not find 'bundler' (2.6.6) … bundler requires Ruby version >= 3.1.0`**
You’re on system Ruby 2.6. Install Homebrew Ruby and update your PATH (see Setup above).

**Port 4000 already in use**
`bundle exec jekyll serve --port 4001`

**Changes to `_config.yml` aren’t showing up**
Jekyll only reads `_config.yml` on startup. Stop the server (`Ctrl-C`) and restart it.

**Sass deprecation warnings on build**
They come from the old `minima` theme using legacy `@import` / `lighten()` / `darken()`. They’re warnings, not errors — safe to ignore.

**A new project page returns 404 locally**
Make sure the file is `projects/projectN.md` (not in a subfolder), the front matter starts with `---` on the very first line, and you’re linking to `.html`, not `.md`.

---

## 7. Conventions

- Keep image filenames short and lowercase; reference them with absolute paths (`/assets/images/foo.png`) so they work on both the homepage and project sub-pages.
- All Liquid logic stays in `_layouts/` and `_includes/`. Keep `index.html` as plain HTML where possible.
- Don’t commit `_site/`, `.jekyll-cache/`, or `vendor/` (they’re build artifacts / local-only).
