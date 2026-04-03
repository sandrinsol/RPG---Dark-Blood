# Design System Document: Gothic Character Interface

## 1. Overview & Creative North Star
### Creative North Star: "The Reliquary of Lost Souls"

This design system moves away from the sterile, utilitarian grids of modern web design to embrace the oppressive, atmospheric weight of High Gothic fantasy. We are not building a dashboard; we are crafting a digital artifact. The interface should feel like a medieval manuscript recovered from a Victorian cathedral—heavy, ornate, and steeped in ritual.

To break the "template" look, we utilize **intentional asymmetry**. Key character portraits or lore text should occupy disproportionate space, while stats are tucked into dense, high-contrast clusters. We eschew standard rounded corners for sharp, aggressive 90-degree angles (`0px` radius) to convey a sense of danger and cold stone.

---

## 2. Colors

The palette is anchored in the void, utilizing deep blacks and blood-soaked reds, punctuated by the glint of tarnished gold.

- **Primary (`#ffb4a8` / `#8b0000`):** Crimson and its derivatives are used for vitality, danger, and critical actions. The `primary_container` is your "blood" token, used for health bars and active status effects.
- **Secondary (`#e9c349` / `#af8d11`):** Gold and Ochre. These are reserved for divinity, leveling up, and rarity. Use these sparingly to ensure they remain "precious."
- **Neutral / Surface:** Based on `#131313`. We use a range of near-black values to create depth without relying on modern grey scales.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. They feel too "digital." To separate content, use **Tonal Transitions**. A character’s equipment grid should be defined by placing a `surface_container_high` block against the `surface_dim` background.

### Surface Hierarchy & Nesting
Treat the UI as a physical stone altar. 
- **Base Layer:** `surface` (`#131313`).
- **Nesting:** Place `surface_container` modules on top of the base. For inner details (like item slots), use `surface_container_lowest` to create a "recessed" or "carved" look into the stone.

### The "Glass & Gradient" Rule
To add "soul," never use flat crimson for buttons. Apply a subtle gradient from `primary` to `primary_container`. For floating overlays, use a `backdrop-blur` (12px+) with a semi-transparent `surface_container` to simulate a "scryer’s glass" effect.

---

## 3. Typography
We use **Newsreader** as our primary typeface. Its high-contrast serifs and sharp terminals evoke a Victorian editorial feel that is both legible and archaic.

- **Display-LG/MD (3.5rem - 2.75rem):** Reserved for Character Names or "YOU DIED" style event headings. Use high tracking (-2%) to make it feel oppressive.
- **Headline (1.5rem - 2rem):** Used for section headers (e.g., "Attributes," "Inventory").
- **Title-SM/MD (1rem - 1.125rem):** Used for specific stat names (Strength, Dexterity).
- **Body & Labels:** Used for flavor text and item descriptions. Ensure `on_surface_variant` (`#e3beb8`) is used for flavor text to keep it subordinate to the primary stats.

---

## 4. Elevation & Depth

### The Layering Principle
Forget shadows; think of **Inlays**. Use `surface_container_lowest` for elements that should feel "set into" the UI, and `surface_container_highest` for elements that are "on top" of the stack.

### Ambient Shadows
When an element must float (like a modal), use an ultra-diffused shadow. 
- **Shadow Token:** `0 20px 50px rgba(0, 0, 0, 0.8)` 
- This mimics the way a flickering torch would cast a soft, heavy shadow in a stone corridor.

### The "Ghost Border" Fallback
If you must define an edge, use a **Ghost Border**. Apply `outline_variant` (`#5a403c`) at 20% opacity. It should feel like a faint scratch in the metal, not a drawn line.

---

## 5. Components

### Buttons
- **Primary:** Background `primary_container` (`#8b0000`), Text `on_primary`. No radius. 
- **Secondary (The Ornate Button):** Background `surface_container_high`. Border top and bottom only using `secondary` (`#e9c349`) to create a "gold-trimmed" look.
- **State:** On hover, increase the `surface_bright` level or shift the crimson gradient to be more vibrant.

### Progress Bars (Health/Mana/EXP)
- **Container:** `surface_container_lowest`.
- **Fill:** Use `primary` for HP and `secondary` for EXP. 
- **Signature Touch:** Add a 1px "glint" on the top edge of the fill color using a lighter tint to simulate liquid or metal depth.

### Cards & Lists
- **Rule:** No dividers. 
- **Implementation:** Use a 16px vertical gap between list items. Use a slight background shift (`surface_container_low`) on every other item if list density is high.

### Additional Component: The "Relic Slot"
For inventory, use a perfectly square container with a `surface_container_lowest` background. When selected, apply a `secondary` (`#e9c349`) "Ghost Border" at 40% opacity and a faint inner glow.

---

## 6. Do's and Don'ts

### Do
- **Use High Contrast:** The jump between `#131313` (background) and `#e5e2e1` (text) should be sharp.
- **Embrace Negative Space:** Let the darkness breathe. Don't crowd the character panel; it should feel like a lonely figure in a cathedral.
- **Textural Depth:** If possible, overlay a subtle "grain" or "parchment" texture at 3% opacity over the entire UI.

### Don'ts
- **No Rounded Corners:** `0px` is the law. Rounds feel "friendly" and "mobile-app-like"—the opposite of our goal.
- **No Neon Colors:** Avoid the bright greens or blues seen in standard RPGs. Use the `secondary` gold or `on_surface_variant` for all non-health data.
- **No 1px Dividers:** Never use a solid line to separate the header from the body. Use a `surface_container_high` strip or simply more vertical space.