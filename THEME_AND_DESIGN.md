# ROBOELEN — Theme & Design System

A practical visual specification for the ROBOELEN freshers registration website. The design must follow the supplied event poster: a bold **mustard-gold and ink-black palette**, distressed print textures, heavy poster typography, brush-stroke energy, and a celebratory blend of Indian cultural performance and contemporary party style.

The site is a mobile-first registration experience reached by scanning a QR code. It should feel like the poster has come to life—not like a generic SaaS dashboard, cyberpunk app, or neon gaming interface.

---

## 1. Design Direction

### Core visual idea: “Gold, Ink & Celebration”

- **Poster-led identity:** Take the supplied ROBOELEN poster as the source of truth for color, texture, contrast, and event personality.
- **Ink-black foundation:** Use near-black surfaces for the registration flow, echoing the poster’s dark lower half and giving bright gold room to stand out.
- **Mustard-gold highlights:** Use saturated golden yellow for headings, active steps, buttons, rules, and important moments.
- **Printed, tactile texture:** Add restrained paper grain, worn ink, and rough brush-stroke details. Textures should be decorative and must never make form fields or labels hard to read.
- **Bold editorial typography:** Use condensed, heavyweight display lettering for event branding and key headings. Pair it with a clean sans-serif for forms and instructions.
- **Festive, not futuristic:** The mood should be energetic, youthful, artistic, and celebratory. Avoid sci-fi HUDs, circuit-board grids, holographic glass, cyan/purple neon, and excessive glow effects.
- **Mobile-first:** Design for roughly 360–430px wide phones first. Keep controls large and thumb-friendly for people registering in a busy event queue.

### Visual ingredients to borrow from the poster

1. A warm golden field against a deep black background.
2. Black distressed brush strokes and rough print edges as small decorative accents.
3. Strong, condensed uppercase lettering for “ROBOELEN”.
4. Thin gold or warm-white rules with generous letter spacing for supporting labels.
5. Editorial balance: expressive display typography paired with simple, highly readable form layouts.
6. Cultural and party energy represented through abstract brush marks or carefully cropped decorative silhouettes—not random stock illustrations or unrelated robotics icons.

**Important:** The website form must remain clear and accessible. Do not place distressed textures directly behind essential text, input values, validation messages, or buttons.

---

## 2. Color Palette & Design Tokens

Use these tokens consistently. Gold is the main accent; white is used for readable text; black and charcoal provide structure.

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#080807` | Main page background; ink-black base |
| `--color-bg-elevated` | `#11110F` | Main registration panel and elevated surfaces |
| `--color-bg-soft` | `#1B1A16` | Secondary panels, inactive cards, subtle blocks |
| `--color-surface-input` | `#171612` | Text inputs and select controls |
| `--color-border` | `#49402A` | Quiet borders and dividers on dark backgrounds |
| `--color-gold` | `#F4B900` | Primary accent, active states, primary button |
| `--color-gold-bright` | `#FFD23F` | Small highlights, active progress state, hover emphasis |
| `--color-gold-deep` | `#B98200` | Darker gold for borders and gradients |
| `--color-gold-paper` | `#F8D96A` | Warm decorative highlight inspired by the poster’s top field |
| `--color-text` | `#F7F3E8` | Primary text on dark backgrounds |
| `--color-text-muted` | `#B9B3A4` | Secondary text, helper copy, labels |
| `--color-text-on-gold` | `#11100B` | Text on gold buttons or selected gold surfaces |
| `--color-error` | `#F06A57` | Validation errors; do not rely on color alone |
| `--color-success` | `#9CCB78` | Successful completion or confirmation |

### Color usage rules

- Use **gold + black** as the dominant visual relationship. Gold should feel printed and bold, not fluorescent.
- Keep normal body copy off-white on black for comfortable reading.
- Use near-black text on gold buttons to maintain strong contrast.
- Gold gradients are allowed when subtle: `linear-gradient(135deg, #FFD23F 0%, #F4B900 55%, #B98200 100%)`.
- Do not use cyan, electric blue, purple, rainbow gradients, or multicolor neon as brand colors.
- Red/orange is reserved for errors. Green is reserved for success states.
- Do not use gold body text at small sizes when off-white would be clearer.

### Suggested CSS variables

```css
:root {
  --color-bg: #080807;
  --color-bg-elevated: #11110f;
  --color-bg-soft: #1b1a16;
  --color-surface-input: #171612;
  --color-border: #49402a;
  --color-gold: #f4b900;
  --color-gold-bright: #ffd23f;
  --color-gold-deep: #b98200;
  --color-gold-paper: #f8d96a;
  --color-text: #f7f3e8;
  --color-text-muted: #b9b3a4;
  --color-text-on-gold: #11100b;
  --color-error: #f06a57;
  --color-success: #9ccb78;

  --font-display: "Anton", "Oswald", Impact, sans-serif;
  --font-heading: "Oswald", "Inter", sans-serif;
  --font-body: "Inter", Arial, sans-serif;

  --radius-card: 18px;
  --radius-control: 12px;
  --shadow-card: 0 16px 48px rgba(0, 0, 0, 0.38);
  --shadow-gold: 0 8px 24px rgba(244, 185, 0, 0.14);
}
```

