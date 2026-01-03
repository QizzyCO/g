
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export enum Section {
  Home = 'home',
  About = 'about',
  Projects = 'projects',
  Services = 'services',
  Contact = 'contact'
}
