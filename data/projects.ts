export type ProjectFilterCategory =
  | 'All Work'
  | 'Developer Tooling'
  | 'Full-Stack & Systems'
  | 'Frontend & UI';

export type ProjectVisualVariant =
  | 'repo-riddle'
  | 'caresync'
  | 'faculynk'
  | 'ready-map';

export interface ProjectCaseStudy {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  repoName: string;
  localWorkspacePath: string;
  tagline: string;
  shortDescription: string;
  category: string;
  filterCategory: Exclude<ProjectFilterCategory, 'All Work'>;
  statusLabel: string;
  authenticityNote: string;
  year: string;
  repoUrl: string | null;
  liveDemoUrl: string | null;
  liveDemoLabel?: string;
  demoVerificationNote: string;
  visualVariant: ProjectVisualVariant;
  technologies: string[];
  purposeAndProblem: {
    overview: string;
    problemStatement: string;
  };
  contributionSummary: string;
  implementedFeatures: {
    title: string;
    detail: string;
    sourceEvidence: string;
  }[];
  plannedOrConceptualFeatures: string[];
  technicalArchitecture: {
    layer: string;
    stack: string;
    details: string;
  }[];
  engineeringDecisions: {
    decision: string;
    rationale: string;
  }[];
  limitationsAndNotes: string[];
  visualCaption: string;
}

export interface SecondaryRepository {
  name: string;
  title: string;
  category: string;
  locationOrPath: string;
  description: string;
  technologies: string[];
  repoUrl: string | null;
  liveDemoUrl?: string | null;
  liveDemoLabel?: string;
  statusNote: string;
}

