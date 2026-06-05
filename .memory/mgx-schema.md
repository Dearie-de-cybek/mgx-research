# MGX — Site Schema & Design Brief
> AI Continuity File: read this before touching any code.
> Last updated: 2026-06-05 | Status: PRE-IMPLEMENTATION (schema only)

---

## 1. Company Identity

**Full name**: MexyGabriel
**Brand shortform**: MGX
**Tagline**: "From Insight to Impact"
**Site**: mgx-research (main tech solutions platform)
**Positioning**: The next-level technology partner for startups, enterprises, and public institutions — turning research-grade thinking into real-world solutions.

**Voice**: Authoritative but accessible. Expert but not arrogant. We build things that matter.

---

## 2. Site Architecture

### Pages / Sections (Single Page App or Multi-page — TBD)

```
/ (Home)
  ├── Hero
  ├── About MGX
  ├── Services (6 Pillars)
  ├── MGX Campus (Innovation Hub)
  ├── Products
  ├── Work / Case Studies
  └── Contact / CTA

/services/[pillar]     → deep-dive per pillar
/campus                → MGX Campus standalone
/work/[case-study]     → individual case study
```

---

## 3. Content Schema

### 3.1 Hero

```
HEADLINE:      "From Insight to Impact"  [display, NOS font]
SUBHEAD:       Powering the next generation of tech-driven organizations
               across Africa and beyond.
DESCRIPTOR:    We research. We build. We deploy.
CTA PRIMARY:   Explore Our Solutions
CTA SECONDARY: Visit MGX Campus
AMBIENT:       Marquee ticker (see §8 Animations)
VISUAL:        Liquid glass hero element — TBD (3D orb / abstract form / none)
```

### 3.2 About MGX

```
EYEBROW:    Who We Are
HEADLINE:   Built at the intersection of research and real-world impact.
BODY:       MexyGabriel (MGX) is a technology solutions company that bridges
            the gap between cutting-edge research and practical deployment.
            We serve startups, enterprises, and governments — designing systems
            that are intelligent, resilient, and human-centered.

PROOF POINTS (3 stats):
  - [X] Solutions Deployed
  - [X] Partners & Clients
  - [X] Countries of Impact

DIFFERENTIATORS:
  1. Research-first methodology — we don't guess, we validate
  2. Full-stack capability — strategy to infrastructure to deployment
  3. Africa-rooted, globally-minded
  4. Human-centered by default
```

### 3.3 Services — 6 Consolidated Pillars

> Consolidation rationale: original list had 18 items with overlap.
> Collapsed into 6 thematic pillars. Each pillar = research domain + commercial offering.

---

**PILLAR 1: Intelligence Systems**
- Research domain: Artificial Intelligence & Machine Learning
- Commercial services: Data Analytics & Business Intelligence, SaaS Solutions, AI-powered custom software
- Tagline: "Systems that learn. Decisions that matter."
- Icon concept: neural mesh / data flow

**PILLAR 2: Security & Resilience**
- Research domain: Cybersecurity & Infrastructure Resilience + Security, Identity & Threat Intelligence
- Commercial services: Cybersecurity Services, Managed IT Services, Identity & Access Management
- Tagline: "Defend. Detect. Respond."
- Icon concept: shield lattice / lock geometry

**PILLAR 3: Automation & Robotics**
- Research domain: Robotics and Automation
- Commercial services: Robotic Process Automation (RPA), Automation Services, Process Intelligence
- Tagline: "Let machines do the repeating. Let humans do the thinking."
- Icon concept: gear + circuit arm

**PILLAR 4: Digital Infrastructure**
- Research domain: Digital Transformations
- Commercial services: Custom Software, Cloud Solutions, Enterprise Solutions
- Tagline: "The foundation everything runs on."
- Icon concept: layered architecture blocks

**PILLAR 5: Governance & Smart Systems**
- Research domain: Digital Governance & Public Service Optimization + Smart Cities & Urban Technology
- Commercial services: E-Governance Solutions, Smart City integrations
- Tagline: "Technology that serves people, not the other way around."
- Icon concept: city grid / civic network

