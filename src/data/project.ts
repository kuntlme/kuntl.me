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
    id: 2,
    title: "Link Saver",
    description:
      "A Link Saver website helps users store, organize, and manage web links efficiently, providing easy access, categorization, and bookmarking features.",
    githubLink: "https://github.com/Kuntalmajee2557/greatStore",
    direcLink: "",
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
];

export const projects: Project[] = [
  {
    id: 1,
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
    id: 2,
    title: "Link Saver",
    description:
      "A Link Saver website helps users store, organize, and manage web links efficiently, providing easy access, categorization, and bookmarking features.",
    githubLink: "https://github.com/Kuntalmajee2557/greatStore",
    direcLink: "",
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: 3,
    title: "Chess App",
    description:
      "A chess application that allows users to play chess online with friends, featuring real-time multiplayer functionality, user authentication, and a sleek interface.",
    githubLink: "https://github.com/kuntlme/chess-app",
    direcLink: "",
    techStack: ["React", "Tailwind CSS", "TypeScript", "Websocket"],
  },
  {
    id: 4,
    title: "Portfolio",
    description:
      "A modern Next.js portfolio showcasing projects, skills, and experience with a responsive design, smooth navigation, and fast performance for an impressive presentation.",
    githubLink: "https://github.com/Kuntalmajee2557/kuntl.me",
    direcLink: "https://kuntlme.vercel.app/",
    techStack: ["React", "Tailwind CSS"],
  },
  {
    id: 5,
    title: "Currency Converter",
    description:
      "A simple React currency converter that provides real-time exchange rates, allowing users to convert between multiple currencies with a user-friendly interface.",
    githubLink: "https://github.com/Kuntalmajee2557/Currency-Converter",
    direcLink: "https://currency-converter-ivory-psi.vercel.app/",
    techStack: ["React", "Tailwind CSS"],
  },
];
