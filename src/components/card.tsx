import { Github, MoveUpRight } from "lucide-react";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  githubLink: string;
  direcLink: string;
  techStack: string[];
}

const Card = ({
  title,
  description,
  githubLink,
  direcLink,
  techStack,
}: CardProps) => {
  return (
    <div className="border border-slate-600 hover:border-cyan-400 hover:scale-105 duration-300 px-5 py-10 rounded-lg text-white col-span-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="flex items-center justify-center gap-2">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <Github
              size={20}
              className="cursor-pointer hover:text-cyan-400  duration-300"
            />
          </a>
          {direcLink && (
            <a href={direcLink} target="_blank" rel="noopener noreferrer">
              <MoveUpRight
                size={20}
                className="cursor-pointer hover:text-cyan-400 hover:scale-125 duration-300"
              />
            </a>
          )}
        </div>
      </div>
      <p className="text-gray-300 pt-5">{description}</p>
      <div className="flex flex-wrap mt-2">
        {techStack.map((stack) => (
          <p
            key={stack}
            className="leading-5 mb-2 border border-zinc-700 text-gray-300 rounded-md text-xs italic mr-2 px-1"
          >
            {stack}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Card;
