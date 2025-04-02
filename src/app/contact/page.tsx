import React from "react";
import { FaEnvelope, FaTwitter, FaCalendar } from "react-icons/fa";

const page = () => {
  return (
    <div className="bg-zinc-900 flex flex-col min-h-screen">
      <section className="container mt-30">
        <h1 className="mb-3 text-7xl text-transparent text-outline font-bold">
          Contact Me
        </h1>
        <p className="text-gray-300 border-l-4 border-zinc-700 pl-4 mb-7">
          I&apos;m always looking for new opportunities to learn and grow. If you have
          any questions or would like to collaborate, please feel free to
          reach out.
        </p>
        <div className="flex flex-col items-start gap-4 mb-8">
          <a href="mailto:kuntalmajee338@gmail.com" target="_blank" className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 duration-300">
            <FaEnvelope /> kuntalmajee338@gmail.com
          </a>
          <a 
            href="https://twitter.com/Kuntlmajee" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex justify-center items-center gap-2 text-gray-300 hover:text-cyan-400 duration-300"
          >
            <FaTwitter /> Kuntlmajee
            <span className="text-sm text-gray-400 ml-2">•  Send me direct message and follow me for tech updates and development tips</span>
          </a>
          <a 
            href="https://cal.com/cse-66-kuntal-majee-rstgpn/15min" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex justify-center items-center gap-2 text-gray-300 hover:text-cyan-400 duration-300"
          >
            <FaCalendar /> Schedule a meeting
            <span className="text-sm text-gray-400 ml-2">• Book a 30-minute call with me</span>
          </a>
        </div>
            
      </section>
    </div>
  );
};

export default page;
