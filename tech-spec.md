# Hotel Carolina del Mar — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | ^15.0 | Framework (App Router) |
| react | ^19.0 | UI library |
| react-dom | ^19.0 | React DOM renderer |
| typescript | ^5.6 | Type safety |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/postcss | ^4.0 | PostCSS integration for Tailwind v4 |
| gsap | ^3.12 | Animation engine (ScrollTrigger, all plugins free) |
| lenis | ^1.1 | Smooth scroll with inertia |
| lucide-react | ^0.460 | Icon library |
| class-variance-authority | ^0.7 | Component variant management (buttons, inputs) |
| clsx | ^2.1 | Conditional classnames |
| tailwind-merge | ^2.6 | Tailwind class deduplication |

No shadcn/ui components are needed — the design is fully bespoke with custom-styled elements throughout.

## Component Inventory

### Layout (shared)

| Component | Source | Notes |
|---|---|---|
| Navigation | Custom | Fixed top bar with scroll-aware transparency toggle (GSAP ScrollTrigger class toggle). Mobile hamburger slide-in menu. |
| Footer | Custom | Simple flex row, static content. |

### Sections (page-level, used once)

| Component | Source | Notes |
|---|---|---|
| HeroSection | Custom | Video background + frosted booking widget. Entrance animations (video fade, text stagger, widget slide-up). |
| AboutSection | Custom | Two-column (text + image). Entrance animations. |
| ServicesSection | Custom | 6 room cards in 3-col grid + 4 service cards below. Entrance stagger. |
| ActivitiesSection | Custom | Teal background, 6 activity cards in 3-col grid, houses NatureParticles canvas. |
| PlansSection | Custom | 2 large plan cards side-by-side. Entrance stagger. |
| PhotoGallerySection | Custom | Masonry CSS columns grid, lightbox modal, lazy loading via Intersection Observer. |
| VideoGallerySection | Custom | 4-col thumbnail grid, YouTube embed modal. |
| ContactSection | Custom | Two-column (info + form). Entrance animations. |

### Reusable Components

| Component | Source | Used By | Notes |
|---|---|---|---|
| BookingWidget | Custom | HeroSection | Frosted glass form with 5 fields + submit button. |
| SectionHeader | Custom | All 7 content sections | Label + H2 + optional description. Shared pattern extracted. |
| RoomCard | Custom | ServicesSection (×6) | Image + badge + amenities list. |
| ActivityCard | Custom | ActivitiesSection (×6) | Icon + title + description on teal bg. |
| PlanCard | Custom | PlansSection (×2) | Large card: image + badge + price + checklist. |
| ServiceItem | Custom | ServicesSection (×4) | Icon + title + description (no image). |
| Lightbox | Custom | PhotoGallerySection | Full-image modal with prev/next/close, keyboard support. |
| VideoModal | Custom | VideoGallerySection | YouTube iframe embed modal, autoplay on open. |
| MobileMenu | Custom | Navigation | Full-screen slide-in from right. |
| WaveDivider | Custom | Between About/Services | SVG textPath animation (GSAP fallback for startOffset). |
| NatureParticles | Custom | ActivitiesSection | Canvas overlay with 35 drifting leaf particles. |

### Hooks

