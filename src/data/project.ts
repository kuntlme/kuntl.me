export interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  direcLink: string;
  techStack: string[];
}

export const homeProjects: Project[] = [
  {
    id: 1,
    title: "CheckMate",
    description:
      "Production-style real-time chess platform with WebSocket multiplayer, OAuth authentication, PostgreSQL persistence, and Dockerized microservices.",
    githubLink: "https://github.com/kuntlme/modern_chess",
    direcLink: "chess-client-latest.onrender.com",
    techStack: [
      "Next.js",
      "TypeScript",
      "Postgres",
      "WebSocket",
      "Turbo",
      "Prisma",
      "React",
      "Tailwind CSS",
      "Docker",
      "CI/CD"
    ],
  },
  {
    id: 2,
    title: "Scrollon",
    description:
      "A full-stack reel app that lets users upload, explore, and interact with short videos. Built with modern web technologies for seamless playback, smooth UI, and real-time engagement.",
    githubLink: "https://github.com/Kuntalmajee2557/excalidraw-project",
    direcLink: "https://scrollon.vercel.app",
    techStack: [
      "Next.js",
      "TypeScript",
      "Turbo",
      "Postgres",
      "Prisma",
      "Docker",
      "React",
      "Tailwind CSS",
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "CheckMate",
    description:
      "Production-style real-time chess platform with WebSocket multiplayer, OAuth authentication, PostgreSQL persistence, and Dockerized microservices.",
    githubLink: "https://github.com/kuntlme/modern_chess",
    direcLink: "chess-client-latest.onrender.com",
    techStack: [
      "Next.js",
      "TypeScript",
      "Postgres",
      "WebSocket",
      "Turbo",
      "Prisma",
      "React",
      "Tailwind CSS",
      "Docker",
      "CI/CD"
    ],
  },
  {
    id: 2,
    title: "Scrollon",
    description:
      "A full-stack reel app that lets users upload, explore, and interact with short videos. Built with modern web technologies for seamless playback, smooth UI, and real-time engagement.",
    githubLink: "https://github.com/Kuntalmajee2557/excalidraw-project",
    direcLink: "https://scrollon.vercel.app",
    techStack: [
      "Next.js",
      "TypeScript",
      "Turbo",
      "Postgres",
      "Prisma",
      "Docker",
      "React",
      "Tailwind CSS",
    ],
  },
  {
    id: 3,
    title: "Draw Together",
    description:
      "A collaborative drawing platform enabling real-time sketching and sharing with modern authentication and seamless user experience.",
    githubLink: "https://github.com/Kuntalmajee2557/excalidraw-project",
    direcLink: "",
    techStack: [
      "Turbo",
      "Postgres",
      "Prisma",
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    id:4,
    title: "Link Saver",
    description:
      "A Link Saver website helps users store, organize, and manage web links efficiently, providing easy access, categorization, and bookmarking features.",
    githubLink: "https://github.com/Kuntalmajee2557/greatStore",
    direcLink: "",
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: 5,
    title: "Portfolio",
    description:
      "A modern Next.js portfolio showcasing projects, skills, and experience with a responsive design, smooth navigation, and fast performance for an impressive presentation.",
    githubLink: "https://github.com/Kuntalmajee2557/kuntl.me",
    direcLink: "https://kuntlme.vercel.app/",
    techStack: ["React", "Tailwind CSS"],
  },
];
