import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";
import Container from "./container";
import { cn } from "../../lib/utils";

const Footer = () => {
  return (
    <Container className="relative bg-gray-200 dark:bg-zinc-900">
      <div className="container bg-gray-200 dark:bg-zinc-900 text-gray-200 w-full flex flex-col items-center justify-center gap-2 py-5">
        <div className="flex justify-center items-center gap-6 mb-2">
          <a href="mailto:kuntalmajee338@gmail.com" target="_blank">
            <Mail
              size={20}
              className="cursor-pointer text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-cyan-400 hover:scale-125 duration-300"
            />
          </a>
          <a href="https://github.com/kuntlme" target="_blank">
            <Github
              size={20}
              className="cursor-pointer text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-cyan-400 hover:scale-125 duration-300"
            />
          </a>
          <a href="https://twitter.com/Kuntlmajee" target="_blank">
            <Twitter
              size={20}
              className="cursor-pointer text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-cyan-400 hover:scale-125 duration-300"
            />
          </a>
          <a href="https://www.linkedin.com/in/kuntal-majee/" target="_blank">
            <Linkedin
              size={20}
              className="cursor-pointer text-gray-500 dark:text-white hover:text-green-600 dark:hover:text-cyan-400 hover:scale-125 duration-300"
            />
          </a>
        </div>
        <hr className="border-zinc-400 dark:border-zinc-700 w-full " />
        <div className="w-full flex justify-between items-center">
          <p className="text-gray-500 dark:text-white">
            @2025 <span className="text-gray-400">--- </span>he
            <span className="text-gray-400">/</span>him
          </p>
          <a href="https://github.com/Kuntalmajee2557/kuntl.me" target="_blank">
            <p className="cursor-pointer flex justify-center items-center gap-1 text-gray-500 dark:text-white border-zinc-700 underline underline-offset-2 decoration-2 decoration-gray-400 dark:decoration-gray-700">
              <Github size={16} className="cursor-pointer" />
              kuntal.dev
            </p>
          </a>
        </div>
      </div>
    </Container>
  );
};

const FooterComponent = () => {
  return (
    <div className="relative w-full max-w-4xl">
      <Footer />
      <div
        className={cn(
          "absolute inset-y-0 left-0 h-full w-px opacity-20",
          "bg-linear-to-b to-transparent from-neutral-500/50",
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 h-full w-px opacity-20",
          "bg-linear-to-b to-transparent from-neutral-500/50",
        )}
      />
    </div>
  );
};

export default FooterComponent;
