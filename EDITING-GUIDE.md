# Editing Guide

Quick reference for changing content on the site. The site is Jekyll. To preview locally run `bundle exec jekyll serve --livereload --port 4000` then open `http://localhost:4000`. Every change saved while the server is running auto-reloads.

## File map

| Where the content lives | What it controls |
|---|---|
| `index.html` | The home page: hero text, project cards, awards, work experience, skills, footer link targets |
| `_includes/footer.html` | The slim footer at the bottom of every page |
| `_layouts/project.html` | The wrapper around every individual project detail page |
| `projects/*.md` | One Markdown file per project detail page. Front-matter at the top controls the title, hero image, GitHub link, etc. The body is the article text |
| `assets/images/` | All project screenshots, mosaic backgrounds, videos |
| `assets/css/style.css` | All styling |
| `documents/` | Resume PDF and any other downloadables (slide decks, etc.) |

## Editing a project card on the home page

Each card is one block inside the `<div class="projects-grid-v2">` in `index.html`. Cards come in two shapes:

**With an image (links to a detail page):**
```html
<a href="/projects/cityscape.html" class="project-card" data-tags="games-graphics">
  <picture class="card-media">
    <source srcset="/assets/images/s1.webp" type="image/webp">
    <img src="/assets/images/s1.png" alt="Cityscape" width="1919" height="1009" loading="lazy">
  </picture>
  <div class="card-body">
    <h3>Project name</h3>
    <p>One- or two-sentence summary.</p>
    <div class="card-tags"><span>Tag</span><span>Tag</span></div>
  </div>
</a>
```

**Without an image:**
```html
<a href="/projects/whatever.html" class="project-card no-image" data-tags="games-graphics">
  <div class="card-stack-tile" data-stack-color="games">
    <span class="card-stack-name">Project name</span>
  </div>
  <div class="card-body">
    <h3>Project name</h3>
    <p>One- or two-sentence summary.</p>
    <div class="card-tags"><span>Tag</span><span>Tag</span></div>
  </div>
</a>
```

### Pointing a card at a different URL

