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
    slug: 'neural-search-engine',
    title: 'Neural Search Engine',
    description: 'A semantic search engine powered by transformer embeddings and vector similarity.',
    longDescription: `This project implements a full-stack semantic search engine that goes beyond keyword matching. By leveraging transformer-based sentence embeddings (SBERT), it understands the meaning behind queries and returns contextually relevant results.\n\nThe system indexes documents into a high-dimensional vector space using FAISS, enabling sub-millisecond approximate nearest neighbor search across millions of documents. A FastAPI backend serves the search API, while a React frontend provides an intuitive search experience with highlighted snippets and faceted filters.\n\nKey achievements include 3x improvement in search relevance compared to BM25 baseline, 99.9% uptime with horizontal scaling, and support for multilingual queries across 15 languages.`,
    techStack: ['Python', 'FastAPI', 'PyTorch', 'FAISS', 'React', 'TypeScript', 'Docker', 'PostgreSQL'],
    tags: ['AI/ML', 'Backend', 'Search'],
    githubUrl: 'https://github.com/yourusername/neural-search-engine',
    demoUrl: 'https://demo.example.com/neural-search',
    image: '/images/project-neural-search.png',
    featured: true,
  },
  {
    slug: 'devops-dashboard',
    title: 'DevOps Observability Dashboard',
    description: 'A real-time infrastructure monitoring dashboard with anomaly detection and alerting.',
    longDescription: `A comprehensive observability platform built to give engineering teams instant insight into their infrastructure health. The dashboard aggregates metrics from Prometheus, logs from Elasticsearch, and traces from Jaeger into a unified view.\n\nAnomaly detection runs continuously using an LSTM-based model trained on historical time-series data, automatically flagging unusual patterns before they become incidents. Alert rules are configurable through a drag-and-drop rule builder, and notifications route to Slack, PagerDuty, or email.\n\nThe project uses a microservices architecture deployed on Kubernetes, with a Go-based metrics aggregation service capable of ingesting 500K data points per second.`,
    techStack: ['Go', 'Kubernetes', 'Prometheus', 'Grafana', 'Elasticsearch', 'React', 'Python', 'Redis'],
    tags: ['DevOps', 'Backend', 'Monitoring'],
    githubUrl: 'https://github.com/yourusername/devops-dashboard',
    image: '/images/project-devops-dashboard.png',
    featured: true,
  },
  {
    slug: 'markdown-editor',
    title: 'Collaborative Markdown Editor',
    description: 'A real-time collaborative editor with live preview, version history, and export options.',
    longDescription: `A browser-based markdown editor that supports real-time multi-user collaboration using CRDTs (Conflict-free Replicated Data Types) via the Yjs library. Multiple users can edit simultaneously without conflicts, with each user's cursor and selection visible to collaborators.\n\nThe editor features a split-pane live preview with syntax highlighting powered by Prism.js, GitHub-flavored markdown support, and a toolbar for common formatting actions. Documents auto-save to a Supabase backend, maintaining a full version history with diff visualization.\n\nExport options include PDF (via Puppeteer), HTML, and plain text. The app is fully offline-capable using a service worker and IndexedDB for local storage.`,
    techStack: ['TypeScript', 'React', 'Yjs', 'WebSockets', 'Supabase', 'Prism.js', 'Tailwind CSS'],
    tags: ['Frontend', 'Collaboration', 'Tools'],
    githubUrl: 'https://github.com/yourusername/markdown-editor',
    demoUrl: 'https://demo.example.com/md-editor',
    image: '/images/project-md-editor.png',
    featured: true,
  },
  {
    slug: 'cli-task-manager',
    title: 'CLI Task Manager',
    description: 'A fast, keyboard-driven terminal task manager written in Rust with sync capabilities.',
    longDescription: `A blazing-fast command-line task manager inspired by Taskwarrior but redesigned for modern workflows. Built in Rust for near-instant startup and low memory footprint, it stores tasks in a local SQLite database and syncs to a self-hosted or cloud endpoint.\n\nTasks support rich metadata including due dates, priorities, tags, projects, and custom fields. The TUI (terminal UI) built with Ratatui provides a smooth, vim-style keyboard navigation experience with customizable keybindings.\n\nThe sync protocol is conflict-aware and works offline-first, reconciling changes when connectivity is restored using a vector-clock based algorithm.`,
    techStack: ['Rust', 'SQLite', 'Ratatui', 'Tokio', 'Serde'],
    tags: ['CLI', 'Rust', 'Tools'],
    githubUrl: 'https://github.com/yourusername/cli-task-manager',
    image: '/images/project-cli-task.png',
    featured: false,
  },
  {
    slug: 'generative-art',
    title: 'Generative Art System',
    description: 'A parametric art generator using WebGL shaders and noise functions.',
    longDescription: `An interactive generative art system that creates unique, parameter-driven visual compositions in the browser using WebGL2 shaders. The core rendering engine is written in GLSL and leverages Simplex noise, domain warping, and reaction-diffusion simulations to produce organic, evolving patterns.\n\nUsers can adjust parameters in real-time via a control panel, export frames as high-resolution PNG files, and record animations as WebM videos. Each composition can be serialized to a compact JSON "seed" that fully reproduces the artwork.\n\nThe project also includes a gallery mode that cycles through algorithmically generated compositions, with a public API for embedding artworks in third-party sites.`,
    techStack: ['TypeScript', 'WebGL2', 'GLSL', 'React', 'Web Workers'],
    tags: ['Creative Coding', 'WebGL', 'Frontend'],
    githubUrl: 'https://github.com/yourusername/generative-art',
    demoUrl: 'https://demo.example.com/genart',
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}