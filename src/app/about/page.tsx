import React from "react";

const page = () => {
  return (
    <div className="bg-zinc-900 flex flex-col min-h-screen">
      <section className="container mt-30">
        <h1 className="mb-3 text-7xl text-transparent text-outline font-bold">
          About
        </h1>
        <p className="text-gray-300 mb-7">
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
                Expanding into DevOps and Web3, learning about CI/CD, Docker,
                Kubernetes, and blockchain development.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2024</h1>
              <p className="text-gray-300">
                Worked on real-world projects, participated in hackathons, and
                focused on Backend Development, Databases, and Cloud
                Technologies.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2023</h1>
              <p className="text-gray-300">
                Built foundational projects, explored Full-Stack Development
                (MERN, Next.js), and deepened DSA skills.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-1 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2022</h1>
              <p className="text-gray-300">
                Started learning Web Development with HTML, CSS, JS and Data Structures &
                Algorithms (DSA) in C++.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
