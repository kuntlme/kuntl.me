"use client";
import React from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPrisma,
  SiPostgresql,
  SiTurborepo,
} from "react-icons/si";

const MarqueeStack = () => {
  const techStack = [
    { icon: <SiTypescript className="h-6 w-6" />, name: "TypeScript" },
    { icon: <SiReact className="h-6 w-6" />, name: "React" },
    { icon: <SiNextdotjs className="h-6 w-6" />, name: "Next.js" },
    { icon: <SiTurborepo className="h-6 w-6" />, name: "Turborepo" },
    { icon: <SiTailwindcss className="h-6 w-6" />, name: "Tailwind" },
    { icon: <SiNodedotjs className="h-6 w-6" />, name: "Node.js" },
    { icon: <SiMongodb className="h-6 w-6" />, name: "MongoDB" },
    { icon: <SiPrisma className="h-6 w-6" />, name: "Prisma" },
    { icon: <SiPostgresql className="h-6 w-6" />, name: "PostgreSQL" },
  ];

  return (
    <div className="w-full col-span-2 border border-zinc-400 dark:border-slate-600 rounded-md p-4 flex justify-center items-center hover:border-green-600 dark:hover:border-cyan-400 hover:scale-105 duration-300">
<div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {techStack.map((tech, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-zinc-700 dark:text-gray-400 hover:text-green-600 dark:hover:text-cyan-400 transition-colors duration-300"
          >
            {tech.icon}
            <span>{tech.name}</span>
          </li>
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {techStack.map((tech, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-zinc-700 dark:text-gray-400 hover:text-green-600 dark:hover:text-cyan-400 transition-colors duration-300"
          >
            {tech.icon}
            <span>{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
};

// Add this style block in the same file
const styles = `
  @keyframes infinite-scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .animate-infinite-scroll {
    animation: infinite-scroll 25s linear infinite;
  }

  /* Optional: Pause on Hover */
  .infinite-scroll-wrapper:hover .animate-infinite-scroll {
    animation-play-state: paused;
  }
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default MarqueeStack;
