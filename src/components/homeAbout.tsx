import React from "react";
import { GithubStats } from "./githubStats";
import GithubInfo from "./githubInfo";
import Techstack from "./techstack";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "./container";
import { cn } from "../../lib/utils";
const homeAbout = () => {
  return (
    <Container className={cn("relative px-6")}>
      <h1 className="text-4xl font-extrabold text-gray-700 dark:text-white mt-10 mb-5 text-start w-full">
        About Me
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <Techstack />
        <GithubInfo />
        <GithubStats />
      </div>
      <div className="flex justify-center items-center gap-2 text-zinc-300 my-10">
        <Link
          href="/about"
          className="cursor-pointer text-zinc-700 dark:text-gray-100 hover:text-green-600 dark:hover:text-cyan-400 hover:scale-125 duration-300"
        >
          <p className="text-sm font-medium flex items-center cursor-pointer">
            See more <ArrowRight size={16} className="ml-1" />
          </p>
        </Link>
      </div>

      <div
        className={cn(
          "absolute inset-y-0 left-0 h-full w-px",
          "bg-neutral-500/50",
        )}
      />

      <div
        className={cn(
          "absolute inset-y-0 right-0 h-full w-px",
          "bg-neutral-500/50",
        )}
      />
    </Container>
  );
};

export default homeAbout;