The whole card is one `<a href="...">` element. Change the href:
- **Internal project page:** `/projects/your-slug.html`
- **External site:** `https://example.com` (you'll usually also want `target="_blank" rel="noopener noreferrer"`)
- **Steam page:** `https://store.steampowered.com/app/...`
- **No link at all:** swap `<a ...>` for `<div ...>` and drop the `</a>` at the bottom

### Filter chip mapping

The `data-tags` attribute drives which filter chips show the card. Valid tags: `games-graphics`, `ai-ml`, `accessibility`, `mobile-web`, `shipped`. Multiple tags space-separated.

The chip counts at the top recompute automatically from `data-tags` on page load. You never edit the count numbers by hand.

### Card colors (no-image variant)

The `data-stack-color` attribute on `.card-stack-tile` picks the gradient tint:
- `games` — slate
- `accessibility` — green
- `ai` — purple
- `mobile` — blue

## Editing a project detail page

Each detail page is a Markdown file in `projects/`. The front-matter block at the top (between the `---` lines) is metadata; everything after is article text.

```yaml
---
layout: project
title: "Your Project Name"
eyebrow: "Category · Year"
subtitle: "One- to two-sentence positioning that appears under the title."
tech:
  - C++
  - OpenGL
  - GLSL
github_link: "https://github.com/you/repo"
hero_image: "/assets/images/cover.webp"
images:
  - "/assets/images/shot-1.webp"
  - "/assets/images/clip.mp4"
---

Markdown body goes here. Use `##` for section headings.
```

### Frontmatter fields

| Field | What it does | Required |
|---|---|---|
| `layout: project` | Tells Jekyll to use the project page wrapper | yes |
| `title` | Shows as the H1 at the top | yes |
| `eyebrow` | Small uppercase label above the title (e.g., "Engine · 2024") | no |
| `subtitle` | Larger paragraph below the title | no |
| `tech` | List of tech-stack pills under the subtitle | no |
| `github_link` | URL of the source repo. Renders a "View on GitHub" button in the top bar | no |
| `steam_link` | URL of the Steam store page. Renders a Steam button | no |
| `external_link` | Generic external URL (e.g., a live site). `external_label` overrides the button text (default: "Visit site") | no |
| `hero_image` | Big image or video placed under the title block. Supports `.webp`, `.png`, `.jpg`, `.mp4`, `.webm` | no |
| `pdf` | Path to a PDF (e.g., a slide deck). Renders a download button + an inline viewer | no |
| `images` | List of additional images/videos shown in a grid below the article | no |

### Writing the body

Plain Markdown. The new project page styling adds wide margins, large readable type, blue accent links, and a max width that keeps line length comfortable. You don't need to add wrapper divs.

Headings: use `##` for major sections, `###` for subsections.

Images inside the body get a max-width and a subtle border automatically. Drop them in like:

```markdown
![what it shows](/assets/images/your-image.webp)
```

## Adding images to a project

1. Drop the image in `assets/images/`. Pick a descriptive filename (e.g., `splat2-cover.webp`, `quadstick-shot-3.webp`). Use `.webp` for photos/screenshots when possible (much smaller than `.png` at the same quality).
2. Reference it in the project's `.md` file. To use it as the big top-of-page hero, set `hero_image` in the frontmatter. To add it to the gallery at the bottom, add it to the `images:` list. To embed it mid-article, write `![alt text](/assets/images/your-file.webp)` in the body.

For videos (`.mp4`, `.webm`), the page automatically renders them as autoplay-muted-loop, same as images. Use the same approach: drop in `assets/images/`, reference the path.

## Adding a PDF (slide deck, paper, etc.)

1. Save the PDF in `documents/` (e.g., `documents/splat2-deck.pdf`).
2. Add this line to the project's frontmatter:
   ```yaml
   pdf: "/documents/splat2-deck.pdf"
   ```
3. The project page automatically renders a "Slides" section below the article with a download button and an inline PDF viewer.

If you're working from a PowerPoint, export to PDF first (File > Export > PDF in PowerPoint).

## Adding a new project from scratch

1. Create `projects/your-slug.md` with the frontmatter template above.
2. Add a card for it in `index.html` inside the `<div class="projects-grid-v2">` block. Use the templates from "Editing a project card" above. The card's `<a href="...">` points at `/projects/your-slug.html` (Jekyll renders the .md as .html).
3. Save. The dev server auto-reloads.

## Common edits

### Change the hero About lines

The three icon-prefixed lines under your name are in `index.html` inside `<ul class="about-lines">`. Each `<li class="about-line">` has an `.about-ico` (the small letter tile) and `.about-text` (the line). Edit the text directly.

### Change the resume PDF

Replace `documents/Bassam's tech resume.pdf`. The hero CTA, the footer icon, and any project page that links to the resume all use the same path, so a single file swap updates everything.

### Add or remove an award

In `index.html` inside `<div class="awards-grid">`, copy/paste an `.award-card` block. Change the icon (`data-icon-color`: `gold`, `silver`, `blue`, `green` — pick the closest fit) and the three text lines (when/where, title, venue).

### Change a tech-skills tag

In `index.html` inside `<section id="skills">`, each `<div class="skill-category">` is one column. Add or remove `<span>...</span>` lines.

## When things look wrong

- **CSS change isn't showing up:** the dev server caches the compiled stylesheet briefly. Hard-refresh the browser (Cmd+Shift+R on Mac).
- **A new page isn't appearing:** make sure the `.md` file has the `---` frontmatter delimiters and `layout: project`. Jekyll silently skips files without proper frontmatter.
- **An image is broken:** double-check the path. Site-relative paths must start with `/` (e.g., `/assets/images/foo.webp` not `assets/images/foo.webp`).
- **Build error in terminal:** read the last line of the Jekyll output. Most errors are caused by typos in YAML frontmatter (missing colon, bad indentation).

## Reminder: never edit `_site/`

`_site/` is the build output Jekyll regenerates on every change. Anything you write there gets wiped. Edit the source files (`index.html`, `projects/*.md`, `assets/css/style.css`).
