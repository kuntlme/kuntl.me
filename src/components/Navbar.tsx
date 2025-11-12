"use client";
import {
  CloudAlert,
  Contact,
  FileUser,
  FlaskConical,
  House,
  LucideIcon,
  Sun,
} from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Logo from "@/app/favicon.ico";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Container from "./container";
import { cn } from "../../lib/utils";

interface Link {
  title: string;
  href: string;
  icon: LucideIcon;
}

const links: Link[] = [
  {
    title: "Home",
    href: "/",
    icon: House,
  },
  {
    title: "About",
    href: "/about",
    icon: FileUser,
  },
  {
    title: "Project",
    href: "/project",
    icon: FlaskConical,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Contact,
  },
];

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

  return (
    <Container className="relative py-8 flex-row fixed z-50 bg-zinc-900">
      <div
        className={cn(
          "leftItem flex justify-between items-center gap-0",
          "mx-0",
        )}
      >
        <Image
          src={Logo}
          width={30}
          height={30}
          alt="logo"
          className="mr-2 rounded-lg"
        />
        <p className="text-2xl font-[Quicksand] text-white font-extrabold tracking-wide">
          Kuntl
          <span className="text-cyan-400 text-2xl font-extrabold">.me</span>
        </p>
      </div>
      <div className="rightItem flex justify-between gap-6">
        <div className=" hidden md:flex justify-between items-center gap-6 border-stone-500 dark:border-stone-700 rounded-4xl px-1 py-1">
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
        <Link
          href="/cv"
          className={cn(
            "border flex justify-center items-center px-2 rounded-lg border-dotted border-neutral-500 text-md font-bold text-neutral-400",
            "cursor-pointer hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-700 transition-all duration-300 ease-in-out",
            "",
          )}
        >
          CV
        </Link>
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
      <div
        className={cn(
          "absolute inset-y-0 left-0 h-full w-px opacity-20",
          "bg-linear-to-b from-transparent to-neutral-500/50",
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 h-full w-px opacity-20",
          "bg-linear-to-b from-transparent to-neutral-500/50",
        )}
      />
    </Container>
  );
};

const MobileNavbar = () => {
  const pathname = usePathname();
  return (
    <div className="sm:hidden flex justify-evenly inset-x-0 bottom-0 fixed bg-zinc-900 py-2 border-t border-zinc-800/70">
      {Array.isArray(links) &&
        links.map((link, idx) => {
          const IconComponent = link.icon ?? CloudAlert;
          return (
            <Link
              key={idx}
              href={link.href}
              className={cn(
                "px-5 py-1 rounded-lg",
                pathname === link.href
                  ? "bg-cyan-600/20 border border-cyan-500"
                  : "bg-zinc-800",
              )}
            >
              <IconComponent
                size={25}
                className={cn(
                  "",
                  pathname === link.href
                    ? "text-gray-500 dark:text-cyan-200 font-semibold"
                    : "text-neutral-400 hover:text-neutral-200",
                )}
              />
            </Link>
          );
        })}
    </div>
  );
};

export { Navbar, MobileNavbar };
