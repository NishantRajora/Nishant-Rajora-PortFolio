# Your workplace has the answer. Just ask Dala for it. — Style Reference
> constellation floating on black velvet

**Theme:** dark

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Dala operates as a dark-stage environment where black voids meet a single vivid violet accent, punctuated by amber sparks. Typography is monolithic and weightless — PPNeueMontreal at weight 400 dominates every heading at outsized scales (78–113px) with aggressive negative tracking, so headlines feel sculptural rather than informational. The visual centerpiece is a constellation of tiny multicolored triangular particles forming an organic brain shape, which acts as the brand's signature gesture: knowledge visualized as distributed intelligence rather than hierarchical data. Layout follows a spacious two-column rhythm — oversized left-aligned headlines paired with generous body copy, floating on pure black with no panels, borders, or cards. Components are intentionally reduced to their most essential form: one violet pill button, ghost text links, and large-format text blocks.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#000000` | `--color-void` | Page canvas, section backgrounds, negative space — pure black is the dominant surface, not dark gray, creating the void that lets chromatic accents float |
| Bone White | `#ffffff` | `--color-bone-white` | Headlines, body text, icon fills, nav active state — the only typographic color, carrying maximum hierarchy on black |
| Ash Gray | `#9a9a9a` | `--color-ash-gray` | Muted nav text, ghost link color, secondary labels — recedes behind primary text without going invisible |
| Silver Mist | `#bdbdbd` | `--color-silver-mist` | Tertiary body text, caption-level information — the quietest readable gray, for supporting context |
| Electric Iris | `#8052ff` | `--color-electric-iris` | Primary action buttons, logo mark, brand accents — the single saturated violet that signals interactivity and brand identity against the black void |
| Saffron Spark | `#ffb829` | `--color-saffron-spark` | Highlight emphasis text, accent links, attention punctuation — warm yellow against violet creates the brand's chromatic tension |
| Deep Verdant | `#15846e` | `--color-deep-verdant` | Secondary surface tint, logo gradient stop — appears as the deeper end of the brand gradient and in subtle accent washes |

## Tokens — Typography

### PPNeueMontreal — Single typeface across all UI contexts. Display sizes (78–113px) carry headlines at weight 400 with -0.04em tracking — the same weight as body text but massive scale creates hierarchy. Weight 200 (ultra-light) is reserved for 18px body copy, a signature choice: most AI/SaaS sites use 400 for body, but Dala strips weight to make paragraphs feel airy and non-aggressive. Weight 600 at 14px with 0.025em tracking and uppercase serves nav and small labels. The number 400 doing both 113px display and 15px body is unusual — it means the brand trusts scale, not weight, for hierarchy. · `--font-ppneuemontreal`
- **Substitute:** Inter
- **Weights:** 200, 400, 600, 700
- **Sizes:** 12, 14, 15, 18, 24, 27, 36, 42, 48, 78, 113px
- **Line height:** 0.81, 0.90, 1.00, 1.10, 1.20, 1.25, 1.30, 1.50
- **Letter spacing:** -4.52px at 113px, -3.12px at 78px, -1.68px at 42px, -0.48px at 24px, normal at 18px body; 0.025em at 14px uppercase nav
- **OpenType features:** `"ss01" on`

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | — | — | 12px | 1.5 | — | `--text-caption` |
| nav-label | — | — | 14px | 1.2 | 0.35px | `--text-nav-label` |
| body | — | — | 18px | 1.5 | — | `--text-body` |
| heading-2xs | — | — | 24px | 1.25 | -0.48px | `--text-heading-2xs` |
| heading-xs | — | — | 27px | 1 | — | `--text-heading-xs` |
| subheading | — | — | 36px | 1.2 | — | `--text-subheading` |
| heading-sm | — | — | 42px | 1.2 | -1.68px | `--text-heading-sm` |
| heading | — | — | 48px | 1.1 | -1.68px | `--text-heading` |
| heading-lg | — | — | 78px | 1.1 | -3.12px | `--text-heading-lg` |
| display | — | — | 113px | 1.1 | -4.52px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 6px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 6 | 6px | `--spacing-6` |
| 12 | 12px | `--spacing-12` |
| 18 | 18px | `--spacing-18` |
| 24 | 24px | `--spacing-24` |
| 30 | 30px | `--spacing-30` |
| 36 | 36px | `--spacing-36` |
| 60 | 60px | `--spacing-60` |
| 96 | 96px | `--spacing-96` |
| 120 | 120px | `--spacing-120` |

