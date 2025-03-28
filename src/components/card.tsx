import { Fence } from "lucide-react";
import React from "react";

const Card = () => {
  return (
    <div className="border border-slate-600 px-5 py-10 rounded-lg text-white col-span-1">
      <Fence size={28} />
      <p className="text-gray-300 pt-7">
        A Link Saver website helps users store, organize, and manage web links
        efficiently, providing easy access, categorization, and bookmarking
        features.
      </p>
      <div className="flex flex-wrap mt-2">
        <p className="leading-5 mb-2 border border-zinc-700 text-gray-300 rounded-md text-xs italic mr-2 px-1">Turbo</p>
        <p className="leading-5 mb-2 border border-zinc-700 text-gray-300 rounded-md text-xs italic mr-2 px-1">Turbo</p>
        <p className="leading-5 mb-2 border border-zinc-700 text-gray-300 rounded-md text-xs italic mr-2 px-1">Turbo</p>
        <p className="leading-5 mb-2 border border-zinc-700 text-gray-300 rounded-md text-xs italic mr-2 px-1">Turbo</p>
        <p className="leading-5 mb-2 border border-zinc-700 text-gray-300 rounded-md text-xs italic mr-2 px-1">Turbo</p>
        
        <p className="leading-5 mb-2 border border-zinc-700 text-gray-300 rounded-md text-xs italic mr-2 px-1">Turbo</p>

      </div>
    </div>
  );
};

export default Card;
