import { Sun } from "lucide-react";
import Link from "next/link";
import React from "react";


const Navbar = () => {
  return (
    <div className="fixed py-8 px-[35rem] w-full bg-zinc-900 text-md font-semibold text-white flex justify-between items-center z-50">
      <div>logo</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-6 border border-stone-700 rounded-4xl px-6 py-1">
          <Link href="/" className="text-cyan-400 cursor-pointer font-normal">Home</Link>
          <Link href="/about" className="cursor-pointer">About</Link>
          <Link href="/project" className="cursor-pointer">Project</Link>
          <Link href="/contact" className="cursor-pointer">Contact</Link>
        </div>
        <div className="align-center text-2xl flex items-center justify-center border border-cyan-400 rounded-2xl w-10 h-8">
          <Sun size={15} className="text-cyan-400"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