### Border Radius

| Element | Value |
|---------|-------|
| nav | 24px |
| tags | 9999px |
| cards | 24px |
| buttons | 24px |

### Layout

- **Page max-width:** 1280px
- **Section gap:** 60-120px
- **Card padding:** 24-38px
- **Element gap:** 6-18px

## Components

### Primary Action Button
**Role:** Filled violet pill, the sole interactive CTA
Background #8052ff (Electric Iris), white text, 22.5px border-radius (pill), 14.4px vertical padding × 15.96px horizontal padding. PPNeueMontreal 14px weight 400 or 600, uppercase with 0.025em tracking.

### Ghost Text Button
**Role:** Underlined or bare text link, secondary action
No background, no border, color #ffffff or #9a9a9a. PPNeueMontreal 14px weight 400.

### Logo Lockup
**Role:** Brand mark + wordmark in header
Small triangular icon in #8052ff (violet) with a gradient fade through #15846 (teal), paired with wordmark in white.

### Team Member Card
**Role:** Portrait + name + role display
No background, no border, no shadow. Large rounded-rectangle portrait photo (~24px corner radius) with role label in 12px uppercase #8052ff and name in large white display type below. Social icons appear as small inline glyphs. Cards float on the black canvas with only whitespace separation.

### Navigation Bar
**Role:** Top-aligned site navigation
Transparent background sitting directly on black canvas. Logo left, nav links center/right in 14px uppercase with 0.025em tracking. Active or hover state: white. Inactive: #9a9a9a. Action button (filled violet pill) anchors the right edge. No border, no backdrop blur on the nav itself.

### Hero Constellation Visualization
**Role:** Signature brand imagery — brain-shape particle cloud
Thousands of tiny triangular glyphs (outlined, 1-2px) in a full spectrum of vivid colors (violet, amber, teal, magenta, blue) forming an organic brain or cloud shape against pure black. Individual particles are scattered/ambient across the surrounding space as well.

## Do's and Don'ts

### Do
- Use #8052ff (Electric Iris) exclusively for filled action buttons — no other saturated color should appear as a button background
- Set every headline at weight 400, never bold — achieve hierarchy through scale (78–113px) and tracking (-0.04em), not font weight
- Use PPNeueMontreal/Inter weight 200 for 18px body text — the ultra-light weight is a signature, do not substitute weight 400
- Maintain pure #000000 black as every section background — never use dark gray panels or card surfaces; the void is the design
- Apply -0.04em letter-spacing on all display sizes 42px and above, converting to approximately -4.52px at 113px
- Use 24px border-radius for buttons, cards, and nav elements as the consistent radius token — pill shapes only at very small sizes
- Let the particle constellation be the only hero imagery — do not introduce photography, illustrations, or product screenshots into the hero region

### Don't
- Do not use filled violet (#8052ff) for large background blocks or full sections — it is a button and accent color, not a surface
- Do not set body text at weight 400 — ultra-light (200) body copy is what distinguishes the reading experience
- Do not introduce card containers with borders, shadows, or background fills — elements float on black with whitespace alone
- Do not use color #0000ee (default browser link blue) — never specify it; use #ffb829 amber or #ffffff for links
- Do not add gradients to UI components — palette is flat; gradients belong only in the logo and the particle visualization
- Do not use system fonts as substitutes when PPNeueMontreal-equivalent geometry matters — use Inter as fallback but preserve the weight 200 body and weight 400 headline convention
- Do not place multiple filled buttons in proximity — the violet pill is reserved for singular primary actions per view