**PILLAR 6: Human-Centered Innovation**
- Research domain: HealthTech & Human-Centered Design + EdTech & Future of Learning
- Commercial services: HealthTech platforms, EdTech platforms, UX-led product development
- Tagline: "Innovation with the human in the room."
- Icon concept: person + circuit / leaf + data

---

### 3.4 MGX Campus

```
EYEBROW:    MGX Campus
HEADLINE:   Our Innovation Hub
SUBHEAD:    Where research becomes reality.
BODY:       MGX Campus is our physical and digital hub for research, experimentation,
            and collaboration. A space where engineers, researchers, designers,
            and entrepreneurs converge to build what's next.

FEATURES:
  - Innovation Labs (per pillar)
  - Startup Incubation Program
  - Research Partnerships
  - Workshops & Masterclasses
  - Open-source contributions

CTA:        Apply to MGX Campus / Learn More
VISUAL:     Full-width section, liquid glass overlay panels, campus imagery or illustration
```

### 3.5 Products

> To be defined in detail. Current known categories:

```
STRUCTURE:
  - Product name
  - One-line description
  - Pillar association
  - Status: [Live / Beta / In Development]
  - CTA: [Try Free / Request Demo / Learn More]

KNOWN PRODUCTS: TBD — populate when product names confirmed
```

### 3.6 Positioning Statement

```
FOR:        Startups, SMEs, enterprises, government agencies
WHO NEED:   Trusted technology partners that understand both research depth
            and deployment speed
WE ARE:     A full-spectrum tech solutions company
UNLIKE:     Generic IT vendors or pure consultancies
WE:         Combine research rigor with hands-on building
SO THAT:    Clients get solutions that actually work, at scale, long-term
```

---

## 4. Design System

### 4.1 Aesthetic Direction

**Name**: Liquid Minimal
**Thesis**: Clean, confident, fluid. Not cold — warm intelligence.
  "A fluid site is responsive, but not all responsive sites are fluid." — Sam McKinney

**Core qualities:**
- Liquid glass surfaces (translucent, layered, depth)
- Generous whitespace — light, breathing layouts
- Typography-led hierarchy
- Motion that reveals, never distracts
- No dark mode — light theme only

### 4.2 Font System

```css
/* BRAND / WORDMARK — MGX logotype only */
font-family: 'NOS', sans-serif;

/* PRIMARY — headlines, nav, body, UI */
font-family: 'PPNeueMontreal', ui-sans-serif, system-ui, -apple-system,
             BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
             Arial, 'Noto Sans', sans-serif,
             'Apple Color Emoji', 'Segoe UI Emoji',
             'Segoe UI Symbol', 'Noto Color Emoji';

/* TECHNICAL — code, stats, data labels, mono accents */
font-family: 'IBMPlexMono', ui-monospace, monospace;

/* EDITORIAL — pull quotes, long-form, contrast moments */
font-family: 'Times New Roman', Times, serif;
```

**Usage rules:**
- PPNeueMontreal: all navigation, headings (H1–H4), body copy, CTAs, UI labels
- NOS: ONLY the "MGX" logotype/wordmark — nowhere else
- IBMPlexMono: stat numbers, code snippets, technical specs, data callouts, ticker/marquee
- Times New Roman: pull quotes, editorial callouts, campus long-form — sparingly

**Scale:**
```
Hero display:  clamp(4rem, 9vw, 11rem)   | tracking: -0.04em | weight: 600–700
Section head:  clamp(2.5rem, 5vw, 5rem)  | tracking: -0.03em | weight: 600
Subhead:       clamp(1.25rem, 2vw, 2rem) | tracking: -0.01em | weight: 400
Body:          1rem / 1.625              | tracking: 0        | weight: 400
Mono data:     0.875rem                  | tracking: 0.02em   | weight: 400
```

### 4.3 Color — Light Theme Only

