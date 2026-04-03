# Design System Document: The Eldritch Archive

## 1. Overview & Creative North Star
**Creative North Star: "The Haunted Manuscript"**

This design system moves away from the sterile, flat interfaces of modern web design to embrace the tactile, oppressive, and atmospheric weight of High-Fantasy Gothicism. It is not merely a UI; it is an artifact. By prioritizing intentional asymmetry, textural depth, and a "physical" sense of layering, we evoke the feeling of navigating a cursed Victorian ledger.

We break the "standard template" look through:
- **Sacred Geometry:** Using ornate frames instead of boxes.
- **Tonal Oppression:** A palette that feels like a low-lit cathedral.
- **Editorial Elegance:** High-contrast serif typography that feels etched rather than printed.

## 2. Colors
Our palette is rooted in the "Blood and Shadow" philosophy. We use deep purples and charcols to anchor the experience, with crimson serving as a warning or a reward.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Conventional lines are too "digital." Boundaries must be defined through:
- **Background Shifts:** A `surface-container-low` section sitting on a `surface` background.
- **Ornate Terminators:** Decorative SVG "flourishes" or corner ornaments to mark ends of sections.
- **Textural Contrast:** Transitioning from a `surface` (dark void) to a textured `surface-variant` (weathered parchment).

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical relics:
- **Base Layer (`surface` / `#131313`):** The infinite void.
- **Structural Layer (`surface-container-low` / `#1c1b1b`):** Recessed areas for secondary content.
- **The "Relic" Layer (`surface-container-high` / `#2a2a2a`):** Interactive panels or "active" states.
- **The Parchment (`surface-variant` / `#353534`):** Use this for main content areas where text must be legible. Apply a subtle noise texture or parchment SVG overlay to this token.

### The "Glass & Gradient" Rule
To add "soul," use subtle radial gradients on CTAs:
- **Primary CTA:** Transition from `primary` (`#ffb4a8`) at the top left to `primary_container` (`#4d0000`) at the bottom right.
- **Depth:** Use `backdrop-blur` (8px-12px) on floating menus using a semi-transparent `surface_container_highest` to create a "heavy mist" effect.

## 3. Typography
We utilize an editorial, high-contrast serif approach to ensure the UI feels like a curated manuscript.

*   **Display (`notoSerif`):** Used for world titles and major milestones. Large, imposing, and sharp. 
*   **Headline (`notoSerif`):** Used for menu headers. These should always be in Sentence case, never All-Caps, to maintain a "literary" feel.
*   **Body (`newsreader`):** A transitional serif that provides exceptional legibility against dark, textured backgrounds.
*   **Labels (`newsreader`):** Even at small sizes (11px-12px), the serif maintains an air of sophistication that sans-serifs lack in this context.

**Hierarchy Tip:** Increase letter-spacing on `label-sm` to 0.05rem to mimic old-world typesetting.

## 4. Elevation & Depth
In this system, depth is a product of light and shadow within a dark environment.

*   **Tonal Layering:** Never use a shadow to separate a card from a background. Instead, place a `surface-container-lowest` card on a `surface-container` background.
*   **Ambient Shadows:** For floating modals (e.g., item descriptions), use a large, diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);`. The shadow color should be a deep, tinted charcoal, never pure grey.
*   **The "Ghost Border" Fallback:** If a container requires definition (like a hover state), use `outline-variant` at 20% opacity. It should look like a faint glimmer of light hitting an edge.
*   **Victorian Framing:** For primary panels, use an SVG `border-image` that mimics wrought iron or carved ebony, rather than a CSS border.

## 5. Components

### Buttons
*   **Primary:** Sharp corners (`0px`). Background is a crimson gradient (`primary` to `primary_container`). Text is `on_primary`. 
*   **Secondary:** No background. `Ghost Border` (20% `outline`). On hover, the border opacity increases to 60% and the text glows slightly with a `text-shadow`.
*   **Tertiary:** Pure typography (`label-md`). Use `tertiary` (`#e9c349`) to indicate "Gold" or "Value."

### Input Fields
*   **Styling:** A `surface_container_lowest` well. Bottom-border only, using `outline_variant`.
*   **Focus State:** The bottom border transitions to `primary` (crimson), and a faint `primary_container` glow appears behind the text.

### Cards & Lists
*   **No Dividers:** Absolutely forbid horizontal 1px lines. Use 24px or 32px of vertical spacing to separate list items.
*   **Selection:** A selected list item should shift from `surface` to `surface_container_highest` with a subtle `primary` (crimson) vertical sliver (2px) on the left edge.

### Tooltips (The "Lore Whisper")
*   **Appearance:** `surface_container_highest` with a `newsreader` body-sm font. Use a 10px backdrop-blur. 
*   **Border:** Use an ornate, 1px gold (`tertiary`) frame with "notched" corners.

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Allow some panels to be slightly taller or offset to break the "web grid" feel.
*   **Embrace the Dark:** Use `surface_lowest` for the majority of the screen to make the `primary` (crimson) and `tertiary` (gold) accents feel meaningful.
*   **Texture Over Color:** When in doubt, add a subtle grain or paper texture to a surface rather than changing its hex code.

### Don't
*   **No Rounded Corners:** `0px` radius everywhere. Sharpness is a core tenet of this system's "danger."
*   **No Pure Greys:** All neutrals are tinted with purple or brown. Avoid `#333333`; use `surface_container` variants instead.
*   **No Modern Icons:** Avoid thin, geometric line icons. Use illustrative, woodcut-style icons or heavy-weighted symbols.
*   **No Rapid Transitions:** Hover states should be slow (300ms+) and "heavy," mimicking the flickering of candlelight.

### Accessibility Note
While the palette is dark, ensure all `on-surface` text meets WCAG AA standards. Use the `tertiary` (Gold) color sparingly to highlight critical interactive path elements that must not be missed.