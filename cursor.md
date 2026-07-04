# Trabalance Color System

Reference for UI, Tailwind tokens, and CSS variables. Use these tokens only — never hardcode hex in components.

---

## Brand / Primary

| Token | Hex | Role |
|-------|-----|------|
| `--c-primary` | `#4169e1` | Royal blue — main brand color |
| `--c-primary-deep` | `#3457c9` | Darker blue (gradients, hover) |
| `--c-primary-soft` | `#eaf0ff` | Tinted blue background |
| `--c-primary-line` | `#bcccff` | Light blue border/rule |

**Tailwind:** `primary`, `primary-deep`, `primary-soft`, `primary-line`

**Usage:** CTAs (`bg-primary hover:bg-primary-deep`), links, cursor accents, icon tints, testimonial left borders.

---

## Ink / Text (slate scale)

| Token | Hex | Role |
|-------|-----|------|
| `--c-ink` | `#0a0e27` | Near-black, primary text |
| `--c-ink-soft` | `#1e2235` | Headings |
| `--c-ink-mid` | `#475569` | Body text |
| `--c-ink-faint` | `#64748b` | Muted / secondary text |
| `--c-ink-fainter` | `#94a3b8` | Placeholder / disabled |

**Tailwind:** `ink`, `ink-soft`, `ink-mid`, `ink-faint`, `ink-fainter`

**Usage:**
- Headlines → `text-ink` or `text-ink-soft`
- Body → `text-ink-mid`
- Captions → `text-ink-faint` / `text-ink-fainter`
- On dark (hero/footer) → `text-white` / `text-white/70`

---

## Surfaces / Backgrounds (warm cream)

| Token | Hex | Role |
|-------|-----|------|
| `--c-surface` | `#ffffff` | Cards / base |
| `--c-surface-2` | `#f7f3eb` | Warm cream section bg |
| `--c-surface-3` | `#efeadf` | Deeper cream |
| `--c-rule` | `#e8e3d7` | Border |
| `--c-rule-soft` | `#f1ece2` | Faint border |

**Tailwind:** `surface`, `surface-2`, `surface-3`, `rule`, `rule-soft`

**Section rotation (homepage):**
1. Hero → dark gradient
2. Stats → `surface` (white)
3. Platform → `cream` gradient (`surface-2` → `surface-3`)
4. The Shift → `surface`
5. How It Works → `cream`
6. Customer Spotlight → `surface`
7. Why Trabalance → `cream`
8. Trusted By → `surface-2`
9. Testimonials → `surface`
10. Feature Strip → `cream`
11. Closing CTA → dark gradient
12. Footer → `ink`

**Cards on cream sections:** `bg-surface` with `border-rule` or `shadow-soft`.

**Blue tint accents** (icons, tags): `bg-primary-soft text-primary` — not full section fills.

---

## Accents (data viz / tags)

| Token | Hex |
|-------|-----|
| `--c-emerald` | `#10b981` |
| `--c-teal` | `#0d9488` |
| `--c-amber` | `#f59e0b` |
| `--c-coral` | `#fb7185` |
| `--c-pink` | `#ec4899` |
| `--c-violet` | `#7c3aed` |

**Tailwind:** `emerald`, `teal`, `amber`, `coral`, `pink`, `violet`

**Usage:** charts, status tags, metric highlights only — not primary UI chrome.

---

## Signature gradients

### Hero (dark)
```css
background: linear-gradient(180deg, #0a0e27, #0f1336);
/* plus royal-blue radial glows — see .bg-hero-gradient */
```

### Ribbon / CTA
```css
background: linear-gradient(90deg, #4169e1, #5e86ee, #bcccff);
```
**Class:** `.bg-ribbon-gradient` — optional accent strips, not default button fill.

### Soft section (cream)
```css
background: linear-gradient(180deg, #f7f3eb, #efeadf);
```
**Class:** `.bg-soft-section` — alternate section backgrounds.

### Glow shadow
```css
box-shadow: 0 20px 60px rgba(65, 105, 225, 0.25);
```
**Tailwind:** `shadow-glow`

---

## Shadows

| Token | Value |
|-------|-------|
| `--shadow-soft` | `0 4px 24px -4px rgb(10 14 39 / 0.08)` |
| `--shadow-soft-lg` | `0 8px 40px -8px rgb(10 14 39 / 0.12)` |
| `--shadow-glow` | `0 20px 60px rgba(65, 105, 225, 0.25)` |

---

## Do / Don't

**Do**
- Use `primary` for CTAs and key interactive states
- Use warm cream (`surface-2` / `cream` gradient) for section variety
- Use `rule` / `rule-soft` for borders on cream backgrounds
- Keep hero + closing CTA as the only dark full-bleed sections

**Don't**
- Hardcode hex values in components
- Use accent colors (emerald, coral, etc.) as section backgrounds
- Use `primary-soft` as a full-page fill — reserve for small tints
- Use cool grey (`#f4f6fb`) — replaced by warm cream scale

---

## Quick copy-paste (CSS)

```css
:root {
  --c-primary: #4169e1;
  --c-primary-deep: #3457c9;
  --c-primary-soft: #eaf0ff;
  --c-primary-line: #bcccff;
  --c-ink: #0a0e27;
  --c-ink-soft: #1e2235;
  --c-ink-mid: #475569;
  --c-ink-faint: #64748b;
  --c-ink-fainter: #94a3b8;
  --c-surface: #ffffff;
  --c-surface-2: #f7f3eb;
  --c-surface-3: #efeadf;
  --c-rule: #e8e3d7;
  --c-rule-soft: #f1ece2;
  --c-emerald: #10b981;
  --c-teal: #0d9488;
  --c-amber: #f59e0b;
  --c-coral: #fb7185;
  --c-pink: #ec4899;
  --c-violet: #7c3aed;
}
```
