# Implementation Plan: Restore Signature Punch Red (`#E63946`) Highlights in Dark Mode

## 1. Objective
Keep the **Midnight Blueprint Dark Mode** (`#0D1929` canvas / `#14263F` surfaces) and the new Dribbble-inspired 3D `<ThemeTogglePill />` in the navbar, while restoring the signature **Punch Red (`#E63946`)** text highlights, display typography accents, and CTA button treatments shown in your reference screenshot (`/public/assets/aistudio/image_f3d9fd73.png`).

---

## 2. Targeted Visual Restorations

### A. Hero Section (`components/sections/HeroSection.tsx`)
1. **Role Kicker**: Restore `"Frontend Developer & UI Engineer"` from Frosted Blue (`#A8DADC`) back to **Punch Red (`#E63946`)**.
2. **Hero Display Name (Line 2)**: Restore the entire second line **`KAMESH.`** to **Punch Red (`#E63946`)** so `DIRISHAM` renders in primary Honeydew/Navy text and `KAMESH.` renders in bold Punch Red (`#E63946`), matching the screenshot.
3. **Editorial Statement Highlights**: Restore the accented words **`interactive`**, **`interfaces`**, and **`point of view.`** (`seg.accent === true`) back to **Punch Red (`#E63946`)**.
4. **Hero CTA Button Hierarchy**:
   - **"Explore selected work"** (Primary button): Restore to solid **Punch Red (`bg-[#E63946] text-[#F1FAEE]`)** matching the screenshot.
   - **"Discuss a project"** (Secondary button): Restore to the crisp outlined technical button (`border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]`).
5. **Hero Coordinate Strip**: Ensure the accent value (`React · Next.js · TypeScript`) is legible in both Dark and Light modes.

### B. Interactive DK Monogram (`components/ui/DKMonogram.tsx`)
1. **Active Layer Tab**: Restore the active layer switcher button (`"Solid Form"` / `"Wireframe"` / `"Grid Spec"`) to solid **Punch Red (`bg-[#E63946] text-[#F1FAEE]`)** as shown in the screenshot.

### C. Section Kickers & Accent Text Across Page Sections
1. Restore the numbered section kickers (`01. SELECTED WORK & CASE STUDIES`, `02. CAPABILITIES & FREELANCE SERVICES`, `03. TECHNICAL SKILLS & LEARNING MATRIX`, `04. ABOUT & ENGINEERING DIRECTION`, `05. INTENDED WORKING METHOD & ENGINEERING PROCESS`, `06. CONTACT & DIRECT INQUIRY`) to **Punch Red (`#E63946`)** so they maintain high contrast in both Dark Mode (`#0D1929`) and Light Mode (`#F1FAEE`).
2. Replace any remaining low-contrast hardcoded `text-[#A8DADC]` labels on light backgrounds with theme-aware `text-[var(--accent-secondary)]` or `#E63946` highlights so toggling between Dark Mode and Light Mode via the navbar pill toggle keeps every label sharp and readable.

---

## 3. Verification
- Run `lint_applet` and `compile_applet` to confirm zero TypeScript or build issues.
- Verify both Dark Mode and Light Mode via the navbar toggle.