```css
:root {
  /* Base surfaces */
  --color-bg:           oklch(98% 0.006 80);      /* warm near-white */
  --color-surface:      oklch(96% 0.008 75);      /* cards, sections */
  --color-surface-2:    oklch(93% 0.010 70);      /* elevated surface */

  /* Text */
  --color-text:         oklch(14% 0.012 260);     /* near-black, cool undertone */
  --color-text-muted:   oklch(45% 0.010 260);     /* secondary text */
  --color-text-faint:   oklch(65% 0.008 260);     /* labels, captions */

  /* Brand accent */
  --color-accent:       oklch(52% 0.22 255);      /* MGX blue-violet */
  --color-accent-light: oklch(92% 0.06 255);      /* accent tint for tags */

  /* Liquid glass */
  --glass-bg:           oklch(99% 0.004 80 / 0.65);
  --glass-border:       oklch(100% 0 0 / 0.25);
  --glass-shadow:       oklch(14% 0.012 260 / 0.08);

  /* Functional */
  --color-border:       oklch(88% 0.008 80);
  --color-divider:      oklch(92% 0.005 80);
}
```

### 4.4 Liquid Glass Rules

```css
/* Standard glass card */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid var(--glass-border);
  box-shadow:
    0 4px 24px var(--glass-shadow),
    inset 0 1px 0 oklch(100% 0 0 / 0.4);
}

/* Fluid = responds to container, not just viewport */
/* Always % widths inside glass containers, never px fixed widths */
```

**Fluid principles:**
- Fluid typography: `clamp()` everywhere — no fixed px for type
- Fluid spacing: `clamp()` for section padding, gap
- Fluid grids: CSS Grid with `minmax()` and `auto-fill`
- Glass panels resize and reflow, never clip content

### 4.5 Spacing Rhythm

```css
:root {
  --space-1:  clamp(0.5rem,  0.5vw,  0.75rem);
  --space-2:  clamp(1rem,    1.5vw,  1.5rem);
  --space-3:  clamp(2rem,    3vw,    3rem);
  --space-4:  clamp(3rem,    5vw,    5rem);
  --space-5:  clamp(5rem,    8vw,    9rem);   /* section gaps */
  --space-6:  clamp(7rem,    12vw,   14rem);  /* hero breathing room */
}
```

---

## 5. Animation Schema

### 5.1 Yugen-Inspired Animation Patterns

Yugen uses (confirmed via analysis):
- **Webflow-native** animations + likely GSAP ScrollTrigger
- **Staggered word/element reveals**: `translateY(30px) opacity(0)` → `translateY(0) opacity(1)`, `ease-out`, ~400ms
- **Scroll-triggered section reveals**: content appears as viewport enters
- **CSS marquee loop**: `linear`, infinite — ambient motion pattern
- **Card hover lift**: scale + shadow shift on hover
- **No custom cursor**: standard cursor, pointer on interactive
- **No scroll-jacking**: native scroll, smooth behavior via CSS
- **No heavy 3D/WebGL**: clean 2D with depth via layering
- **Booking modal**: fade + scale-in, `AnimatePresence` equivalent

### 5.2 MGX Animation Rules (Emil Framework)

```
Marquee ticker:        linear, infinite, no pause unless hover
Section reveal:        translateY(40px)→0 + opacity 0→1, 500ms, power3.out
Heading reveal:        Staggered words, 60ms delay between words, 400ms per
Card hover:            translateY(-4px) + shadow deepens, 200ms ease-out
Button :active:        scale(0.97), 150ms ease-out — always
Glass panel enter:     scale(0.98) + opacity 0→1, 300ms, ease-out — never scale(0)
Page section fade:     opacity 0→1, 400ms, ease-out (scroll triggered)
Stats count-up:        Number animation on enter viewport (IBMPlexMono)
CTA magnetic:          Magnetic pull 0.3x, elastic snap-back on leave

NEVER:
  - ease-in on any UI element
  - duration > 400ms for UI
  - animate keyboard-triggered actions
  - scroll-jacking / override native scroll
  - animate on every frame for non-scroll elements
```

