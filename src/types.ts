export type ProjectCategory = 'All' | 'UI/UX & Design' | 'Full Stack Web' | 'Mobile Apps' | 'Creative AI & Tools';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  featured: boolean;
  thumbnail: string;
  images: string[];
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  client?: string;
  role: string;
  duration: string;
  year: number;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  challenge?: string;
  solution?: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  logo?: string;
  location: string;
  period: string; // e.g. "2024 - Present"
  isCurrent: boolean;
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Internship';
  category: 'Engineering' | 'Design & Strategy' | 'Leadership';
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string; // e.g. "5 min read"
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  likes: number;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  projectRelation?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; iconName?: string }[];
}

export interface UserProfile {
  name: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatar: string;
  availableForHire: boolean;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
    website?: string;
  };
  stats: {
    yearsExperience: number;
    completedProjects: number;
    happyClients?: number;
    awardsWon?: number;
    certifications?: number;
  };
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  period: string;
  score?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget?: string;
  message: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  [key: string]: any;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics?: string[];
  updated_at: string;
  default_branch: string;
  visibility?: string;
  [key: string]: any;
}

export interface GitHubConnectionState {
  isConnected: boolean;
  username: string;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  lastSyncedAt?: string;
  authMethod: 'username' | 'oauth' | 'token';
}

