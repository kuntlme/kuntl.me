"use client";
import Hero from "@/components/hero";
import HomeAbout from "@/components/homeAbout";
import HomeProject from "@/components/homeproject";
import { cn } from "../../lib/utils";

export default function Home() {
  return (
    <>
      {/* <div className={cn("pt-72 h-2xl bg-blue-500 text-white")}>sdf</div> */}
      <div className={cn("relative w-full mx-auto")}>
        <Hero />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-px w-full",
            "bg-linear-to-r from-transparent via-neutral-500/50 to-transparent",
          )}
        />
      </div>

      <div className={cn("relative w-full mx-auto")}>
        <HomeAbout />
      </div>
      <section className="container">
        <HomeProject />
      </section>
    </>
  );
}
