export type SkillTier = 'Used in projects' | 'Working knowledge' | 'Currently learning';

export interface SkillItem {
  name: string;
  tier: SkillTier;
  context: string;
}

export interface SkillCategoryGroup {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface FrontendToolkitItem {
  id: 'react' | 'nextjs' | 'typescript' | 'tailwindcss' | 'framer-motion';
  index: string;
  name: string;
  badge: string;
  role: string;
  description: string;
  verifiedIn: string[];
  accentColor: string;
}

export const frontendToolkitItems: FrontendToolkitItem[] = [
  {
    id: 'react',
    index: '01',
    name: 'React',
    badge: 'v19 // UI Runtime',
    role: 'Component Architecture & State',
    description:
      'Declarative component hierarchies, custom hooks, and interactive state orchestration across spatial node graphs and multi-panel web apps.',
    verifiedIn: ['Repo-Riddle', 'Ready-map', 'FacuLynk', 'HackMate'],
    accentColor: '#A8DADC',
  },
  {
    id: 'nextjs',
    index: '02',
    name: 'Next.js',
    badge: 'App Router // SSR & SSG',
    role: 'Full-Stack React Framework',
    description:
      'Server and Client Component composition, dynamic project case-study routing, SEO metadata pipelines, and optimized production bundling.',
    verifiedIn: ['Portfolio v2', 'Case Study Engine'],
    accentColor: '#E63946',
  },
  {
    id: 'typescript',
    index: '03',
    name: 'TypeScript',
    badge: 'Strict Mode // Types',
    role: 'Type-Safe UI & Data Contracts',
    description:
      'End-to-end static typing for AST dependency graphs, interactive simulation state, centralized content schemas, and API interfaces.',
    verifiedIn: ['Repo-Riddle', 'Ready-map', 'FacuLynk', 'Portfolio v2'],
    accentColor: '#457B9D',
  },
  {
    id: 'tailwindcss',
    index: '04',
    name: 'Tailwind CSS',
    badge: 'v4 // Design Tokens',
    role: 'Responsive Styling & Theming',
    description:
      'Utility-first layout engineering paired with custom CSS variable token systems for dual Midnight & Daylight Blueprint themes.',
    verifiedIn: ['Repo-Riddle', 'Ready-map', 'FacuLynk', 'Portfolio v2'],
    accentColor: '#A8DADC',
  },
  {
    id: 'framer-motion',
    index: '05',
    name: 'Framer Motion',
    badge: 'Motion // Choreography',
    role: 'Interactive UI Animation',
    description:
      'Spring-physics micro-interactions, scroll-triggered reveals, layout transitions, and accessible reduced-motion-aware choreography.',
    verifiedIn: ['Ready-map', 'Portfolio v2'],
    accentColor: '#E63946',
  },
];


export const skillCategoryGroups: SkillCategoryGroup[] = [
  {
    id: 'frontend-ui',
    index: '01',
    title: 'Frontend and UI Engineering',
    subtitle: 'Core focus area applied across interactive graphs, SaaS portals, and responsive web apps.',
    skills: [
      {
        name: 'React 19 & React Router v7',
        tier: 'Used in projects',
        context: 'Component architecture and routing in Repo-Riddle, FacuLynk, Ready-map, and HackMate',
      },
      {
        name: 'TypeScript',
        tier: 'Used in projects',
        context: 'Strict typing across Repo-Riddle, FacuLynk, Ready-map, and this portfolio',
      },
      {
        name: 'Tailwind CSS v4 & CSS3',
        tier: 'Used in projects',
        context: 'Custom design token systems (`DESIGN.md`), responsive grids, and dark UI themes',
      },
      {
        name: '@xyflow/react (React Flow) & Recharts',
        tier: 'Used in projects',
        context: 'Interactive spatial node graphs in Ready-map and credit distribution charts in FacuLynk',
      },
      {
        name: 'Motion for React & Interactive UI',
        tier: 'Used in projects',
        context: 'Kinetic scroll choreography, 3D perspective tilt, and node transitions in Ready-map',
      },
      {
        name: 'HTML5, JavaScript (ES6+) & Jinja2',
        tier: 'Used in projects',
        context: 'Semantic templates and DOM manipulation across CareSync / NEURO-CORE and My_FSD_journey',
      },
      {
        name: 'Chart.js & Canvas API',
        tier: 'Used in projects',
        context: 'Clinical analytics telemetry in CareSync / NEURO-CORE and interactive 2D visuals',
      },
    ],
  },
  {
    id: 'backend-apis',
    index: '02',
    title: 'Backend, APIs & AI Integration',
    subtitle: 'Server-side frameworks, ORM persistence, and AI reasoning proxies.',
    skills: [
      {
        name: 'Node.js & Express (server.ts)',
        tier: 'Used in projects',
        context: 'Backend proxy server in Repo-Riddle and REST controllers in NetworX',
      },
      {
        name: 'Python & Flask',
        tier: 'Used in projects',
        context: 'Clinical server (`run.py`), RBAC session management, and routing in CareSync / NEURO-CORE',
      },
      {
        name: 'Google GenAI SDK (@google/genai)',
        tier: 'Used in projects',
        context: 'AST symbol and repository architecture analysis via Express proxy in Repo-Riddle',
      },
      {
        name: 'ReportLab PDF & QR Verification',
        tier: 'Used in projects',
        context: 'Dynamic prescription PDF generation with tamper-evident QR codes in CareSync / NEURO-CORE',
      },
    ],
  },
  {
    id: 'databases-cloud',
    index: '03',
    title: 'Databases, ORM & Cloud Services',
    subtitle: 'Relational ORMs, embedded databases, and real-time cloud synchronization.',
    skills: [
      {
        name: 'SQLAlchemy ORM & SQLite',
        tier: 'Used in projects',
        context: 'Relational schema modeling (`neurocore_dev_test.db`) and `seed.py` in CareSync / NEURO-CORE',
      },
      {
        name: 'Firebase Authentication',
        tier: 'Used in projects',
        context: 'User and faculty authentication flows in FacuLynk and HackMate',
      },
      {
        name: 'Cloud Firestore',
        tier: 'Used in projects',
        context: 'Real-time timetable notices in FacuLynk and squad matching in HackMate',
      },
      {
        name: 'PostgreSQL & Supabase Fundamentals',
        tier: 'Working knowledge',
        context: 'Relational database fundamentals and backend-as-a-service table management',
      },
    ],
  },
  {
    id: 'programming-dsa',
    index: '04',
    title: 'Programming & Algorithmic Problem Solving',
    subtitle: 'Data structures, OOP, PGDCA foundations, and competitive coding on LeetCode & CodeChef.',
    skills: [
      {
        name: 'Java & Object-Oriented Programming',
        tier: 'Used in projects',
        context: 'Arrays, Linked Lists, Trees, Stacks, Queues, and Graphs in `DSA_questions_java` & PGDCA coursework',
      },
      {
        name: 'C, C++ & Python Programming',
        tier: 'Used in projects',
        context: 'Algorithmic implementations in `neetcode-submissions`, PGDCA certification, and systems fundamentals',
      },
      {
        name: 'Competitive Programming (LeetCode & CodeChef)',
        tier: 'Used in projects',
        context: 'Active practice on LeetCode (@Kamesh_1) and CodeChef (@kaamesh_1): Sliding Window, Two Pointers, DP, Big-O',
      },
    ],
  },
  {
    id: 'tools-deployment',
    index: '05',
    title: 'Build Tooling & Deployment',
    subtitle: 'Modern frontend bundlers, version control, and cloud hosting pipelines.',
    skills: [
      {
        name: 'Vite & Next.js',
        tier: 'Used in projects',
        context: 'Fast TypeScript bundling across Repo-Riddle, FacuLynk, Ready-map, and this portfolio',
      },
      {
        name: 'Git & GitHub',
        tier: 'Used in projects',
        context: 'Repository management, branching, and continuous practice logs',
      },
      {
        name: 'Netlify (`netlify.toml`) & Render (`render.yaml`)',
        tier: 'Used in projects',
        context: 'Deployment pipelines configured across HackMate, CareSync, and FacuLynk',
      },
    ],
  },
  {
    id: 'currently-learning',
    index: '06',
    title: 'Currently Learning & Expanding',
    subtitle: 'Active focus areas during my second year of B.Tech CSE at Vignan, Duvvada.',
    skills: [
      {
        name: 'Advanced Graph & Spatial Interfaces',
        tier: 'Currently learning',
        context: 'Expanding `@xyflow/react` node-graph interactions and kinetic UI choreography',
      },
      {
        name: 'Full-Stack System Architecture',
        tier: 'Currently learning',
        context: 'Bridging React/TypeScript frontends with Node/Express and Python/Flask backends',
      },
      {
        name: 'Applied AI/ML Developer Tooling',
        tier: 'Currently learning',
        context: 'Prompt engineering, AST context packaging, and server-side `@google/genai` workflows',
      },
      {
        name: 'Advanced Data Structures & Algorithms',
        tier: 'Currently learning',
        context: 'Graph algorithms, dynamic programming, and competitive coding in Java and C',
      },
    ],
  },
];