export const featuredProjects: ProjectCaseStudy[] = [
  {
    slug: 'repo-riddle',
    index: '01',
    title: 'Repo-Riddle',
    subtitle: 'Tactical Architecture Co-Pilot',
    repoName: 'Repo-Riddlle-',
    localWorkspacePath: 'a:\\MY-Projects(AI)\\Repo-',
    tagline:
      'Developer tooling workspace that inspects repository file trees, tracks module dependencies, and explains codebase structure through an Express + Google GenAI proxy.',
    shortDescription:
      'Helps developers explore unfamiliar repositories by pairing file-tree and AST dependency inspection with an Express backend proxy powered by @google/genai.',
    category: 'Developer Tooling & Code Intelligence',
    filterCategory: 'Developer Tooling',
    statusLabel: 'Flagship · Public GitHub Repo (In Progress)',
    authenticityNote:
      'Public repository available on GitHub; cloud hosting of the Express proxy is the next milestone.',
    year: '2026',
    repoUrl: 'https://github.com/DirishamKamesh/Repo-Riddlle-',
    liveDemoUrl: null,
    demoVerificationNote:
      'Source code is committed in WEB-ui/ and Android-ui/ on GitHub. The widget shown here is an Interactive UI Simulation of the AST-to-Express workflow; cloud deployment on Vercel/Render is planned next.',
    visualVariant: 'repo-riddle',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      '@google/genai SDK',
    ],
    purposeAndProblem: {
      overview:
        'Repo-Riddle is a developer tooling and code-intelligence project built to help engineers navigate and reason about unfamiliar software repositories.',
      problemStatement:
        'Standard text search locates raw strings without explaining how modules connect or why an architectural pattern exists. Repo-Riddle pairs file-structure inspection with an Express + @google/genai reasoning proxy to explain module relationships in context.',
    },
    contributionSummary:
      'Built the React + TypeScript investigation workspace, documented the design token specifications (`WEB-ui/DESIGN.md`), implemented the Express GenAI proxy server (`WEB-ui/server.ts`), and drafted companion mobile UI layouts (`WEB-ui/Android-ui`).',
    implementedFeatures: [
      {
        title: 'Express Proxy Server with System Prompt Rules (`WEB-ui/server.ts`)',
        detail:
          'Routes architectural queries through a server-side Node.js and Express endpoint using the `@google/genai` SDK with structured system prompt constraints so API keys remain on the server.',
        sourceEvidence: 'WEB-ui/server.ts, WEB-ui/backend/',
      },
      {
        title: 'Repository File Structure & Dependency Graph Workspace',
        detail:
          'Inspects repository file hierarchies, tracks module imports and symbols, and visualizes architectural topology in an interactive React investigation workspace.',
        sourceEvidence: 'WEB-ui/app/src/components/workspace/, ArchitectureCanvas.tsx',
      },
      {
        title: 'Design System & Typography Specifications (`WEB-ui/DESIGN.md`)',
        detail:
          'Documents the token system, surface contrast rules, and typography hierarchy across the Web workspace and Android UI concepts.',
        sourceEvidence: 'WEB-ui/DESIGN.md, Android-ui/',
      },
    ],
    plannedOrConceptualFeatures: [
      'Add a comprehensive root README.md documenting local setup and required environment variables',
      'Deploy the React/Vite web frontend to Vercel/Netlify and the Express server to Render',
      'Add the hosted application URL once backend proxy deployment is complete',
    ],
    technicalArchitecture: [
      {
        layer: 'Frontend Workspace',
        stack: 'React, TypeScript, Vite, Tailwind CSS',
        details:
          'Interactive repository explorer, dependency graph canvas, and co-pilot query panel.',
      },
      {
        layer: 'Backend Proxy Server',
        stack: 'Node.js, Express (WEB-ui/server.ts)',
        details:
          'Packages repository context and proxies requests to the AI reasoning layer without exposing credentials client-side.',
      },
      {
        layer: 'AI Reasoning Layer',
        stack: 'Google GenAI SDK (@google/genai)',
        details:
          'Analyzes symbol relationships, import chains, and file structures under system prompt rules.',
      },
    ],
    engineeringDecisions: [
      {
        decision: 'Server-side Express proxy (`server.ts`) for `@google/genai` calls',
        rationale:
          'Keeping `@google/genai` calls inside an Express backend enforces consistent system prompt rules for code analysis while preventing API key exposure in the browser.',
      },
      {
        decision: 'Explicit design token specification in `WEB-ui/DESIGN.md`',
        rationale:
          'Establishing UI tokens upfront kept visual consistency between the desktop investigation canvas and the `Android-ui` mobile concepts.',
      },
    ],
    limitationsAndNotes: [
      'The public GitHub repository URL uses the spelling "Repo-Riddlle-" while the project title is "Repo-Riddle".',
      'Currently run locally via the Express server (`WEB-ui/server.ts`); the interactive diagram on this portfolio is a frontend UI simulation.',
    ],
    visualCaption:
      'Interactive UI Simulation · Illustrates AST symbol inspection and Express @google/genai proxy flow',
  },
  {
    slug: 'caresync',
    index: '02',
    title: 'CareSync / NEURO-CORE',
    subtitle: 'Hospital Management System',
    repoName: 'Caresync',
    localWorkspacePath: 'a:\\MY-Projects(AI)\\CARESYNC',
    tagline:
      'Role-based hospital workflow system with Admin, Doctor, and Patient portals, seeded clinical database models, and QR-verifiable ReportLab PDF prescriptions.',
    shortDescription:
      'Organizes clinical workflows across Admin, Doctor, and Patient portals using Python/Flask, SQLAlchemy, and seeded demo data—paired with a hosted Netlify web preview and ReportLab QR PDF prescription generation.',
    category: 'Healthcare Systems & Full-Stack Web',
    filterCategory: 'Full-Stack & Systems',
    statusLabel: 'Public Repo · Seeded Demo Data + Web Preview',
    authenticityNote:
      'Uses deterministic seeded demo data (`seed.py`); Netlify hosts the static web interface while the Python/Flask server runs locally or via Render.',
    year: '2026',
    repoUrl: 'https://github.com/DirishamKamesh/Caresync',
    liveDemoUrl: 'https://caresyncweb.netlify.app/',
    liveDemoLabel: 'Hosted Web Preview (Netlify)',
    demoVerificationNote:
      'Verified HTTP 200 on caresyncweb.netlify.app (static web preview of the CareSync interface & login flow). The stateful Python/Flask + SQLite backend (`run.py`, `seed.py`, `neurocore_dev_test.db`) runs locally with seeded demo accounts or deploys via `render.yaml`.',
    visualVariant: 'caresync',
    technologies: [
      'Python',
      'Flask',
      'SQLAlchemy ORM',
      'SQLite (Seeded Demo DB)',
      'Jinja2 / HTML / CSS',
      'Chart.js',
      'ReportLab PDF & QR',
    ],
    purposeAndProblem: {
      overview:
        'CareSync / NEURO-CORE is an academic and portfolio hospital management system engineered with discrete role-based portals for Administrators, Doctors, and Patients.',
      problemStatement:
        'Disconnected appointment records and unverifiable paper prescriptions create workflow friction. CareSync models session-based role access control and generates downloadable PDF prescriptions containing QR verification codes using seeded clinical test data.',
    },
    contributionSummary:
      'Implemented the Python Flask + SQLAlchemy ORM backend (`run.py`, `seed.py`, `neurocore_dev_test.db`), Jinja2 role templates, UI design tokens (`Design.md`), ReportLab PDF + QR generator, Chart.js dashboard views, and the hosted static web preview on Netlify.',
    implementedFeatures: [
      {
        title: 'Role-Based Portals with Seeded Demo Accounts (`seed.py`)',
        detail:
          'Session-based role access control (`admin@neurocore.med`, `smith@neurocore.med`) separating administrative metrics, doctor consultation queues, and patient prescription records.',
        sourceEvidence: 'README.md, run.py, seed.py, Jinja2 role templates',
      },
      {
        title: 'Prescription Authoring with Medication Auto-Suggestions',
        detail:
          'Allows doctors in the demo environment to author structured digital prescriptions with dosage schedules persisted in SQLite via SQLAlchemy ORM.',
        sourceEvidence: 'run.py, SQLAlchemy models, doctor portal views',
      },
      {
        title: 'ReportLab PDF Generation with Embedded Verification QR Codes',
        detail:
          'Compiles downloadable prescription PDFs using ReportLab with embedded QR codes tied to the consultation record in the local database.',
        sourceEvidence: 'ReportLab PDF module, QR generator, patient prescription routes',
      },
      {
        title: 'Hosted Static Web Preview (`caresyncweb.netlify.app`) & `Design.md` Tokens',
        detail:
          'Provides an accessible Netlify-hosted frontend preview of the CareSync interface and login screens alongside the Python codebase in GitHub.',
        sourceEvidence: 'Design.md, caresyncweb.netlify.app, render.yaml',
      },
    ],
    plannedOrConceptualFeatures: [
      'Deploy the Python Flask + SQLite/PostgreSQL backend service to Render using the included render.yaml configuration',
      'Connect the hosted frontend preview directly to the live Render Python backend instance',
    ],
    technicalArchitecture: [
      {
        layer: 'Backend & ORM (Local / Render)',
        stack: 'Python, Flask, SQLAlchemy ORM, SQLite (neurocore_dev_test.db)',
        details:
          'Manages relational models for demo users, appointments, and prescriptions initialized via `seed.py`.',
      },
      {
        layer: 'Web Interface & Charts',
        stack: 'Jinja2 Templates, HTML5/CSS3, Chart.js, Netlify Static Preview',
        details:
          'Role views styled with clinical UI tokens (`Design.md`) and Chart.js reporting widgets.',
      },
      {
        layer: 'Document Generation',
        stack: 'Password Hashing, Session RBAC, ReportLab PDF, QR Codes',
        details:
          'Protects role routes and generates QR-verifiable prescription PDFs in the Python runtime.',
      },
    ],
    engineeringDecisions: [
      {
        decision: 'SQLAlchemy ORM + `seed.py` deterministic demo seeding',
        rationale:
          'Pre-populating `neurocore_dev_test.db` with documented test credentials (`admin@neurocore.med`, `smith@neurocore.med`) makes it easy to evaluate all three role portals locally without real patient data.',
      },
      {
        decision: 'Server-side ReportLab PDF generation with QR payload',
        rationale:
          'Generating prescription PDFs in Python ensures consistent layout and embeds a verifiable QR code linked to the consultation record.',
      },
    ],
    limitationsAndNotes: [
      'Built as an academic/portfolio demonstration using synthetic seeded data (`seed.py`), not a HIPAA-certified clinical deployment.',
      '`caresyncweb.netlify.app` hosts the static/client-side web preview (`HTTP 200`), while full Flask database and PDF routes run via `python run.py`.',
    ],
    visualCaption:
      'Interactive UI Simulation · Models role-portal switching and ReportLab QR prescription verification',
  },
  {
    slug: 'faculynk',
    index: '03',
    title: 'FacuLynk',
    subtitle: 'Faculty Workload Management Portal',
    repoName: 'FacuLynk',
    localWorkspacePath: 'a:\\MY-Projects(AI)\\faculynkv5',
    tagline:
      'Academic workflow portal built with React 19, TypeScript, Recharts, and Firebase to visualize teaching credit allocations and departmental schedules.',
    shortDescription:
      'Addresses uneven faculty course loads and schedule conflicts in university departments using React 19, TypeScript, Recharts credit distribution charts, and Firebase integration.',
    category: 'Academic Workflow & Frontend Architecture',
    filterCategory: 'Full-Stack & Systems',
    statusLabel: 'Public GitHub Repo · Deployment Config Ready',
    authenticityNote:
      'Source code and `netlify.toml` are in the public GitHub repo; live hosting awaits production Firebase `.env` configuration.',
    year: '2026',
    repoUrl: 'https://github.com/DirishamKamesh/FacuLynk',
    liveDemoUrl: null,
    demoVerificationNote:
      'Public repository includes React 19, Recharts, Firebase SDK integration (`package.json`), and Netlify build config (`netlify.toml`). The widget on this page is an Interactive UI Simulation of the credit-balancing chart.',
    visualVariant: 'faculynk',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS v4',
      'React Router v7',
      'Recharts',
      'Firebase SDK',
    ],
    purposeAndProblem: {
      overview:
        'FacuLynk is an academic workflow web application designed to help university departments balance teaching workloads and reduce timetable conflicts.',
      problemStatement:
        'Manual spreadsheet tracking often leads to uneven credit assignments and overlapping faculty schedules. FacuLynk visualizes credit distribution with Recharts and structures timetable notices with Firebase.',
    },
    contributionSummary:
      'Developed the React 19 + TypeScript + Tailwind CSS v4 frontend, built Recharts credit distribution views, integrated the Firebase Auth and Firestore client modules, and configured `netlify.toml`.',
    implementedFeatures: [
      {
        title: 'Departmental Credit Distribution Charts (`Recharts`)',
        detail:
          'Visualizes teaching hours and credit allocations across faculty members so overload bottlenecks are easy to spot.',
        sourceEvidence: 'package.json (recharts), workload analytics components',
      },
      {
        title: 'Firebase Authentication & Firestore Client Integration',
        detail:
          'Includes Firebase client modules for faculty sign-in and timetable notice collections.',
        sourceEvidence: 'package.json (firebase), metadata.json, src/',
      },
      {
        title: 'React 19 + React Router v7 Portal Structure',
        detail:
          'Separates administrative workload views from faculty schedule views with responsive Tailwind CSS v4 layouts.',
        sourceEvidence: 'src/, package.json, netlify.toml',
      },
    ],
    plannedOrConceptualFeatures: [
      'Configure production Firebase environment variables (.env) in Netlify',
      'Publish the live hosted build via the included netlify.toml configuration',
    ],
    technicalArchitecture: [
      {
        layer: 'Frontend Application',
        stack: 'React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7',
        details:
          'Component-driven academic portal with role views and credit allocation summaries.',
      },
      {
        layer: 'Data Visualization',
        stack: 'Recharts',
        details:
          'Bar and distribution charts comparing assigned teaching credits against departmental targets.',
      },
      {
        layer: 'Cloud SDK & Build Config',
        stack: 'Firebase Auth & Firestore SDK, netlify.toml',
        details:
          'Client-side Firebase integration and automated Netlify build settings.',
      },
    ],
    engineeringDecisions: [
      {
        decision: 'Recharts for declarative credit distribution charts',
        rationale:
          'Composable React chart primitives make it straightforward to compare teaching hour distributions across faculty cohorts.',
      },
      {
        decision: 'React 19 + Tailwind CSS v4 with Vite',
        rationale:
          'Provides fast local iteration and clean component styling across administrative and faculty views.',
      },
    ],
    limitationsAndNotes: [
      'A public live URL is not yet connected because production Firebase `.env` keys have not been provisioned on Netlify.',
      'The workload chart on this portfolio is an Interactive UI Simulation demonstrating the rebalancing concept.',
    ],
    visualCaption:
      'Interactive UI Simulation · Demonstrates departmental credit distribution and workload rebalancing',
  },
  {
    slug: 'ready-map',
    index: '04',
    title: 'Ready-map',
    subtitle: 'Interactive Roadmap Visualizer',
    repoName: 'Ready-map (Local Prototype)',
    localWorkspacePath: 'a:\\MY-Projects(AI)\\Ready-map',
    tagline:
      'Local frontend prototype built with @xyflow/react and React 19 that turns static learning checklists into interactive prerequisite node graphs.',
    shortDescription:
      'An active local development prototype (`@xyflow/react` + React 19 + Motion) that visualizes developer learning paths as interactive prerequisite node graphs rather than static checklists.',
    category: 'Interactive Graph UI & Frontend Prototype',
    filterCategory: 'Frontend & UI',
    statusLabel: 'Local Prototype · GitHub Push Pending',
    authenticityNote:
      'Currently in local workspace development (`a:\\MY-Projects(AI)\\Ready-map`); demonstrated here via an Interactive UI Simulation.',
    year: '2026',
    repoUrl: null,
    liveDemoUrl: null,
    demoVerificationNote:
      'Currently developed locally in `a:\\MY-Projects(AI)\\Ready-map` (`frontend/src/App.tsx`, `frontend/package.json`) and not yet pushed to a public GitHub repository. Explore the Interactive UI Simulation to test the node-graph concept.',
    visualVariant: 'ready-map',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS v4',
      '@xyflow/react (React Flow)',
      'Motion for React',
    ],
    purposeAndProblem: {
      overview:
        'Ready-map is an interactive frontend prototype that models technical learning roadmaps as navigable spatial node graphs.',
      problemStatement:
        'Static markdown checklists make it hard for students to see how foundational topics unlock downstream skills. Ready-map uses `@xyflow/react` and `motion` to render prerequisite edges and milestone progression states.',
    },
    contributionSummary:
      'Built the local React Flow prototype canvas (`frontend/src/App.tsx`) and configured the React 19 + TypeScript + Tailwind CSS v4 + `@xyflow/react` + `motion` workspace (`frontend/package.json`).',
    implementedFeatures: [
      {
        title: 'Spatial Prerequisite Node Canvas (`frontend/src/App.tsx`)',
        detail:
          'Uses `@xyflow/react` (React Flow) in the local prototype to render connected skill nodes, directed prerequisite edges, and pan/zoom controls.',
        sourceEvidence: 'frontend/src/App.tsx, frontend/package.json',
      },
      {
        title: 'Interactive Milestone State Progression',
        detail:
          'Allows users to inspect roadmap nodes, toggle completion states, and see which downstream topics unlock next.',
        sourceEvidence: 'frontend/src/App.tsx',
      },
      {
        title: 'Node Transition Polish with Motion for React (`motion`)',
        detail:
          'Pairs React 19 and Tailwind CSS v4 styling with `motion` transitions for node selection feedback.',
        sourceEvidence: 'frontend/package.json (@xyflow/react, motion, react 19)',
      },
    ],
    plannedOrConceptualFeatures: [
      'Initialize a public GitHub repository (`DirishamKamesh/Ready-map`) and push the local workspace code',
      'Deploy a standalone static preview on Vercel or Netlify once the repository is public',
    ],
    technicalArchitecture: [
      {
        layer: 'Graph Canvas Engine',
        stack: '@xyflow/react (React Flow), React 19, TypeScript',
        details:
          'Manages custom node layouts, directed dependency edges, and interactive selection state.',
      },
      {
        layer: 'Styling & Motion Layer',
        stack: 'Tailwind CSS v4, Motion for React (motion), Vite',
        details:
          'Provides clean node card styling and smooth transitions when inspecting roadmap milestones.',
      },
    ],
    engineeringDecisions: [
      {
        decision: 'Built on `@xyflow/react` with React 19',
        rationale:
          'React Flow provides a spatial coordinate system and edge routing engine while allowing custom React node components.',
      },
      {
        decision: 'Prerequisite graph structure over flat checklists',
        rationale:
          'Structuring roadmap topics as a directed graph helps students visualize which fundamentals come before advanced frameworks.',
      },
    ],
    limitationsAndNotes: [
      'This project currently exists in the local workspace (`a:\\MY-Projects(AI)\\Ready-map`) and has not yet been published to GitHub.',
      'The interactive widget on this page is a portfolio UI simulation of the Ready-map node-progression workflow.',
    ],
    visualCaption:
      'Interactive UI Simulation · Models the local @xyflow/react prerequisite node-graph prototype',
  },
];

