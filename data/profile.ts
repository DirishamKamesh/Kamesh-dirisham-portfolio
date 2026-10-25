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
    leetcodeUrl: string;
    leetcodeHandle: string;
    codechefUrl: string;
    codechefHandle: string;
    instagramUrl: string;
    instagramHandle: string;
  };
  resume: {
    available: boolean;
    url: string | null;
    fileName?: string;
    statusNote: string;
  };
  certifications: {
    title: string;
    coursework: string;
  }[];
  achievements: string[];
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
  positioning: 'Frontend Developer · UI Engineering · Software Engineering Intern Candidate',
  heroHeadline: 'I build digital experiences with a point of view.',
  heroSupportingCopy:
    "I'm a Computer Science Engineering student at Vignan, Duvvada focused on building expressive, responsive web applications for codebase exploration, student collaboration, faculty workflows, healthcare management, and task tracking. Seeking software engineering internships and selective freelance collaborations.",
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
    leetcodeUrl: 'https://leetcode.com/u/Kamesh_1/',
    leetcodeHandle: 'Kamesh_1',
    codechefUrl: 'https://www.codechef.com/users/kaamesh_1',
    codechefHandle: 'kaamesh_1',
    instagramUrl: 'https://www.instagram.com/kamesh.246/',
    instagramHandle: 'kamesh.246',
  },
  resume: {
    available: true,
    url: '/Dirisham_Kamesh_Resume.pdf',
    fileName: 'Dirisham_Kamesh_Resume.pdf',
    statusNote:
      'Verified 1-page resume covering C, C++, Java, Python, JavaScript, TypeScript, React.js, Node.js, technical projects (RepoRiddle, HackMate, CareSync, FacuLynk, Tasky), PGDCA certification, and five hackathons.',
  },
  certifications: [
    {
      title: 'PGDCA (Post Graduate Diploma in Computer Applications)',
      coursework: 'C, C++, Java, Python, and Microsoft Office',
    },
  ],
  achievements: [
    'Participated in five hackathons, gaining experience in collaborative problem-solving and project development.',
  ],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  aboutNarrative: {
    lead: 'Bridging expressive interface design with disciplined software engineering.',
    paragraphs: [
      'I am currently pursuing my B.Tech in Computer Science Engineering at Vignan, Duvvada in Visakhapatnam (Class of 2029). My primary focus is frontend development and UI engineering—developing web applications for codebase exploration, student collaboration, faculty workflows, healthcare management, and task tracking.',
      'Rather than treating frontend work as surface decoration, I care about how component structure, state predictability, typography, and motion work together. Across my personal and hackathon projects, I work with React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Vite, Node.js, and Express.',
      'Alongside web development, I hold a Post Graduate Diploma in Computer Applications (PGDCA) and regularly practice Data Structures and Algorithms in C, C++, Java, and Python on LeetCode and CodeChef, having participated in five hackathons to sharpen collaborative problem-solving.',
    ],
    longTermDirection: [
      'Frontend Architecture & Interactive UI Systems',
      'Full-Stack Web Engineering (React, TypeScript, Node.js, Express)',
      'Data Structures, Algorithms & Competitive Programming (C, C++, Java, Python)',
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
