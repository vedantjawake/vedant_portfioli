export interface Social { label: string; href: string }

export type SocialId =
  | 'github' | 'linkedin' | 'email' | 'leetcode' | 'hackerrank'
  | 'codechef' | 'devto' | 'hashnode' | 'medium' | 'credly';

export interface SocialLink {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
  group: 'Professional' | 'Competitive coding' | 'Writing' | 'Credentials';
}
export interface Detail { label: string; value: string }

export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  roles: string[];
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  resumeUrl: string;
  photo?: string; // optional: put a photo in /public and set e.g. "/me.jpg"
  socials: Social[];
  details: Detail[];
}

export interface SkillGroup { id: string; title: string; blurb: string; skills: string[] }

export interface Project {
  id: string;
  title: string;
  period: string;
  status: 'In progress' | 'Completed';
  kind: string;
  summary: string;
  features: string[];
  stack: string[];
}

export type CertType = 'Certificate' | 'Workshop' | 'Job simulation';
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  type: CertType;
  tags: string[];
}

export interface Examination {
  id: string;
  short: string;
  name: string;
  institution: string;
  year: string;
  status: 'Pursuing' | 'Completed';
  score?: string; // optional: e.g. "8.4 CGPA" or "82%"
}

export interface AboutContent {
  quote: string;
  paragraphs: string[];
  strengths: string[];
  interests: string[];
  learning: string[];
  facts: Detail[];
}

export interface GithubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  pushedAt?: string;
}
