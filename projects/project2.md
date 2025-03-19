---
layout: project
title: "OpenGL Text-Renderer"
github_link: "https://github.com/Bbrizly/OpenGL-Text-Renderer"
images:
  - "/assets/images/s2.png"
---

This **OpenGL-based Text-Renderer** uses a Font-sheet approach to dynamically shrink text to fit textboxes. 

## What has been done

1. **Unified Array Texture**  
   - All pages of a given font are merged into **one** texture array. This greatly simplifies binding in OpenGL and avoids multiple texture switches per letter.

2. **Multiple Font Sizes**  
   - By scanning filenames (`"MyFont0.fnt"`, `"MyFont1.fnt"`, etc.), you take care of all sizes
   - The program automatically picks smaller fonts if text won’t fit the bounding box at size=1.

3. **Wrapping & Truncation**  
   - Single-word overflow triggers **hyphenation**.
   - Forced breaks `\n` are accounted for.  
   - If final text still exceeds the box height, it’s truncated from the bottom with an ellipsis (`"..."`).

4. **TextTable Integration**  
   - Simple CSV-based approach to store multiple languages or dynamic placeholders (e.g., `{scoreValue}`).
   - Automatic re-substitution if the table changes language or placeholder data.

5. **Decoupled Rendering**  
   - `TextRenderer` only draws all boxes; each `TextBox` manages its own geometry.  
   - This keeps it flexible for adding or removing text boxes at runtime.

You get a **scalable** text-rendering system that can handle multiple fonts, multiple languages, on-the-fly changes, and robust 
word-wrapping/truncation — **all** driven by array textures for efficiency.

- **Highlights**:
  - Dynamic word-wrapping
  - Highly customizable
  - Integration with multiple languages
