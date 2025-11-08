import { CloudAlert, Github, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";
import Container from "./container";
import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";

interface Link {
  title: string;
  href: string;
  icon: LucideIcon;
}

const Footer = () => {
  const links: Link[] = [
    {
      title: "Gmail",
      href: "mailto:kuntalmajee338@gmail.com",
      icon: Mail,
    },
    {
      title: "Github",
      href: "https://github.com/kuntlme",
      icon: Github,
    },
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/in/kuntal-majee/",
      icon: Linkedin,
    },
    {
      title: "X",
      href: "https://twitter.com/Kuntlmajee",
      icon: Twitter,
    },
  ];
  return (
    <Container className="relative sm:absolute inset-x-0 bottom-12 sm:bottom-0 pb-48 sm:pb-2 bg-gray-200 dark:bg-zinc-900 mt-10 py-2 gap-2">
      <div className="w-full flex justify-evenly sm:justify-center items-center gap-4 mb-2">
        {Array.isArray(links) &&
          links.map((link, idx) => {
            const IconComponent = link.icon ?? CloudAlert;
            return (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                className="group px-6 py-2 bg-cyan-300/10 sm:bg-none border-cyan-300/20 sm:border-none sm:p-2 sm:hover:bg-cyan-600/10 rounded-full transition-all ease-in-out duration-300"
              >
                <IconComponent
                  size={20}
                  className="cursor-pointer text-gray-500 dark:text-neutral-400 sm:dark:text-neutral-300 group-hover:text-green-600 dark:group-hover:text-cyan-400 group-hover:scale-110 duration-300"
                />
              </a>
            );
          })}
        {/*
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
        */}
      </div>
      <hr className="hidden sm:block border-zinc-400 dark:border-zinc-700 w-full opacity-40" />
      <div className="w-full flex px-5 sm:px-0 justify-between items-center">
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
    </Container>
  );
};

export default Footer;
