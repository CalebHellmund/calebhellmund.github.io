export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  featured: boolean;
}

export const projects: Project[] = [
    {
    slug: 'example-project',
    title: 'Example Project',
    description: 'This is a quick example of a project.',
    longDescription: `This is a longer description of this project. My hope is that this works and I will add my actual projects soon.`,
    techStack: ['Python', 'Cpp', 'other stuff'],
    tags: ['AI/ML', 'Backend', 'Search'],
    //githubUrl: 'https://github.com/yourusername/example',
    demoUrl: 'https://demo.example.com/example',
    image: '/images/example.png',
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}