---

## 3. Typography

The poster mixes a formal university headline with bold, condensed event lettering. Recreate that contrast rather than using futuristic geometric type.

### Font families

Recommended Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&family=Oswald:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
```

- **Display (`--font-display`): `Anton`, with `Impact` as fallback.** Very bold and condensed. Use for the ROBOELEN wordmark and major reveal headline.
- **Headings (`--font-heading`): `Oswald`.** Strong, readable, poster-like. Use for step titles, branch names, and uppercase section labels.
- **Body and controls (`--font-body`): `Inter`.** Use for names, USNs, instructions, validation, and accessibility-critical copy.
- **Optional editorial serif: `Playfair Display`.** Reserve for a small institution/event detail if needed. Do not use it for form controls.

### Type scale

| Element | Suggested size | Weight / style | Treatment |
|---|---:|---|---|
| Compact event wordmark | 20–24px | Anton / uppercase | Gold with restrained tracking |
| Main welcome/reveal heading | `clamp(2.4rem, 10vw, 4.5rem)` | Anton / 400 | Tight line-height, gold or off-white |
| Registration step heading | 28–34px | Oswald / 600–700 | Off-white; one short gold emphasis is fine |
| Branch card title | 22–26px | Oswald / 600–700 | Uppercase |
| Body instruction | 15–17px | Inter / 400–500 | Off-white or muted text |
| Input value | 17–19px | Inter / 500–600 | Off-white |
| Eyebrow / progress label | 11–13px | Inter / 600 | Uppercase with `0.12em` tracking |
| Button label | 15–17px | Inter / 700 | Short, clear action text |

### Typography rules

- Use uppercase and wider tracking for short labels, not long sentences.
- Use condensed display type only for headings; long copy in condensed fonts is difficult to scan.
- Avoid cyan-to-purple text gradients. Prefer solid gold, warm white, or a very subtle gold tonal shift.
- Keep line lengths comfortable on mobile and allow headings to wrap naturally.

---

## 4. Background, Texture & Decorative Details

### Main background

Use a near-black base with a very subtle, warm vignette. The background should visually echo the poster’s black lower area without overpowering the form.

```css
.app-background {
  min-height: 100svh;
  color: var(--color-text);
  background:
    radial-gradient(ellipse at 50% 0%, rgba(244, 185, 0, 0.10), transparent 42%),
    linear-gradient(180deg, #11100b 0%, #080807 52%, #050505 100%);
}
```

### Print-grain texture

Apply a low-opacity texture using a lightweight local image asset or a small CSS/SVG noise layer. Keep it subtle, approximately 3–7% opacity. If using a pseudo-element, set `pointer-events: none` and keep it behind the content.

```css
.texture-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: screen;
  z-index: 0;
}

.app-content {
  position: relative;
  z-index: 1;
}
```

The example above only defines layering; the actual grain source may be a local texture asset or a lightweight generated noise SVG. Do not load a large animated texture or a remote asset that could delay the registration page.

### Brush-stroke accents

- Use a few static brush-stroke shapes or an optimized transparent PNG/SVG inspired by the poster’s black ink marks.
- Keep them near the edges, behind content, or near the event wordmark.
- Use black-on-gold or gold-on-black marks; do not create a dense visual mess.
- Never let an accent overlap the input, button label, selected branch name, or validation text.
- Avoid animated particles, circuit grids, glowing orbs, glassmorphism, and heavy blur effects.

### Dividers and framing

Use thin warm-gold or muted-gold lines to echo the horizontal rules in the poster. A short line above or below an eyebrow label is enough; avoid boxing every element.

```css
.poster-rule {
  height: 1px;
  border: 0;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
  opacity: 0.8;
}
```

---

## 5. Motion & Micro-Interactions

Motion should feel confident and celebratory, not like a gaming HUD. Keep animations quick, purposeful, and comfortable for mobile devices.

### Page transitions

If Framer Motion is already installed, animate each registration screen with a short fade and small vertical movement. Do not add a new animation dependency only for this effect.

```jsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.24, ease: "easeOut" }}
>
  {/* current step */}
