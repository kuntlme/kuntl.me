"use client";
import Hero from "@/components/hero";
import HomeAbout from "@/components/homeAbout";
import HomeProject from "@/components/homeproject";

export default function Home() {
  return (
    <div className="bg-gray-200 dark:bg-zinc-900 flex flex-col max-h-screen">
      {/* <div className={cn("pt-72 h-2xl bg-blue-500 text-white")}>sdf</div> */}
      <section className="container">
        <Hero />
      </section>

      <section className="container">
        <HomeAbout />
      </section>

      <section className="container">
        <HomeProject />
      </section>
    </div>
  );
}
