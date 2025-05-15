import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-between items-start pt-20">
      <div className="">
        <h1 className="text-5xl font-sans font-bold text-gray-700 dark:text-white mb-2">Myself, Kuntal</h1>
        <p className="text-md font-sans text-zinc-700 dark:text-zinc-400">
          As a <span className="text-cyan-400 font-bold bg-gray-300 dark:bg-zinc-700 px-2 py-1">Full Stack</span> Developer building websites.
        </p>
        <br />
        <p className="text-md font-sans text-zinc-700 dark:text-zinc-400 mb-2">Exploring new technologies and creating web experiences, while continuously learning and growing as a developer.</p>
        <hr className="border-zinc-400 dark:border-zinc-700 w-1/2 "/>
        <p className="text-md font-sans text-zinc-700 dark:text-zinc-400 mt-2">Find me on <a href="https://x.com/Kuntlmajee" target="_blank"><span className="text-cyan-400 font-semibold cursor-pointer">twitter</span></a> for tech updates.</p>
      </div>
      <div className="relative h-20 w-20 rounded-sm">
        <div className="absolute -bottom-2 -right-2 h-full w-full border-2 border-cyan-400"></div>
        <div className="absolute -top-2 -left-2 h-full w-full border-2 border-cyan-400"></div>
        <Image 
          src="/me.jpeg" 
          alt="my-image" 
          fill 
          className="rounded-sm relative z-10 object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
