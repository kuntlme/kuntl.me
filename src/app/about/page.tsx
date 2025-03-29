import React from "react";

const page = () => {
  return (
    <div className="bg-zinc-900 flex flex-col min-h-screen">
      <section className="container mt-30">
        <h1 className="mb-3 text-7xl text-transparent text-outline font-bold">
          About
        </h1>
        <p className="text-gray-300 mb-7 border-l-4 border-stone-700 pl-4">
          I am Kuntal, a passionate full-stack web developer with expertise in
          building scalable and efficient web applications. I specialize in
          front-end and back-end development, leveraging modern technologies to
          create seamless user experiences. With a strong foundation in web
          frameworks, databases, and cloud integration, I strive to deliver
          high-quality solutions that solve real-world problems.
        </p>
        <div className="flex flex-col">
          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-0 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2025</h1>
              <p className="text-gray-300">
                Expanding into <strong>DevOps</strong> and <strong>Web3</strong>, learning about <strong>CI/CD</strong>, <strong> Docker</strong>,
                <strong> Kubernetes</strong>, and <strong>blockchain development</strong>.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2024</h1>
              <p className="text-gray-300">
                Worked on <strong>real-world projects</strong>, participated in hackathons, and
                focused on <strong>Backend Development</strong>, <strong>Databases</strong>, and <strong>Cloud Technologies</strong>.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2023</h1>
              <p className="text-gray-300">
                Built foundational projects, explored <strong>Full-Stack Development </strong>
                (MERN, Next.js), and deepened <strong>DSA</strong> skills.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-1 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2022</h1>
              <p className="text-gray-300">
                Started learning <strong>Web Development</strong> with <strong>HTML, CSS, JS</strong> and <strong>Data Structures & Algorithms</strong> (DSA) in <strong>C++</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