### 5.3 Animation Stack

```
Lenis:          smooth scroll (CSS scroll-behavior override)
GSAP:           ScrollTrigger reveals, stagger, timeline
Framer Motion:  AnimatePresence on all conditional renders
CSS:            marquee, hover states, :active — no JS for these
```

---

## 6. Section Layout Schema

```
HERO
  ├── [eyebrow: "MGX Research"]
  ├── [H1: "From Insight to Impact"]  ← NOS wordmark if it's a graphic, PPNeue if text
  ├── [subhead: positioning sentence]
  ├── [CTAs: primary + secondary]
  ├── [ambient: marquee ticker with services or taglines]
  └── [visual: abstract liquid glass form or typography-only — decide in design phase]

ABOUT
  ├── [split layout: text left, stats right]
  ├── [3 proof point numbers in IBMPlexMono]
  └── [3 differentiator pills/cards]

SERVICES (6 Pillars)
  ├── [eyebrow: "What We Do"]
  ├── [headline: single strong statement]
  ├── [grid: 6 pillar cards — glass surface, icon, title, tagline, CTA]
  └── [each card: hover = lift + reveal body text]

MGX CAMPUS
  ├── [full-width section — distinct bg or texture break]
  ├── [eyebrow: "MGX Campus"]
  ├── [headline: "Our Innovation Hub"]
  ├── [body: 2-3 sentences]
  ├── [feature grid: 5 campus features as glass pills]
  └── [CTA: Apply / Learn More]

PRODUCTS
  ├── [eyebrow: "What We've Built"]
  ├── [product cards: name, description, pillar tag, status badge, CTA]
  └── [filter by pillar — optional]

WORK / CASE STUDIES
  ├── [eyebrow: "Impact in the Wild"]
  ├── [staggered card grid: client, brief, outcome]
  └── [CTA: View All Work]

CONTACT / FOOTER CTA
  ├── [bold closing statement]
  ├── [primary CTA: "Start a Conversation"]
  └── [footer: links, campus, social, legal]
```

---

## 7. Tech Stack (Confirmed)

```
Framework:    Next.js (App Router) — already initialized
Language:     TypeScript
Styling:      Tailwind CSS (extend with custom tokens above)
Animation:    GSAP + ScrollTrigger, Framer Motion, Lenis
3D:           Optional — R3F for hero element if approved in design phase
Fonts:        Local or CDN: PPNeueMontreal, IBMPlexMono, NOS (if licensed)
Deployment:   TBD
```

---

## 8. Open Questions (Resolve Before Coding)

1. Is NOS font self-hosted or linked? Do we have the license/file?
2. Is PPNeueMontreal self-hosted (from Pangram Pangram) or via CDN?
3. Hero visual: typographic only, abstract shape, or 3D element?
4. Products section: what are the actual product names?
5. Proof point numbers (clients, countries, deployments) — do we have real data?
6. Campus section: photos available or illustration-first?
7. Domain / deployment target?
8. Internationalisation needed (EN-only for now)?

---

## 9. What NOT to Do

- No dark mode
- No heavy scroll-jacking
- No decorative 3D without performance justification
- No Inter/Roboto as primary (system stack = fallback only)
- No generic purple gradient SaaS look
- No template-feel layout
- No redundant service listing (use 6 pillars only)
- NOS font ONLY on MGX wordmark — not for body text

---

## 10. Continuity Instruction (for next AI session)

Read this file first. Then:
1. Check `.memory/session-state.md` for last session state
2. Check `app/page.tsx` for current code state
3. The project is Next.js 14+ App Router, TypeScript, Tailwind
4. Design direction: Liquid Minimal, light-only, PPNeueMontreal primary
5. DO NOT start coding without user confirming: hero visual, product names, real stats
6. Pillar structure (§3.3) is FINAL — do not re-propose services list
7. Animation rules in §5.2 are FINAL