</motion.div>
```

If Framer Motion is not installed, use a simple CSS transition instead.

### Button interaction

- Hover (mouse/trackpad): move up by at most `-1px` and slightly brighten the gold.
- Press/tap: scale down gently to `0.98`.
- Focus: show a clear high-contrast outline.
- Disabled: reduce opacity and remove decorative shadow.
- Never make hover the only way to understand a control; touch is the primary interaction.

### Final reveal

- A one-time gold confetti burst is appropriate after registration, using a small number of pieces and respecting reduced-motion settings.
- Prefer simple paper-like gold/cream confetti instead of neon rainbow confetti.
- Avoid continuous pulsing, aggressive shaking, cursor trails, or looping effects that distract from the event message.

### Reduced motion

Respect `prefers-reduced-motion: reduce`. Remove confetti and large transitions when reduced motion is requested.

---

## 6. Component Design Specifications

### Primary action button (`.btn-primary`)

- **Minimum height:** 52px.
- **Width:** Full width on mobile, unless the layout clearly calls for a smaller button.
- **Background:** `linear-gradient(135deg, #FFD23F 0%, #F4B900 58%, #D99A00 100%)`.
- **Text:** `#11100B`, Inter 700.
- **Border:** 1px solid `#FFD23F`.
- **Radius:** 12px; avoid overly pill-shaped cyber UI.
- **Shadow:** `var(--shadow-gold)`; keep it soft, not neon.
- **Hover:** Slightly brighten and lift by 1px.
- **Pressed:** `transform: scale(0.98)`.
- **Disabled:** muted gold, reduced opacity, no shadow, `cursor: not-allowed`.

### Secondary/back button (`.btn-secondary`)

- **Minimum height:** 48–52px.
- **Background:** transparent or `#171612`.
- **Border:** 1px solid `#49402A`.
- **Text:** `#F7F3E8`.
- **Hover/focus:** border changes to gold and background receives a subtle `rgba(244, 185, 0, 0.06)` tint.
- Keep the back action visually secondary to the primary action.

### Text inputs

- **Minimum height:** 54px.
- **Background:** `var(--color-surface-input)`.
- **Border:** 1px solid `var(--color-border)`.
- **Radius:** 12px.
- **Padding:** `14px 16px`.
- **Text:** `var(--color-text)`; placeholder uses `var(--color-text-muted)`.
- **Focus:** gold border plus a restrained `0 0 0 3px rgba(244, 185, 0, 0.18)` ring.
- **Error:** `var(--color-error)` border and a clear, visible error message beneath the input.
- Do not use uppercase transformations on a person's name. USN normalization/validation should follow the application's existing functional rules.

### Branch selection cards

- **Padding:** `18px 20px`.
- **Minimum height:** 76px; preserve generous tap area.
- **Radius:** 14–16px.
- **Unselected:** `#11110F` surface with a 1px muted-gold/charcoal border.
- **Selected:** black surface with a 2px gold border and a restrained warm-gold tinted background.
- **Selection marker:** clear checkmark or filled gold dot aligned consistently; do not rely on glow alone.
- **Typography:** Oswald 600–700 for the branch name; optional supporting line in Inter if the existing UI needs it.
- Keep the existing branch options and form logic unchanged while restyling the cards.

### Progress indicator (`ProgressDots` or equivalent)

The registration has three form steps: name, USN, and branch.

- Show `STEP 1 OF 3`, `STEP 2 OF 3`, and `STEP 3 OF 3` or an equivalent clear label.
- Inactive indicator: muted charcoal/gold border.
- Completed indicator: solid gold.
- Active indicator: wider gold pill with a subtle shadow, not a neon glow.
- Ensure the current step is understandable without color alone; include a text label or accessible status.

### Registration panel

- Center a focused, single-column form inside a `max-width: 448px` container.
- Use a dark surface with a subtle border or shadow, not glassmorphism.
- Keep generous vertical spacing between the wordmark, progress, heading, field, and button.
- Avoid a large card-on-card-on-card layout. The poster texture and typography should provide the personality.

---

## 7. Page-by-Page Visual Treatment

The visual system applies to the existing user flow. Styling changes must not silently change registration behavior, field order, branch choices, data handling, or validation rules.

### Page 1 — Name

- Show a compact ROBOELEN wordmark at the top, in Anton/Oswald and gold.
- Small eyebrow: `FRESHERS’ PARTY` or the existing configured event label.
- Heading: `LET’S START WITH YOUR NAME` or retain the app’s existing copy if already finalized.
- One clear full-name input and one primary gold button.
- Add a thin gold rule or small brush-stroke detail near the heading, not behind the input.

### Page 2 — USN

- Keep the same layout and visual rhythm as Page 1 so the experience feels continuous.
- Heading uses Oswald; helper copy remains simple Inter.
- Make the USN field visually prominent and easy to read.
- Provide a visible back button and preserve entered data when navigating backwards.

### Page 3 — Branch selection

- Present the existing three branches as large, vertical selection cards suitable for a phone.
- Use gold borders and clear selected-state markers.
- If the current application options are ECE, VLSI, and RI, keep those exact choices unless the project owner changes them separately. The poster's listed department text must not silently overwrite the registration form options.
- Include a clear continue button and keep it disabled until a branch is selected, if that matches the existing validation flow.

### Page 4 — Welcome / reveal

- Make this a high-impact poster-style screen with bold condensed typography and a gold/black composition.
- Use a concise event welcome message, with gold emphasis on the event name.
- A restrained gold confetti burst can mark completion.
- Keep the welcome copy in the application's configuration so the event title/date can be changed without editing styling code. The uploaded poster itself displays **ROBOELEN 5.0**; use the project's agreed event copy for the welcome text.

### Page 5 — Official poster

- Display the **original supplied poster asset**. Do not redraw, regenerate, crop, recolor, or recreate its text in HTML.
- Keep the whole poster visible with `width: 100%; height: auto; object-fit: contain;` and preserve its aspect ratio.
- Use a black background with a restrained gold border or rule around the poster if needed.
- Do not compress the poster into a square card, stretch it, or cover any event details with overlays.
- If the poster is stored at `public/poster.png`, load that file directly and provide meaningful alt text.
- On small screens, allow vertical scrolling so the full poster can be inspected at readable size.

---

## 8. Mobile-First Layout Specifications

Target 360px–430px phones first, then scale gracefully to tablets and desktops.

- Main content width: `min(100%, 448px)`.
- Horizontal safe padding: 20px on phones; increase to 24–32px on wider screens.
- Page height: use `min-height: 100svh` and account for mobile browser chrome.
- Form layout: one column; never place the label and input side by side on narrow screens.
- Inputs/buttons: at least 48px tall; preferred primary button height is 52px or more.
- Maintain visible focus states and adequate contrast in sunlight as well as dim environments.
- Ensure the on-screen keyboard does not permanently hide the active input or the Next button. Let the page scroll when necessary.
- Avoid horizontal overflow, fixed-height form panels, and essential text positioned over decorative textures.
- The poster page should scroll naturally and keep the entire image proportional.

### Suggested mobile composition

```text
┌────────────────────────────────────┐
│           ROBOELEN                  │  Gold condensed wordmark
│        FRESHERS’ PARTY               │  Small uppercase label
│  ────────────────────────────────    │  Thin gold rule
│                                    │
│  STEP 1 OF 3                       │  Clear progress status
│                                    │
│  LET’S START WITH                  │  Bold, condensed heading
│  YOUR NAME                         │
│  Add your name to enter the event. │  Readable body copy
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Enter your full name         │  │  High-contrast input
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │            NEXT →            │  │  Gold primary button
│  └──────────────────────────────┘  │
│                                    │
│    Subtle grain / brush accents     │  Decorative, behind content
└────────────────────────────────────┘
```

---

## 9. Accessibility, Performance & Implementation

- Meet WCAG-minded contrast expectations: text should remain readable against all backgrounds, including textured areas.
- Every input needs a visible label; do not rely only on placeholder text.
- Keep keyboard navigation, clear focus rings, and screen-reader status announcements for validation and progress.
- Use semantic buttons and inputs, and ensure branch cards are keyboard selectable.
- Respect `prefers-reduced-motion: reduce`.
- Keep texture assets lightweight and local where possible. Avoid large videos, canvas effects, and unnecessary animation libraries.
- Ensure the site remains fast after opening from a QR code on mobile data.
- Do not change registration logic while applying this design system. The task is a visual restyle unless separate implementation requirements say otherwise.

---

## 10. Do / Don’t Checklist

### Do

- Use mustard gold, warm yellow, off-white, charcoal, and ink-black.
- Use Anton/Oswald for bold display type and Inter for readable body copy.
- Use restrained grain, brush marks, poster-style rules, and strong spacing.
- Keep the form simple, polished, and mobile-friendly.
- Let the final poster asset remain the hero on the poster screen.
- Use gold selection states and clear, accessible focus rings.

### Don’t

- Do not retain the old cyan/purple cyberpunk palette.
- Do not use neon glows, holographic cards, sci-fi grids, or glassmorphism.
- Do not put noisy textures behind fields or small text.
- Do not redraw, rewrite, crop, stretch, or recolor the official poster.
- Do not change the existing registration steps or branch values as part of a visual redesign.
- Do not use animated effects that delay registration or make the QR-entry experience feel slow.

---

## Final Direction for the Coding Agent

Restyle the existing ROBOELEN registration website to match the supplied poster’s **gold-and-black distressed editorial aesthetic**. Replace the former cyan/purple cyberpunk visuals with warm gold accents, ink-black surfaces, condensed poster typography, subtle print grain, and restrained brush-stroke details. Keep the existing page sequence, field behavior, validation, responsive layout, and original poster asset intact. The result should feel like an elegant, energetic extension of the ROBOELEN poster—not a generic registration template.
