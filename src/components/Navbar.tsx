"use client"
import { Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed py-8 px-[35rem] w-full bg-zinc-900 text-md font-semibold text-white flex justify-between items-center z-50">
      <div className="text-2xl font-[Quicksand] text-white font-extrabold">Kuntl<span className="text-cyan-400">.me</span></div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-6 border border-stone-700 rounded-4xl px-6">
          <Link href="/" className={`${pathname == '/' ? "text-cyan-400 font-normal border-b border-cyan-600" : "text-white font-semibold"} cursor-pointer py-1`}>Home</Link>
          <Link href="/about" className={`${pathname == '/about'? "text-cyan-400 font-normal border-b border-cyan-600" : "text-white font-semibold"} cursor-pointer py-1`}>About</Link>
          <Link href="/project" className={`${pathname == '/project'? "text-cyan-400 font-normal border-b border-cyan-600" : "text-white font-semibold"} cursor-pointer py-1`}>Project</Link>
          <Link href="/contact" className={`${pathname == '/contact'? "text-cyan-400 font-normal border-b border-cyan-600" : "text-white font-semibold"} cursor-pointer py-1`}>Contact</Link>
        </div>
        <div className="align-center text-2xl flex items-center justify-center border border-cyan-400 rounded-2xl w-10 h-8">
          <Sun size={15} className="text-cyan-400"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
