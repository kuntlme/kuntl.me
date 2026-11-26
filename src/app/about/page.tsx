import Container from "@/components/container";
import { LeftLine, RightLine, VerticleLine } from "@/components/lines";
import React from "react";
import { cn } from "../../../lib/utils";

const page = () => {
  return (
    <div className={cn("relative w-full mx-auto pb-10 sm:pb-0")}>
      <Container className="relative px-6 pt-32 sm:h-screen flex flex-col justify-start items-center">
        <h1 className="mb-3 text-7xl text-center sm:text-start text-transparent text-outline font-bold w-full border">
          About Me
        </h1>
        <p className="text-zinc-700 dark:text-gray-300 border-l-4 border-zinc-400 dark:border-zinc-700 pl-4">
          👋 Hi there! I&apos;m Kuntal, a passionate <strong>B.Tech</strong>{" "}
          student in <strong>Computer Science and Engineering</strong> who loves{" "}
          <strong>web development</strong>.
        </p>
        <p className="text-zinc-700 dark:text-gray-300 border-l-4 border-zinc-400 dark:border-zinc-700 pl-4 mb-2 sm:mb-5">
          I am a <strong>full-stack developer</strong> specializing in{" "}
          <strong>Next.js</strong>, <strong>React</strong>,{" "}
          <strong>Node.js</strong>, and <strong>TypeScript</strong>, with
          experience building <strong>scalable backend systems</strong> and
          real-time applications using <strong>WebSockets</strong>. Skilled in
          developing and deploying modern web applications using{" "}
          <strong>Docker</strong>, <strong>Kubernetes</strong> and cloud
          infrastructure. Active <strong>open-source contributor</strong>{" "}
          focused on performance, developer experience, and clean architecture.
        </p>
        <div className="flex flex-col">
          <div className="flex border-l-2 border-green-600 dark:border-cyan-400 gap-1">
            <div className="relative -left-3 top-0 w-6 h-6 bg-green-600 dark:bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-green-600 dark:text-cyan-400 text-2xl font-bold">
                2026
              </h1>
              <p className="text-zinc-700 dark:text-gray-300">
                Expanding into <strong>AI Engineering</strong> and <strong>Web3</strong>
                , learning about <strong>System Design</strong>,{" "}
                focusing on <strong>distributed system</strong> and its internal architecture.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-green-600 dark:border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-green-600 dark:bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-green-600 dark:text-cyan-400 text-2xl font-bold">
                2025
              </h1>
              <p className="text-zinc-700 dark:text-gray-300">
                Expanding into <strong>DevOps</strong> and <strong>Web3</strong>
                , learning about <strong>CI/CD</strong>,{" "}
                <strong> Docker</strong>,<strong> Kubernetes</strong>, and{" "}
                <strong>blockchain development</strong>.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-green-600 dark:border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-green-600 dark:bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-green-600 dark:text-cyan-400 text-2xl font-bold">
                2024
              </h1>
              <p className="text-zinc-700 dark:text-gray-300">
                Worked on <strong>real-world projects</strong>, participated in
                hackathons, and focused on <strong>Backend Development</strong>{" "}
                (Next.js, TypeScript), <strong>Databases</strong> (MongoDB,
                PostgreSQL), and <strong>Cloud Technologies</strong>.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-green-600 dark:border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-green-600 dark:bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-green-600 dark:text-cyan-400 text-2xl font-bold">
                2023
              </h1>
              <p className="text-zinc-700 dark:text-gray-300">
                Built foundational projects, explored{" "}
                <strong>Full-Stack Development </strong>( React.js, Express.js,
                Node.js, MongoDB ) and deepened <strong>DSA</strong> skills.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-green-600 dark:border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-green-600 dark:bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-1 w-11/12">
              <h1 className="text-green-600 dark:text-cyan-400 text-2xl font-bold">
                2022
              </h1>
              <p className="text-zinc-700 dark:text-gray-300">
                Started learning <strong>Web Development</strong> with{" "}
                <strong>HTML, CSS, JS</strong> and{" "}
                <strong>Data Structures & Algorithms</strong> (DSA) in{" "}
                <strong>C++</strong>.
              </p>
            </div>
          </div>
        </div>
        <LeftLine />
        <RightLine />
      </Container>
      <VerticleLine className="" />
    </div>
  );
};

export default page;
