import type {
  AboutContent, Certification, Examination, GithubRepo, Profile, Project,
  SkillGroup, SocialLink,
} from '../types';

/* ------------------------------------------------------------------
   EDIT THIS FILE ONLY. Every section of the portfolio reads from here.
------------------------------------------------------------------- */

/** All your links (taken from your GitHub profile README). */
export const socialLinks: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', handle: 'vedant-jawake', href: 'https://www.linkedin.com/in/vedant-jawake-a92764358/', group: 'Professional' },
  { id: 'github', label: 'GitHub', handle: '@vedantjawake', href: 'https://github.com/vedantjawake', group: 'Professional' },
  { id: 'email', label: 'Email', handle: 'vedantjawake6@gmail.com', href: 'mailto:vedantjawake6@gmail.com', group: 'Professional' },
  { id: 'leetcode', label: 'LeetCode', handle: 'wiESfuyThW', href: 'https://leetcode.com/u/wiESfuyThW/', group: 'Competitive coding' },
  { id: 'hackerrank', label: 'HackerRank', handle: 'vedantjawake6', href: 'https://www.hackerrank.com/profile/vedantjawake6', group: 'Competitive coding' },
  { id: 'codechef', label: 'CodeChef', handle: 'vedttt_03', href: 'https://www.codechef.com/users/vedttt_03', group: 'Competitive coding' },
  { id: 'devto', label: 'Dev.to', handle: '@vedant_3', href: 'https://dev.to/vedant_3', group: 'Writing' },
  { id: 'hashnode', label: 'Hashnode', handle: '@veddd', href: 'https://hashnode.com/@veddd', group: 'Writing' },
  { id: 'medium', label: 'Medium', handle: '@vedantjawake6', href: 'https://medium.com/@vedantjawake6', group: 'Writing' },
  { id: 'credly', label: 'Credly', handle: 'vedant-jawake', href: 'https://www.credly.com/users/vedant-jawake/badges', group: 'Credentials' },
];

