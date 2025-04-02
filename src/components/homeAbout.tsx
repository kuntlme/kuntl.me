import React from "react";
import { GithubStats } from "./githubStats";
import GithubInfo from "./githubInfo";
import Techstack from "./techstack";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const homeAbout = () => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mt-10 mb-5">About Me</h1>
      <div className="grid grid-cols-2 gap-4">
        <Techstack />
        <GithubInfo />
        <GithubStats />
      </div>
      <div className="flex justify-center items-center gap-2 text-zinc-300 my-10">
        <Link href="/about" className='cursor-pointer text-gray-100 hover:text-cyan-400 hover:scale-125 duration-300'>
        <p className="text-sm font-medium flex items-center cursor-pointer">
          See more <ArrowRight size={16} className="ml-1" />
        </p>
        </Link>
      </div>
    </div>
  );
};

export default homeAbout;
