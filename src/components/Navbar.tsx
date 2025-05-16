"use client";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering to prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed py-8 px-[35rem] w-full bg-gray-200  dark:bg-zinc-900 text-md font-semibold text-white flex justify-center items-center z-50">
      <div className="flex justify-between items-center gap-70">
        <div className="text-2xl font-[Quicksand] text-gray-600 dark:text-white font-extrabold">
          Kuntl<span className="text-green-600 dark:text-cyan-400">.me</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 border border-stone-500 dark:border-stone-700 rounded-4xl px-6">
            <Link
              href="/"
              className={`${
                pathname == "/"
                  ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
                  : "text-gray-500 dark:text-white font-semibold"
              } cursor-pointer py-1`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${
                pathname == "/about"
                  ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
                  : "text-gray-500 dark:text-white font-semibold"
              } cursor-pointer py-1`}
            >
              About
            </Link>
            <Link
              href="/project"
              className={`${
                pathname == "/project"
                  ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
                  : "text-gray-500 dark:text-white font-semibold"
              } cursor-pointer py-1`}
            >
              Project
            </Link>
            <Link
              href="/contact"
              className={`${
                pathname == "/contact"
                  ? "text-green-600 dark:text-cyan-400 font-normal border-b border-cyan-600"
                  : "text-gray-500 dark:text-white font-semibold"
              } cursor-pointer py-1`}
            >
              Contact
            </Link>
          </div>
          <button
            className="align-center text-2xl flex items-center justify-center border border-green-600 dark:border-cyan-400 rounded-2xl w-10 h-8"
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme == "light" ? (
              <Sun size={15} className="text-green-600" />
            ) : (
              <Moon size={15} className="text-cyan-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
