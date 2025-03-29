import React from "react";
import { GithubStats } from "./githubStats";
import GithubInfo from "./githubInfo";
import Techstack from "./techstack";
import { ArrowRight } from "lucide-react";
const homeAbout = () => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mt-10 mb-5">About</h1>
      <div className="grid grid-cols-2 gap-4">
        <Techstack />
        <GithubInfo />
        <GithubStats />
      </div>
      <div className="flex justify-center items-center gap-2 text-zinc-300 my-10">
        <p className="text-gray-100 text-sm font-medium flex items-center cursor-pointer">
          See more <ArrowRight size={16} className="ml-1" />
        </p>
      </div>
    </div>
  );
};

export default homeAbout;
