import Card from "@/components/card";
import { Project, projects } from "@/data/project";
import React from "react";
import { cn } from "../../../lib/utils";
import Container from "@/components/container";
import { LeftLine, RightLine, VerticleLine } from "@/components/lines";

const page = () => {
  return (
    <div className={cn("relative w-full mx-auto")}>
      <Container className="relative px-6 pt-32 pb-10 sm:pb-32 flex flex-col justify-start items-center">
        <h1 className="mb-3 text-7xl text-center sm:text-start text-transparent text-outline font-bold w-full">
          My Projects
        </h1>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-10">
          {projects.map((project: Project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              githubLink={project.githubLink}
              direcLink={project.direcLink}
              techStack={project.techStack}
            />
          ))}
        </div>
        <LeftLine />
        <RightLine />
      </Container>
      <VerticleLine className="" />
    </div>
  );
};

export default page;