export const profile: Profile = {
  name: 'Vedant Ravindra Jawake',
  shortName: 'Vedant Jawake',
  initials: 'VJ',
  role: 'Full-Stack & AI Developer',
  roles: ['Full-Stack Developer', 'AI & ML Builder', 'MCA Student'],
  tagline:
    'I design and ship scalable web apps and AI-integrated tools with React, Node.js and Python.',
  summary:
    'Driven MCA student with strong expertise in full-stack development, AI/ML and software engineering. I design and deploy scalable web applications using React.js, Node.js and MongoDB Atlas, and I build AI-integrated solutions in Python. I am looking for internship and full-time roles where I can turn technical skill into business impact.',
  email: 'vedantjawake6@gmail.com',
  phone: '8459254989',
  location: 'Amravati, Maharashtra, India',
  availability: 'Open to internships and full-time roles',
  // Put your photo at public/me.jpg (or change this path). If the file is missing, initials are shown.
  photo: '/me.jpg',
  resumeUrl: '/Vedant_Jawake_Resume.pdf',
  socials: socialLinks
    .filter((l) => l.group === 'Professional')
    .map((l) => ({ label: l.label, href: l.href })),
  details: [
    { label: 'Full name', value: 'Vedant Ravindra Jawake' },
    { label: 'Role', value: 'MCA Student | Full-Stack & AI Developer' },
    { label: 'Studying', value: 'MCA, PR Pote Patil College (2025–2027)' },
    { label: 'Location', value: 'Amravati, Maharashtra, India' },
    { label: 'Languages', value: 'English, Hindi, Marathi' },
    { label: 'Looking for', value: 'Internship / full-time role' },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Languages',
    blurb: 'What I write logic in.',
    skills: ['Python', 'JavaScript', 'Java', 'C', 'C++'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces that are fast and responsive.',
    skills: ['HTML5', 'CSS3', 'React.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'APIs and server logic.',
    skills: ['Node.js', 'Express.js', 'PHP'],
  },
  {
    id: 'databases',
    title: 'Databases',
    blurb: 'Where the data lives.',
    skills: ['MongoDB Atlas', 'MySQL', 'Firebase'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    blurb: 'My daily workflow.',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'LibreOffice'],
  },
  {
    id: 'concepts',
    title: 'Core Concepts',
    blurb: 'The foundations under the code.',
    skills: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Networks', 'Cloud Computing', 'AI Integration'],
  },
];

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Evo – Personal AI Assistant',
    period: '2026 – Present',
    status: 'In progress',
    kind: 'AI · Automation',
    summary:
      'An intelligent personal assistant for coding support, task automation and everyday productivity.',
    features: [
      'Modular architecture built to scale',
      'API integration for conversational AI',
      'Task automation and coding help',
    ],
    stack: ['Python', 'AI APIs', 'Automation'],
  },
  {
    id: 'p2',
    title: 'Food Services Application',
    period: '2026 – Present',
    status: 'In progress',
    kind: 'Full-stack · Own business',
    summary:
      'An online food ordering and subscription platform for my own business, giving customers a professional digital experience.',
    features: [
      'Secure user authentication',
      'Admin dashboard and real-time order tracking',
      'Responsive design on MongoDB Atlas',
    ],
    stack: ['React.js', 'Node.js', 'MongoDB Atlas'],
  },
  {
    id: 'p3',
    title: 'Employment Management System',
    period: '2026 – Present',
    status: 'In progress',
    kind: 'Web app · AI integrated',
    summary:
      'A web-based system for employee records with AI-powered workforce insights and recommendations.',
    features: [
      'Full CRUD with role-based access control',
      'AI analytics and performance tracking',
      'Normalized MySQL database design',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
  {
    id: 'p4',
    title: 'E-commerce Website',
    period: '2024',
    status: 'Completed',
    kind: 'Group project · BCA',
    summary:
      'A collaborative full-stack e-commerce platform built as part of BCA coursework.',
    features: [
      'Product catalog, cart and authentication',
      'Secure payment integration',
      'RESTful API design and normalized database',
    ],
    stack: ['Full-stack', 'REST API', 'Database design'],
  },
];

export const certifications: Certification[] = [
  {
    id: 'c1',
    title: 'TCS iON Career Edge – IT Primer',
    issuer: 'TCS iON',
    year: '2026',
    type: 'Certificate',
    tags: ['IT fundamentals', 'Career'],
  },
  {
    id: 'c2',
    title: 'Generative AI Essentials',
    issuer: 'TCS iON',
    year: '2026',
    type: 'Certificate',
    tags: ['Generative AI'],
  },
  {
    id: 'c3',
    title: 'Build with AI & Machine Learning Workshop',
    issuer: 'NextGen Intelligence',
    year: '2026',
    type: 'Workshop',
    tags: ['AI', 'Machine learning'],
  },
  {
    id: 'c4',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte (Forage)',
    type: 'Job simulation',
    tags: ['Data analytics'],
  },
  {
    id: 'c5',
    title: 'Quantitative Research Job Simulation',
    issuer: 'JPMorgan Chase & Co. (Forage)',
    type: 'Job simulation',
    tags: ['Quant research', 'Finance'],
  },
  {
    id: 'c6',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'TCS (Forage)',
    type: 'Job simulation',
    tags: ['Generative AI', 'Data analytics'],
  },
];

export const examinations: Examination[] = [
  {
    id: 'e1',
    short: 'MCA',
    name: 'Master of Computer Applications (MCA)',
    institution: 'PR Pote Patil College, Amravati',
    year: '2025 – 2027',
    status: 'Pursuing',
  },
  {
    id: 'e2',
    short: 'BCA',
    name: 'Bachelor of Computer Applications (BCA)',
    institution: 'Takshashila Mahavidyalaya, Amravati',
    year: '2021 – 2025',
    status: 'Completed',
  },
  {
    id: 'e3',
    short: 'HSC',
    name: 'Higher Secondary (Science)',
    institution: 'Shrimati Narsamma Hirayya College, Amravati',
    year: '2019 – 2021',
    status: 'Completed',
  },
  {
    id: 'e4',
    short: 'SSC',
    name: 'Secondary',
    institution: 'Manibai Gujarati High School, Amravati',
    year: '2013 – 2019',
    status: 'Completed',
  },
];

export const about: AboutContent = {
  quote: 'Build things that work, scale, and move the business forward.',
  paragraphs: [
    'I am an MCA student who enjoys the full path from idea to deployed product: shaping the data, building the API, designing the interface and wiring in AI where it genuinely helps.',
    'My current work includes a food ordering and subscription platform for my own business, a personal AI assistant called Evo, and an employment management system with AI-driven insights. Building for a real business has taught me to care about reliability, clear design and what customers actually need.',
    'I am looking for an internship or full-time role where I can keep learning from a strong team and contribute from day one.',
  ],
  strengths: [
    'Problem-solving',
    'Quick learner',
    'Team collaboration',
    'Adaptability',
    'Communication',
    'Self-motivated',
    'Deadline management',
  ],
  interests: ['Full-stack development', 'AI & machine learning', 'Automation', 'Data analytics'],
  learning: ['Spring Boot', 'Docker & Kubernetes', 'System design', 'AI/ML integration'],
  facts: [
    { label: 'Based in', value: 'Amravati, Maharashtra' },
    { label: 'Studying', value: 'MCA (2025–2027)' },
    { label: 'Languages', value: 'English · Hindi · Marathi' },
  ],
};

/** Shown only if GitHub's API cannot be reached (offline, rate limit). */
export const fallbackRepos: GithubRepo[] = [
  { name: 'employee-management-system', description: 'Employee records with role-based access.', language: 'JavaScript', stars: 0, url: 'https://github.com/vedantjawake/employee-management-system' },
  { name: 'React-From-Scratch', description: 'Learning React from the ground up.', language: 'CSS', stars: 0, url: 'https://github.com/vedantjawake/React-From-Scratch' },
  { name: 'python_learning', description: 'Python from basics.', language: 'Python', stars: 1, url: 'https://github.com/vedantjawake/python_learning' },
  { name: 'web-platform-6zinuc', description: 'Created with StackBlitz.', language: 'HTML', stars: 0, url: 'https://github.com/vedantjawake/web-platform-6zinuc' },
];
