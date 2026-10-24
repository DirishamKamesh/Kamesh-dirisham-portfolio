# Dirisham Kamesh — Personal Portfolio

A dark-cinematic, editorial personal portfolio engineered for **Dirisham Kamesh** (Second-year B.Tech Computer Science student at Vignan, Duvvada · Class of 2029). Built to serve both **freelance clients** and **internship recruiters** with verified repository case studies, transparent technical skills, and accessible interactive UI craft.

---

## 1. Architecture & Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`app/globals.css`)
- **Typography:** `Syne` (Display), `Plus Jakarta Sans` (Body), `JetBrains Mono` (Tabular & Technical Labels) via `next/font/google`
- **Motion:** Motion for React (`motion/react`) with full `prefers-reduced-motion` compliance
- **Icons & Artwork:** `lucide-react` + custom architectural SVG schematics (`DKMonogram`, `ProjectVisual`)

### Directory Structure

```text
app/
  layout.tsx              # Root layout, fonts, OpenGraph, Schema.org Person JSON-LD
  page.tsx                # Homepage route
  not-found.tsx           # Custom 404 route
  robots.ts               # Dynamic robots.txt metadata
  sitemap.ts              # Dynamic sitemap.xml metadata
  work/[slug]/page.tsx    # Individual project case study routes (/work/repo-riddle, etc.)
components/
  HomePageClient.tsx      # Client state coordinator for homepage sections
  layout/
    SiteHeader.tsx        # 3-zone desktop header + accessible mobile drawer
    SiteFooter.tsx        # Footer with verified links, sound toggle (off by default), back-to-top
  projects/
    ProjectCard.tsx       # Case study card with verified repo & live demo links
    ProjectVisual.tsx     # Bespoke SVG architectural schematics per project
    ProjectDetailView.tsx # Deep-dive case study layout
  sections/
    HeroSection.tsx       # Split-screen hero + interactive DK monogram + verified coordinates strip
    SelectedWorkSection.tsx # Category filter + featured case studies + secondary practice repos
    ServicesSection.tsx   # 7 freelance capabilities + 3-step collaboration workflow
    SkillsSection.tsx     # 6 technical groups with evidence tier filtering
    AboutAndProcessSection.tsx # Authentic student narrative + resume status + 6-stage process inspector
    ContactSection.tsx    # Validated inquiry composer with transparent mailto & clipboard fallback
  ui/
    DKMonogram.tsx        # Custom geometric DK brand mark & interactive hero sculpture
    CustomCursor.tsx      # Desktop fine-pointer follower (disabled on touch & reduced-motion)
data/
  profile.ts              # Central source of truth for identity, contact, and resume config
  projects.ts             # Verified case study data and secondary learning repositories
  services.ts             # Freelance capabilities and deliverables
  skills.ts               # Categorized skills with honest evidence labels
hooks/
  useReducedMotionPref.ts # Media query listener for prefers-reduced-motion
  useFinePointer.ts       # Media query listener for fine desktop pointers
lib/
  contact.ts              # Form validation and mailto payload formatter
  sound.ts                # Opt-in Web Audio API micro-interaction synthesizer (off by default)
```

---

## 2. Content & Resume Configuration

All profile details, project descriptions, and links live in `data/`:

- **Adding a PDF Resume later:**
  1. Place your PDF file in `public/` (for example, `public/Dirisham_Kamesh_Resume.pdf`).
  2. Open `data/profile.ts` and update:
     ```ts
     resume: {
       available: true,
       url: '/Dirisham_Kamesh_Resume.pdf',
       statusNote: '...',
     }
     ```
  3. The download button in the About section will automatically appear.
- **Updating Projects or Live Demo URLs:**
  - Edit `data/projects.ts`. Set `liveDemoUrl` to a verified URL string to display the **Live Demo** button, or `null` to show only the GitHub repository link.

---

## 3. Contact & Email Setup

By default, the contact inquiry form validates all fields on the client and prepares a structured `mailto:kameshdirisham@gmail.com` draft while also rendering a one-click copyable formatted message fallback. It never pretends to send a background server email when no email service is configured.

If you later wish to add automated server-side email delivery:
1. Create a Next.js API route (e.g., `app/api/contact/route.ts`) using an email provider such as Resend or Nodemailer.
2. Store the provider API key in `.env.local` (never prefix secrets with `NEXT_PUBLIC_`).

---

## 4. Running Locally

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run ESLint checks
npm run lint

# Build for production
npm run build
```

---

## 5. Deployment Guide

- **Google AI Studio / Cloud Run:** Use the integrated AI Studio preview and deploy flow (`npm run build` followed by `npm run start`).
- **Vercel:** Import the GitHub repository into Vercel. Framework preset is automatically detected as **Next.js** (`npm run build`).Optionally set `NEXT_PUBLIC_SITE_URL` to your production domain for canonical sitemap generation.
- **Netlify:** Connect the repository with build command `npm run build` and Next.js runtime plugin.
