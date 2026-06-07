# Editing Guide

Quick reference for changing content on the site. The site is Jekyll. To preview locally run `bundle exec jekyll serve --livereload --port 4000` then open `http://localhost:4000`. Every change saved while the server is running auto-reloads.

## File map

| Where the content lives | What it controls |
|---|---|
| `index.html` | The home page: hero text, awards, work experience, skills, footer link targets |
| `_data/projects.yml` | The project cards on the home page: content, order, dates, links |
| `_data/mosaic.yml` | The image list for the scrolling hero background |
| `_includes/footer.html` | The slim footer at the bottom of every page |
| `_layouts/project.html` | The wrapper around every individual project detail page |
| `projects/*.md` | One Markdown file per project detail page. Front-matter at the top controls the title, hero image, GitHub link, etc. The body is the article text |
| `assets/images/` | All project screenshots, mosaic backgrounds, videos |
| `assets/css/style.css` | All styling |
| `documents/` | Resume PDF and any other downloadables (slide decks, etc.) |

## Project cards on the home page

Cards live in `_data/projects.yml`, one entry per card, rendered top to bottom in **file order**. To reorder the grid, move whole entries up or down. To add a card, copy an entry and edit it. The file has a comment block at the top documenting every field.

The short version:

```yaml
- title: "Project Name"
  date: "2024"                 # or "2025 - Present"; shows next to the title
  url: "/projects/slug.html"   # omit entirely for a non-clickable card
  external: true               # only for outside links; adds the arrow icon + new tab
  tags: "games-graphics"       # filter chips, space-separated
  description: "One- or two-sentence summary."
  tech: ["C++", "OpenGL"]
  badge:                       # optional
    type: award                # award (gold) or ship (green)
    icon: "fas fa-trophy"
    text: "Won a thing"
  media:                       # what shows at the top of the card
    type: stack                # stack | image | video
    color: games               # stack tints: games, accessibility, ai, mobile
```

For `media.type: image` give `webp`, `png`, `width`, `height`, `alt`. For `media.type: video` give `src` (mp4), `poster`, `aria`.

Valid tags: `games-graphics`, `ai-ml`, `accessibility`, `mobile-web`, `shipped`. The chip counts at the top of the projects section recompute automatically on page load; you never edit the numbers by hand.

## Hero background mosaic

The tilted scrolling rows behind the intro pull their images from `_data/mosaic.yml`. To add an image (screenshot, award photo, anything): drop the file into `assets/images/` and add one line to the list. The homepage deals the list out across the six rows automatically so every image appears an equal number of times and no two tiles next to each other repeat.

Tiles render at 320x200 cropped to cover, so landscape images look best. `.webp` keeps the page light. With 9 images each one appears 4 times across the 36 tile slots; the more you add, the fewer repeats, and at 36+ images every tile is unique.

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
| `topbar_link` | Overrides the top bar button URL (defaults to `github_link`) | no |
| `topbar_label` | Overrides the top bar button text (default: "View on GitHub") | no |
| `topbar_icon` | Overrides the button's Font Awesome icon class (default: `fab fa-github`). E.g. `fab fa-steam` | no |
| `topbar_disabled` | Set to `true` to render the button greyed out with no link (e.g. "Steam page coming soon") | no |
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