export const secondaryRepositories: SecondaryRepository[] = [
  {
    name: 'My_FSD_journey',
    title: 'My_FSD_journey — Full-Stack Engineering Logs',
    category: 'Continuous Practice · Web Foundations',
    locationOrPath: 'github.com/DirishamKamesh/My_FSD_journey',
    description:
      'Ongoing full-stack practice repository containing DOM manipulation exercises, responsive CSS layouts, and foundational JavaScript coursework.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    repoUrl: 'https://github.com/DirishamKamesh/My_FSD_journey',
    statusNote: 'Public GitHub Repo',
  },
  {
    name: 'DSA_questions_java',
    title: 'DSA_questions_java — Data Structures in Java',
    category: 'Algorithmic Foundations · OOP',
    locationOrPath: 'github.com/DirishamKamesh/DSA_questions_java',
    description:
      'Data structure implementations and object-oriented practice in Java covering Arrays, Linked Lists, Trees, Stacks, Queues, and Graphs.',
    technologies: ['Java', 'OOP', 'Data Structures'],
    repoUrl: 'https://github.com/DirishamKamesh/DSA_questions_java',
    statusNote: 'Public GitHub Repo',
  },
  {
    name: 'neetcode-submissions',
    title: 'neetcode-submissions — Algorithmic Practice',
    category: 'Interview Problem Solving',
    locationOrPath: 'github.com/DirishamKamesh/neetcode-submissions',
    description:
      'LeetCode and NeetCode problem solutions practicing Sliding Window, Two Pointers, Dynamic Programming, and time/space complexity analysis.',
    technologies: ['Java', 'C', 'Algorithms', 'Big-O'],
    repoUrl: 'https://github.com/DirishamKamesh/neetcode-submissions',
    statusNote: 'Public GitHub Repo',
  },
  {
    name: 'HackMate',
    title: 'HackMate — Hackathon Collaboration & Skill-Matching Platform',
    category: 'Student Collaboration Prototype',
    locationOrPath: 'github.com/DirishamKamesh/HackMate',
    description:
      'Student networking platform with role-compatibility scoring to match hackathon teammates by skills and roles, with interfaces for browsing project ideas and community discussions.',
    technologies: ['React', 'JavaScript', 'HTML5/CSS3', 'Vite', 'Firebase SDK'],
    repoUrl: 'https://github.com/DirishamKamesh/HackMate',
    liveDemoUrl: 'https://hackmatev1.netlify.app',
    liveDemoLabel: 'Live Preview',
    statusNote: 'Public Repo + Live Preview',
  },
  {
    name: 'Tasky',
    title: 'Tasky — Real-Time Task Management System',
    category: 'Workflow & Productivity Application',
    locationOrPath: 'github.com/DirishamKamesh/Tasky',
    description:
      'Responsive task-management application built with modular React components, interactive state management, and workflow dashboards for organizing priorities and tracking project milestones.',
    technologies: ['React.js', 'JavaScript', 'Vite', 'CSS3'],
    repoUrl: 'https://github.com/DirishamKamesh/Tasky',
    statusNote: 'Resume Technical Project',
  },
  {
    name: 'NetworX',
    title: 'NetworX — Student Developer Network Concept',
    category: 'Web & Networking Prototype',
    locationOrPath: 'github.com/DirishamKamesh/NetworX',
    description:
      'Early-stage student developer network concept exploring project discovery and peer collaboration with Node.js/Express and web templates.',
    technologies: ['Node.js', 'Express', 'HTML/CSS/JS'],
    repoUrl: 'https://github.com/DirishamKamesh/NetworX',
    statusNote: 'Public GitHub Repo',
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return featuredProjects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectCaseStudy;
  next: ProjectCaseStudy;
} {
  const index = featuredProjects.findIndex((p) => p.slug === slug);
  const currentIdx = index === -1 ? 0 : index;
  const prevIdx = (currentIdx - 1 + featuredProjects.length) % featuredProjects.length;
  const nextIdx = (currentIdx + 1) % featuredProjects.length;
  return {
    prev: featuredProjects[prevIdx],
    next: featuredProjects[nextIdx],
  };
}
