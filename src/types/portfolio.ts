export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

export interface About {
  description: string;
  cardDescription: string;
  stats: {
    value: string;
    label: string;
  }[];
  skills: {
    gameEngines: string[];
    languages: string[];
    technologies: string[];
    platforms: string[];
  };
}

export interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  logo: string;
  responsibilities: string[];
  tags: string[];
}

export interface ProjectAction {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface Contribution {
  title: string;
  description: string | string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  keyFeatures: string[];
  platform: string[];
  contributions: Contribution[];
  tags: string[];
  image: string;
  videos: string[];
  images: string[];
  links: {
    download?: string;
    demo?: string;
    github?: string;
  };
  actions?: ProjectAction[];
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  details: string[];
}

export interface Certificate {
  name: string;
  description: string;
}

export interface Contact {
  description: string;
}

export interface Opportunities {
  description: string;
  items: string[];
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  contact: Contact;
  opportunities: Opportunities;
  experience: ExperienceItem[];
  projects: Project[];
  education: EducationItem[];
  certificates: Certificate[];
  filterCategories: string[];
}
