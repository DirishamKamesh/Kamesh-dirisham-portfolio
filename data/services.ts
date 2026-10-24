export interface ServiceCapability {
  id: string;
  index: string;
  title: string;
  clientValue: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

export const servicesData: ServiceCapability[] = [
  {
    id: 'landing-pages',
    index: '01',
    title: 'Landing-Page Development',
    clientValue: 'Turn product concepts and launches into clear, high-converting web experiences.',
    description:
      'Custom-coded landing pages with strong typographic hierarchy, responsive layouts, fast asset loading, and purposeful scroll choreography—built without bloated page-builder templates.',
    deliverables: [
      'Semantic HTML5 / React / Next.js implementation',
      'Mobile-first responsive layout across all viewports',
      'SEO metadata, OpenGraph cards, and accessible forms',
    ],
    idealFor: 'Startups, student founders, product launches, and event websites',
  },
  {
    id: 'responsive-websites',
    index: '02',
    title: 'Responsive Website Development',
    clientValue: 'Multi-section and multi-page websites that behave reliably on mobile, tablet, and desktop.',
    description:
      'Complete website builds engineered with clean layout grids, fluid typography, accessible navigation systems, and maintainable content structures that are easy to update.',
    deliverables: [
      'Multi-route architecture with consistent navigation',
      'Touch-friendly mobile interactions and menus',
      'Cross-browser layout stability',
    ],
    idealFor: 'Small businesses, technical communities, portfolios, and organizations',
  },
  {
    id: 'figma-to-code',
    index: '03',
    title: 'UI Implementation from Figma',
    clientValue: 'Translate static design files into living, interactive frontend components.',
    description:
      'Faithful conversion of Figma designs into modular React and Tailwind CSS/CSS3 components—respecting spacing systems, type scales, edge-case states, and responsive breakpoints.',
    deliverables: [
      'Reusable, typed UI components',
      'Interactive hover, focus, active, and empty states',
      'Design token alignment (colors, spacing, typography)',
    ],
    idealFor: 'Designers, agencies, and product teams needing clean frontend execution',
  },
  {
    id: 'react-web-apps',
    index: '04',
    title: 'React Web Applications',
    clientValue: 'Interactive client-side and full-stack-connected web applications with structured state.',
    description:
      'Single-page and multi-route React applications featuring role-based dashboards, REST API or Firebase integration, client-side filtering, form validation, and clear user feedback.',
    deliverables: [
      'Typed React + TypeScript component architecture',
      'API / Firebase Auth & database integration',
      'Structured state management and protected routes',
    ],
    idealFor: 'MVPs, internal dashboards, hackathon prototypes, and web portals',
  },
  {
    id: 'interactive-animations',
    index: '05',
    title: 'Interactive Animations & Motion UI',
    clientValue: 'Elevate brand perception with restrained, smooth interface motion that guides attention.',
    description:
      'Choreographed page entrances, scroll-triggered reveals, micro-interactions, and custom SVG/Canvas visuals engineered with Motion for React and CSS transforms while respecting reduced-motion preferences.',
    deliverables: [
      'Shared easing and timing system',
      'Compositor-friendly transform and opacity animations',
      'Full prefers-reduced-motion accessibility support',
    ],
    idealFor: 'Creative portfolios, interactive showcases, and editorial storytelling',
  },
  {
    id: 'website-redesigns',
    index: '06',
    title: 'Website Redesigns & UI Modernization',
    clientValue: 'Upgrade outdated or broken interfaces into sharp, contemporary web experiences.',
    description:
      'Structural and visual overhauls of existing websites to fix mobile overflow, improve visual contrast, modernize typography, and streamline navigation paths.',
    deliverables: [
      'Refreshed visual hierarchy and color system',
      'Mobile responsiveness and layout bug fixes',
      'Cleaner component structure for future edits',
    ],
    idealFor: 'Existing websites suffering from poor mobile UX or dated templates',
  },
  {
    id: 'frontend-performance',
    index: '07',
    title: 'Frontend Performance & Accessibility Refinement',
    clientValue: 'Eliminate layout shifts, sluggish interactions, and keyboard navigation barriers.',
    description:
      'Practical frontend audits and code improvements focused on image sizing, font loading stability, semantic HTML landmarks, keyboard focus visibility, and removing unnecessary JavaScript overhead.',
    deliverables: [
      'Layout shift (CLS) and asset loading cleanup',
      'Semantic HTML, ARIA labels, and keyboard focus fixes',
      'DOM and animation rendering optimization',
    ],
    idealFor: 'Websites needing faster initial loads and better accessibility fundamentals',
  },
];

export const collaborationSteps = [
  {
    phase: 'Step 1',
    title: 'Scope & Fit Conversation',
    detail:
      'Share your project goal, reference designs (if any), and timeline via email. We confirm whether the technical requirements match my current skill set and academic schedule.',
  },
  {
    phase: 'Step 2',
    title: 'Structure & Interactive Prototype',
    detail:
      'I establish the layout grid, responsive navigation, and core component structure early so you can review a working browser preview rather than static screenshots.',
  },
  {
    phase: 'Step 3',
    title: 'Iteration, QA & Handover',
    detail:
      'We refine interactions, verify mobile and keyboard behavior, run production build checks, and hand over clean source code ready for GitHub, Vercel, or Netlify deployment.',
  },
];
