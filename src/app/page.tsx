"use client";
import Hero from "@/components/hero";
import HomeAbout from "@/components/homeAbout";
import HomeProject from "@/components/homeproject";
import { cn } from "../../lib/utils";
import { VerticleLine } from "@/components/lines";

export default function Home() {
  return (
    <>
      {/* <div className={cn("pt-72 h-2xl bg-blue-500 text-white")}>sdf</div> */}
      <div className={cn("relative w-full mx-auto")}>
        <Hero />
        <VerticleLine />
      </div>

      <div className={cn("relative w-full mx-auto")}>
        <HomeAbout />
        <VerticleLine />
      </div>

      <div className={cn("relative w-full mx-auto")}>
        <HomeProject />
        <VerticleLine />
      </div>
    </>
  );
}
