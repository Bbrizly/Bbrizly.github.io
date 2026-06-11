# Splat II screenshots checklist

A working list of every image the Splat II articles need. Drop captures into `assets/images/splat2/` using the filenames below, then swap each `{% comment %} IMAGE: ... {% endcomment %}` marker for the matching markdown image tag (snippet at the end).

## Folder setup

```
assets/images/splat2/
```

That directory does not exist yet. Make it once. Everything goes inside.

## File naming and format

- Use `kebab-case` for filenames so URLs stay clean.
- Static screenshots: `.webp` preferred. PNG is fine if WebP is not handy.
- Clips: `.mp4` (H.264). The layout auto-plays mp4 muted in a loop.
- Keep images under 600 KB each so the page stays fast. WebP at quality 80 hits that easily.

## Player Locomotion (`/projects/splat2/player-locomotion/`)

| Filename                             | What to capture                                                                                                              |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `playerloc-raycast-bug.webp`         | Side-by-side debug view: left = camera ray hitting wall back face, right = player-centre ray hitting the correct surface     |
| `playerloc-crosshair-states.webp`    | Dual crosshair shown in all three colour states (blue ready / yellow coyote / gray disabled), one frame, labelled            |

Optional bonus (the article does not request it but it would help):
- `playerloc-grapple-clip.mp4` — short third-person clip of dual-grappling between two buildings.

## World Generation (`/projects/splat2/world-generation/`)

| Filename                             | What to capture                                                                                                              |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `worldgen-noise-stages.webp`         | Three-panel: raw Perlin output, biome mask, final blended terrain on the same seed                                            |
| `worldgen-erosion-before-after.webp` | Two-panel: same terrain seed before vs after the thermal erosion pass, from a low-angle camera                                |

## Buildings (`/projects/splat2/buildings/`)

| Filename                            | What to capture                                                                                                              |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `buildings-three-types.webp`        | Side-by-side of one flat-top, one curved, one arched building. Daylight, no fog, clean reference shot                        |
| `buildings-curved-collider.webp`    | A curved building in debug view with the CPU convex hull collider drawn over it as a wireframe                               |
| `buildings-route-topdown.webp`      | Top-down map view with the sine-wave route highlighted in colour (any colour, ideally a high-contrast cyan or blue)          |

## Visual Effects (`/projects/splat2/visual-effects/`)

| Filename                          | What to capture                                                                                                              |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `vfx-fog-comparison.webp`         | Two-panel: same vantage point, one above the fog line (clear), one inside the fog layer                                       |
| `vfx-trail-loop.mp4`              | Short clip of a player looping around a building with the trail visible. 4 to 8 seconds, looped                              |
| `vfx-blackhole.webp`              | The black hole with the city behind it visibly distorting. Mid-distance, so both the shader and the bent buildings read      |

Optional bonus:
- `vfx-fog-player-glow.webp` — distant player only visible because the fog around them glows from their point light. Strong portfolio shot.

## Systems and Tools (`/projects/splat2/systems-and-tools/`)

| Filename                          | What to capture                                                                                                              |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `systems-cutscene-opening.mp4`    | Short clip of the opening cutscene flying along the city route. 6 to 10 seconds, looped                                       |

Optional bonus:
- `systems-loading-bar.webp` — the loading screen with the progress bar mid-load.
- `systems-ghost-race.webp` — running a race with the transparent ghost visible alongside.

## Design Decisions (`/projects/splat2/design-decisions/`)

This article is image-driven by intent. Each section needs at least one image, more is better.

| Section            | Suggested filenames                                                                                                              |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------|
| Visual identity    | `design-concept-1.webp`, `design-palette.webp`, `design-identity-ref.webp`                                                       |
| Map structure      | `design-map-sketch.webp`, `design-density-pass.webp`, `design-route-diagram.webp`                                                |
| Player feel        | `design-playtest-clip.mp4`, `design-tuning-before-after.webp`                                                                    |
| Visual cues        | `design-gameplay-cues.webp`                                                                                                      |
| What got cut       | `design-cut-feature-1.webp`, `design-cut-feature-2.webp`                                                                         |

You will also need to write the prose for "Visual identity", "Map structure", and "What got cut" in your own voice. The article is a frame waiting for content.

## How to swap an image marker for the real tag

Each article has lines like this:

```html
{% comment %} IMAGE: a curved building rendered next to its CPU convex hull in debug view. {% endcomment %}
```

Replace with a normal markdown image:

```markdown
![Curved building next to its CPU convex hull collider](/assets/images/splat2/buildings-curved-collider.webp)
```

For an mp4 clip, use raw HTML so it auto-plays muted in a loop (matches the project page treatment):

```html
<video autoplay muted loop playsinline aria-label="Trail clip">
  <source src="/assets/images/splat2/vfx-trail-loop.mp4" type="video/mp4">
</video>
```

## Bottom gallery (optional)

Each article's frontmatter supports an `images:` array that renders a gallery at the bottom of the page. Use it for extra screenshots that did not fit inline.

```yaml
images:
  - "/assets/images/splat2/extra-shot-1.webp"
  - "/assets/images/splat2/extra-shot-2.webp"
  - "/assets/images/splat2/extra-clip.mp4"
```

## When you are done

After every marker has been replaced, run:

```
grep -rn "IMAGE:" _project_docs/splat2/ projects/splat2.md
```

If that returns nothing, every image is wired up. Delete this file when the work is finished.
