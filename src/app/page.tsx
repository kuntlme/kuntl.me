import Hero from "@/components/hero";
import HomeAbout from "@/components/homeAbout";
import HomeProject from "@/components/homeproject";

export default function Home() {
  return (
    // <div className="bg-gradient-to-b from-black to-slate-950 flex flex-col min-h-screen">
    <div className="bg-zinc-900 flex flex-col min-h-screen">
      <section className="container mt-20">
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
