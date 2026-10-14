---
name: product-marketing
description: Use when improving the portfolio's project imagery, SEO/AEO, social/OG cards, project case studies, launch updates, or search visibility.
---

# Portfolio product marketing

This site is a credibility surface. Optimize it to make real shipped work understandable and discoverable, not to inflate projects into things they were not.

## Read first

- `README.md` and `EDITING-GUIDE.md` for the site's content/asset conventions.
- The linked project repository before changing a project page's technical claims.
- Existing page frontmatter, project images, and recent SEO changes before rewriting metadata.

## Hard rules

1. **Project repos are the source of truth.** Do not hallucinate metrics, users, awards, employers, roles, performance numbers, or shipped status.
2. **Use real product screenshots first.** Generated art can support an abstract/technical project, but should not replace the actual thing when real visuals exist.
3. **Do not make every project page look the same.** The portfolio should show the identity of each product/game/tool.
4. **SEO is not keyword stuffing.** Titles/descriptions/body copy should still read like a strong human portfolio.
5. **Keep crawler-visible context.** Important facts should survive text extraction and not live only in images, animation, icons, or JS effects.
6. **Never edit `_site/`.** It is generated.

## Project visual workflow

For each serious project, prefer this asset hierarchy:

1. one strong hero image or short muted loop;
2. one image that proves the core interaction;
3. one image/diagram that explains the technically interesting part;
4. optional before/after, architecture, hardware, or result visual when it adds evidence.

Use WebP for still screenshots per the repo conventions. Keep screenshots clean, crop deliberately, and remove private data/debug UI.

When a project has a dedicated repo marketing skill, use that skill's capture plan rather than inventing a second story here.

## SEO / AEO

For each project page:

- unique useful title and meta description;
- plain-language opening paragraph containing what the project is, what it does, and the user's role;
- descriptive alt text;
- canonical/social metadata consistent with the page;
- enough crawlable technical context to be understood without parsing the image gallery;
- current project links and shipped/download/store state.

For the homepage, prioritize clear identity + strongest projects rather than cramming every keyword or repository into the hero.

## Social / sharing assets

Maintain reusable OG/social images for the homepage and top projects. A good card should make the project recognizable at a glance: actual product visual + project name + one short proof/value line. Avoid generic gradient-logo cards.

## Output contract

When asked to improve a project or the site, produce:

- the factual project story grounded in the source repo;
- recommended hero/gallery assets and exact capture sources;
- project-page copy/metadata changes;
- OG/social asset brief;
- technical SEO/AEO checks;
- broken/stale claims or links discovered during the audit.
