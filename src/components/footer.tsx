import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-zinc-900">
      <div className="container bg-zinc-900 text-gray-200 w-full flex flex-col items-center justify-center gap-2 py-5">
        <div className="flex justify-center items-center gap-6 mb-2">
          <a href="mailto:kuntalmajee338@gmail.com" target="_blank">
          <Mail size={20} className="cursor-pointer hover:text-cyan-400 hover:scale-125 duration-300" />
          </a>
          <a href="https://github.com/kuntlme" target="_blank">
          <Github size={20} className="cursor-pointer hover:text-cyan-400 hover:scale-125 duration-300" />
          </a>
          <a href="https://twitter.com/Kuntlmajee" target="_blank">
          <Twitter size={20} className="cursor-pointer hover:text-cyan-400 hover:scale-125 duration-300" />
          </a>
          <a href="https://www.linkedin.com/in/kuntal-majee/" target="_blank">
          <Linkedin size={20} className="cursor-pointer hover:text-cyan-400 hover:scale-125 duration-300" />
          </a>
        </div>
        <hr className="border-zinc-700 w-full " />
        <div className="w-full flex justify-between items-center">
          <p>
            @2025 <span className="text-gray-400">--- </span>he
            <span className="text-gray-400">/</span>him
          </p>
          <a href="https://github.com/Kuntalmajee2557/kuntl.me" target="_blank">
            <p className="cursor-pointer flex justify-center items-center gap-1 border-zinc-700 underline underline-offset-2 decoration-2 decoration-gray-700">
              <Github size={16} className="cursor-pointer" />
              kuntal.dev
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
