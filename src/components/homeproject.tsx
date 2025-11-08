import React from "react";
import Card from "./card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { homeProjects } from "@/data/project";
import { Project } from "@/data/project";
import Container from "./container";
import { LeftLine, RightLine } from "./lines";
const HomeProject = () => {
  return (
    <Container className="relative px-6 mb-10 sm:mb-24 sm:pb-4">
      <h1 className="text-4xl text-center sm:text-start w-full font-extrabold text-gray-700 dark:text-white my-10">
        Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {homeProjects.map((project: Project) => (
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
      <div className="flex justify-center items-center gap-2 text-zinc-300 my-10">
        <Link
          href="/project"
          className="cursor-pointer text-zinc-700 dark:text-gray-100 hover:text-green-600 dark:hover:text-cyan-400 hover:scale-125 duration-300"
        >
          <p className=" text-sm font-medium flex items-center cursor-pointer">
            See more <ArrowRight size={16} className="ml-1" />
          </p>
        </Link>
      </div>
      <LeftLine />
      <RightLine />
    </Container>
  );
};

export default HomeProject;