| Hook | Purpose |
|---|---|
| useLenis | Initialize Lenis, sync with GSAP ScrollTrigger, expose scrollTo for nav. |
| useScrollEntrance | Reusable GSAP ScrollTrigger entrance (translateY + opacity) with configurable params. |

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|---|---|---|---|
| Hero video fade-in | GSAP | Timeline: video opacity 0→1 over 1.2s, then text stagger, then widget slide-up. | Low |
| Hero text entrance | GSAP | Part of hero timeline: label/H1/subtitle fade+translateY with 0.4s delay. | Low |
| Booking widget entrance | GSAP | Part of hero timeline: translateY(40px)→0 + opacity, 0.8s delay. | Low |
| Nav transparency toggle | GSAP ScrollTrigger | ScrollTrigger at hero bottom edge toggles CSS class (transparent→solid). | Low |
| Section scroll entrances | GSAP ScrollTrigger | useScrollEntrance hook: translateY(30-50px)→0 + opacity, triggered at top 80%. Applied to all sections. | Low |
| About section entrance | GSAP ScrollTrigger | Heading fade, left column translateX(-30px), right column translateX(30px), feature icons stagger 0.1s. | Medium |
| Room cards stagger | GSAP ScrollTrigger | Batch of 6 cards: translateY(40px)→0, stagger 0.1s. | Low |
| Service items stagger | GSAP ScrollTrigger | Batch of 4 items, 0.3s delay after room cards. | Low |
| Activity cards stagger | GSAP ScrollTrigger | scale(0.95)→1 + opacity, stagger 0.08s. | Low |
| Plan cards entrance | GSAP ScrollTrigger | translateY(50px)→0 + opacity, stagger 0.15s. | Low |
| Gallery image stagger | GSAP ScrollTrigger | Random translateY(20-40px) + opacity, stagger 0.05s. | Low |
| Video thumbnail stagger | GSAP ScrollTrigger | scale(0.95)→1 + opacity, stagger 0.1s. | Low |
| Contact columns entrance | GSAP ScrollTrigger | Left translateX(-30px), right translateX(30px), 0.1s delay between. | Medium |
| **Wave divider text animation** | GSAP + SVG | Two textPath elements with startOffset animated 0%→100% over 12s, linear, infinite. Stroke-dashoffset on wave curve for draw effect. | **High** |
| **Floating nature particles** | Canvas API | 35 leaf particles with position, rotation, sine-wave horizontal drift. RAF loop with Intersection Observer cleanup. | **High** |
| Hero parallax | GSAP ScrollTrigger | Video translateY at 0.3x rate, text at 0.5x rate on scroll. | Low |
| Card hover effects | CSS | transition on transform + box-shadow. Pure CSS, no JS needed. | Low |
| Smooth scrolling | Lenis | Global instance, synced to GSAP ticker and ScrollTrigger. | Low |
| Gallery lightbox | React state | Modal with backdrop blur, prev/next/close via state + keyboard handlers. Scroll lock via body overflow. | Medium |
| Video modal | React state | Modal with YouTube iframe (nocookie), autoplay on open, close via state/ESC. | Medium |
| Mobile menu | React state | Slide-in panel from right, close on backdrop/link tap. | Low |

## State & Logic Plan

### Scroll-Triggered Class Toggle (Navigation)

The navigation switches between transparent (over hero, white text) and solid white (dark text) based on scroll position. This requires a ScrollTrigger that fires at the bottom edge of the hero section. The toggle applies/removes a CSS class — it does not use React state to avoid re-renders on every scroll frame. GSAP handles the class toggle via ScrollTrigger's `toggleClass` or `onEnter`/`onLeave` callbacks.

### Modal Coordination (Lightbox + VideoModal)

Two independent modals on the same page. Each manages its own open/close state. When any modal is open, body scroll must be locked (`overflow: hidden` on body). Since modals are mutually exclusive (only one can be open at a time), each modal component sets/resets body overflow independently on mount/unmount. No shared state needed — opening one closes the other naturally through user interaction patterns.

### Form Submission Flow

The contact form has three UI states: idle → loading → success/error. The submit handler prevents default, validates required fields (HTML5 + custom), shows loading state on the button, then simulates/fakes a submission delay (1.5s) before showing a success message. For production, the handler POSTs to a form endpoint (Formspree/Netlify). The booking widget's "BUSCAR" button scrolls to the contact section (via Lenis scrollTo) — it has no backend.

### Canvas Lifecycle (NatureParticles)

The particles canvas uses `requestAnimationFrame` and must be started/stopped based on viewport visibility to avoid wasted CPU. Use an Intersection Observer on the Activities section: when visible, start the RAF loop; when hidden, cancel it. On resize, recalculate canvas dimensions and regenerate particles. The canvas element is `position: absolute` inside the section container, behind card content, with `pointer-events: none`.

## Other Key Decisions

### Video Strategy

The hero video is an autplaying, muted, looped `<video>` element. Provide a poster frame (static JPEG) and a `<noscript>` fallback with a static image. For mobile data saving, detect `prefers-reduced-data: reduce` and show the fallback image instead of the video. The video should be self-hosted as a static asset in `/public/videos/` rather than fetched from an external CDN.

### Image Strategy

All images are static assets served from `/public/images/`. Use Next.js `<Image>` component with `priority` for above-the-fold images (hero poster, about hotel). Gallery images use lazy loading via `loading="lazy"` or Next.js automatic lazy loading. Serve WebP with JPEG fallback.

### SVG Wave Divider

The wave divider uses inline SVG with `<textPath>` elements. `startOffset` animation via CSS is not universally supported, so GSAP's `fromTo` with `attr: { startOffset }` provides the fallback. The SVG is rendered as a React component with the path and textPath elements defined inline.
