# Bbrizly.github.io

Personal portfolio. Jekyll, hosted on GitHub Pages at https://bbrizly.github.io.

Push to `main`, the site rebuilds in ~30 seconds.

## Run locally

```bash
bundle install                            # one time
bundle exec jekyll serve --livereload     # http://127.0.0.1:4000
```

Needs Ruby 3.1+. Mac ships with 2.6, so `brew install ruby` and add `/opt/homebrew/opt/ruby/bin` to your PATH.

## Where things live

| File | What it controls |
|---|---|
| `index.html` | Homepage: hero, project cards, work history, awards, skills |
| `projects/*.md` | One Markdown file per project detail page |
| `_layouts/project.html` | Frame every project page sits inside |
| `_includes/footer.html` | Footer on every page |
| `assets/images/` | All images, videos, GIFs |
| `assets/css/style.css` | All styles |
| `documents/` | Resume PDF, slide decks, anything downloadable |

Never edit `_site/`. Jekyll rewrites it on every save.

## Add a new project

1. Create `projects/your-slug.md`:
   ```yaml
   ---
   layout: project
   title: "Your Project"
   eyebrow: "Engine · 2025"
   subtitle: "One or two sentences."
   tech: [C++, OpenGL, GLSL]
   github_link: "https://github.com/you/repo"
   hero_image: "/assets/images/cover.webp"
   images:
     - "/assets/images/shot-1.webp"
     - "/assets/images/clip.mp4"
   ---

   Markdown body. Use `##` for sections.
   ```
2. Add a card in `index.html` inside `.projects-grid-v2`. Copy an existing card as the template. The card's `href="/projects/your-slug.html"` (Jekyll converts `.md` to `.html`).

## Project card knobs (homepage)

- **Filter chip mapping**: `data-tags="games-graphics ai-ml accessibility mobile-web"` (space-separated). Drives which filter button shows the card. Counts recompute automatically.
- **No-image card tile color**: `<div class="card-stack-tile" data-stack-color="games|ai|accessibility|mobile">`.
- **Badges**:
  ```html
  <span class="card-badge badge-award"><i class="fas fa-trophy"></i> Some award</span>
  <span class="card-badge badge-ship"><i class="fas fa-rocket"></i> Deployed</span>
  ```

## Add images, videos, GIFs

Drop the file in `assets/images/`. Use `.webp` for screenshots (much smaller than `.png`). Then in the project's `.md`:

- **Top-of-page hero**: `hero_image: "/assets/images/file.webp"`
- **Gallery at bottom**: add to `images: [...]`
- **Inline mid-article**: `![alt](/assets/images/file.webp)` in the body

`.mp4` and `.webm` autoplay muted on loop, both in hero and gallery slots.

## Add a slide deck

Save the PDF in `documents/`. If the deck has animations or embedded GIFs, save the `.pptx` next to it so they survive.

```yaml
pdf: "/documents/talk.pdf"
pptx: "/documents/talk.pptx"   # optional, only when animations matter
```

The page auto-renders a download chip for each plus an inline PDF viewer that lazy-loads.

## Topbar buttons on a project page

Set the field, the button appears:

| Field | Button |
|---|---|
| `github_link:` | View on GitHub |
| `steam_link:` | View on Steam |
| `external_link:` | Visit site (override label with `external_label:`) |

## Update the resume

Replace `documents/Bassam's tech resume.pdf` with a new file of the same name. Every link picks it up.

## Deploy

```bash
git add . && git commit -m "Update" && git push
```

GitHub Pages rebuilds automatically.

## When stuff breaks

- **CSS not updating**: hard refresh (Cmd+Shift+R).
- **New page is 404**: confirm the `.md` has `---` frontmatter and `layout: project`. Jekyll silently skips files without it.
- **Image broken**: paths must start with `/` (e.g., `/assets/images/foo.webp`).
- **Build error**: read the last line of Jekyll output. Usually a YAML typo in frontmatter.
- **Port 4000 busy**: `--port 4001`.

For exhaustive recipes (every frontmatter field, every card variant, color tokens, filter chip internals) see `EDITING-GUIDE.md`.
