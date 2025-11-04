"use client";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Logo from "@/app/favicon.ico";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "./container";
import { cn } from "../../lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-shceme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (/* _: MediaQueryListEvent */) => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const SWITCH_THEME = () => {
    switch (theme) {
      case "light": {
        setTheme("dark");
        return;
      }
      case "dark": {
        setTheme("light");
        return;
      }
      case "system": {
        setTheme(systemTheme === "dark" ? "light" : "dark");
        return;
      }
    }
  };

  // Ensure the component is mounted before rendering to prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Project",
      href: "/project",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return (
    // <div className="fixed py-8 px-[35rem] w-full bg-gray-200  dark:bg-zinc-900 text-md font-semibold text-white flex justify-center items-center z-50">
    //   <Image src={Logo} width={20} height={10} alt="logo" className="mr-2" />
    //   <div className="flex justify-between items-center gap-70">
    //     <div className="text-2xl font-[Quicksand] text-gray-600 dark:text-white font-extrabold flex">
    //       Kuntl<span className="text-green-600 dark:text-cyan-400">.me</span>
    //     </div>
    //     <div className="flex items-center gap-4">
    //       <div className="flex items-center gap-6 border border-stone-500 dark:border-stone-700 rounded-4xl px-6">
    //         <Link
    //           href="/"
    //           className={`${
    //             pathname == "/"
    //               ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
    //               : "text-gray-500 dark:text-white font-semibold"
    //           } cursor-pointer py-1`}
    //         >
    //           Home
    //         </Link>
    //         <Link
    //           href="/about"
    //           className={`${
    //             pathname == "/about"
    //               ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
    //               : "text-gray-500 dark:text-white font-semibold"
    //           } cursor-pointer py-1`}
    //         >
    //           About
    //         </Link>
    //         <Link
    //           href="/project"
    //           className={`${
    //             pathname == "/project"
    //               ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
    //               : "text-gray-500 dark:text-white font-semibold"
    //           } cursor-pointer py-1`}
    //         >
    //           Project
    //         </Link>
    //         <Link
    //           href="/contact"
    //           className={`${
    //             pathname == "/contact"
    //               ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
    //               : "text-gray-500 dark:text-white font-semibold"
    //           } cursor-pointer py-1`}
    //         >
    //           Contact
    //         </Link>
    //       </div>
    //       <button
    //         className="align-center text-2xl flex items-center justify-center border border-green-600 dark:border-cyan-400 rounded-2xl w-10 h-8"
    //         onClick={() => {
    //           setTheme(theme === "dark" ? "light" : "dark");
    //         }}
    //       >
    //         {theme == "light" ? (
    //           <Sun size={15} className="text-green-600" />
    //         ) : (
    //           <Moon size={15} className="text-cyan-400" />
    //         )}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <Container className="py-8">
      <div className="w-full flex justify-between items-center">
        <div className="leftItem flex justify-between items-center gap-0">
          <Image
            src={Logo}
            width={30}
            height={30}
            alt="logo"
            className="mr-2 rounded-lg"
          />
          <p className="text-2xl font-[Quicksand] text-white font-extrabold tracking-wide">
            Kuntl
            <span className="text-cyan-400 text-2xl font-semibold">.me</span>
          </p>
        </div>
        <div className="rightItem flex justify-between gap-1">
          <div className="flex justify-between items-center gap-6 border-stone-500 dark:border-stone-700 rounded-4xl px-6 py-1">
            {Array.isArray(links) &&
              links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className={cn(
                    "hover:scale-110 transition-all duration-300 ease-in-out relative",
                    pathname === link.href
                      ? "text-gray-500 dark:text-cyan-400 font-semibold"
                      : "text-neutral-400 hover:text-neutral-200",
                  )}
                >
                  {link.title}
                  {pathname === link.href && (
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-r from-transparent via-cyan-400 to-transparent h-px w-full" />
                  )}
                </Link>
              ))}
          </div>
          <button
            className="cursor-pointer relative align-center text-2xl flex items-center justify-center border border-green-600 dark:border-cyan-400 rounded-2xl w-10 h-8"
            onClick={SWITCH_THEME}
          >
            <Sun
              size={15}
              className="absolute text-green-600 scale-100 dark:scale-0 dark:rotate-180 transition-all duration-300 ease-in-out"
            />
            <Moon
              size={15}
              className="absolute dark:text-cyan-400 scale-0 dark:scale-100 transition-all duration-300 ease-in-out"
            />
            {/* {theme == "light" ? (
              <Sun size={15} className="text-green-600 dark:scale-0 scale-1 transition-all duration-300 ease-in-out"/>
            ) : (
              <Moon size={15} className="dark:text-cyan-400 scale-0 dark:scale-1 transition-all duration-300 ease-in-out"/>
            )} */}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
