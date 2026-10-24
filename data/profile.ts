export interface ProfileConfig {
  fullName: string;
  initials: string;
  roleTitle: string;
  positioning: string;
  heroHeadline: string;
  heroSupportingCopy: string;
  location: {
    city: string;
    state: string;
    country: string;
    display: string;
  };
  education: {
    degree: string;
    field: string;
    institution: string;
    currentYear: string;
    expectedGraduation: number;
    summary: string;
  };
  contact: {
    email: string;
    github: string;
    githubUrl: string;
    githubUsername: string;
    linkedin: string;
    linkedinUrl: string;
    linkedinHandle: string;
    instagramUrl: string;
    instagramHandle: string;
  };
  resume: {
    available: boolean;
    url: string | null;
    statusNote: string;
  };
  siteUrl: string;
  aboutNarrative: {
    lead: string;
    paragraphs: string[];
    longTermDirection: string[];
  };
  engineeringProcess: {
    step: string;
    title: string;
    summary: string;
    deliverable: string;
  }[];
}

export const profileData: ProfileConfig = {
  fullName: 'Dirisham Kamesh',
  initials: 'DK',
  roleTitle: 'Frontend Developer & UI Engineer',
  positioning: 'Frontend Developer · UI Engineering · Interactive Web Experiences',
  heroHeadline: 'I build digital experiences with a point of view.',
  heroSupportingCopy:
    "I'm a computer science undergraduate focused on building expressive, responsive web interfaces and practical digital products. I'm developing my frontend craft while growing toward full-stack engineering, and I'm interested in meaningful internship opportunities and selective freelance collaborations.",
  location: {
    city: 'Visakhapatnam (Vizag)',
    state: 'Andhra Pradesh',
    country: 'India',
    display: 'Visakhapatnam, Andhra Pradesh, India',
  },
  education: {
    degree: 'B.Tech',
    field: 'Computer Science & Engineering',
    institution: 'Vignan, Duvvada',
    currentYear: 'Second Year Undergraduate',
    expectedGraduation: 2029,
    summary: 'Second-year B.Tech student at Vignan, Duvvada · Expected graduation 2029',
  },
  contact: {
    email: 'kameshdirisham@gmail.com',
    github: 'https://github.com/DirishamKamesh',
    githubUrl: 'https://github.com/DirishamKamesh',
    githubUsername: 'DirishamKamesh',
    linkedin: 'https://www.linkedin.com/in/dirishamkamesh/',
    linkedinUrl: 'https://www.linkedin.com/in/dirishamkamesh/',
    linkedinHandle: 'in/dirishamkamesh',
    instagramUrl: 'https://www.instagram.com/kamesh.246/',
    instagramHandle: 'kamesh.246',
  },
  resume: {
    // Set available: true and provide a valid PDF path (e.g. '/Dirisham_Kamesh_Resume.pdf') when ready.
    available: false,
    url: null,
    statusNote:
      'A formal PDF resume is currently being prepared. Recruiters and collaborators can inspect verified source code on GitHub or request an academic and project summary directly via email.',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  aboutNarrative: {
    lead: 'Bridging expressive interface design with disciplined software engineering.',
    paragraphs: [
      'I am currently pursuing my B.Tech at Vignan, Duvvada in Visakhapatnam (Class of 2029). My primary focus is frontend development and UI engineering—translating complex workflows into responsive, accessible, and visually deliberate web applications.',
      'Rather than treating frontend work as surface decoration, I care about how component structure, state predictability, typography, and motion work together. Across my personal and hackathon projects, I have worked with React, TypeScript, Tailwind CSS, Firebase, and modular JavaScript while exploring backend integration with Node.js, Express, and Java.',
      'Alongside web development, I regularly practice Data Structures and Algorithms in Java and Python to strengthen my core computer science foundation. My long-term goal is to grow into a versatile full-stack software engineer capable of building resilient technology products and independent software ventures.',
    ],
    longTermDirection: [
      'Frontend Architecture & Interactive UI Systems',
      'Full-Stack Web Engineering (React, TypeScript, Node.js)',
      'Data Structures, Algorithms & Systems Foundations',
      'Applied AI/ML Integration & Product Engineering',
    ],
  },
  engineeringProcess: [
    {
      step: '01',
      title: 'Understand the goal and constraints',
      summary:
        'Clarify the core user workflow, target devices, content hierarchy, and technical boundaries before writing component code.',
      deliverable: 'Scope definition & user flow map',
    },
    {
      step: '02',
      title: 'Plan the interface and structure',
      summary:
        'Establish typographic scale, layout grids, route structures, and data schemas so content and presentation stay cleanly separated.',
      deliverable: 'Component hierarchy & design tokens',
    },
    {
      step: '03',
      title: 'Implement reusable components',
      summary:
        'Build semantic, modular React and TypeScript components with clear props, resilient empty states, and predictable state management.',
      deliverable: 'Typed UI primitives & views',
    },
    {
      step: '04',
      title: 'Add meaningful interactions',
      summary:
        'Layer purposeful transitions, scroll choreography, and tactile feedback using compositor-friendly properties and reduced-motion fallbacks.',
      deliverable: 'Cohesive motion & state feedback',
    },
    {
      step: '05',
      title: 'Test responsive behavior and accessibility',
      summary:
        'Verify layouts from 360px mobile viewports to wide desktops, checking keyboard navigation, focus rings, contrast, and form validation.',
      deliverable: 'Cross-viewport & WCAG verification',
    },
    {
      step: '06',
      title: 'Refine and deliver',
      summary:
        'Audit bundle discipline, remove dead code, verify production builds, and document setup and deployment steps clearly.',
      deliverable: 'Production-ready build & documentation',
    },
  ],
};
