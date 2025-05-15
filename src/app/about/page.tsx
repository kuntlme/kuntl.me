import React from "react";

const page = () => {
  return (
    <div className="bg-gray-200 dark:bg-zinc-900 flex flex-col">
      <section className="container mt-30">
        <h1 className="mb-3 text-7xl dark:text-white text-transparent text-outline font-bold">
          About Me
        </h1>
        <p className="text-gray-300 border-l-4 border-zinc-700 pl-4">
          👋 Hi there! I&apos;m Kuntal, a passionate <strong>B.Tech</strong> student
          in <strong>Computer Science and Engineering</strong> who loves{" "}
          <strong>web development</strong>.
        </p>
        <br />
        <p className="text-gray-300 border-l-4 border-zinc-700 pl-4">
          I&apos;m a Full Stack Engineer. I am 21 and learning{" "}
          <strong>
            TypeScript, Next.js, React.js, Node.js, and database management
          </strong>
          . Now, I have a passion for learning UI/UX.
        </p>
        <br />
        <p className="text-gray-300 mb-7 border-l-4 border-zinc-700 pl-4">
          I love using <strong>Next.js</strong> to create a website. Then use <strong>GitHub</strong> to host my
          codebase. After that, I use <strong>Vercel</strong> to deploy my website.
        </p>
        <div className="flex flex-col">
          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-0 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2025</h1>
              <p className="text-gray-300">
                Expanding into <strong>DevOps</strong> and <strong>Web3</strong>
                , learning about <strong>CI/CD</strong>,{" "}
                <strong> Docker</strong>,<strong> Kubernetes</strong>, and{" "}
                <strong>blockchain development</strong>.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2024</h1>
              <p className="text-gray-300">
                Worked on <strong>real-world projects</strong>, participated in
                hackathons, and focused on <strong>Backend Development</strong> (Next.js, TypeScript),{" "}
                <strong>Databases</strong> (MongoDB, PostgreSQL), and{" "}
                <strong>Cloud Technologies</strong>.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-5 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2023</h1>
              <p className="text-gray-300">
                Built foundational projects, explored{" "}
                <strong>Full-Stack Development </strong>
                ( React.js, Express.js, Node.js, MongoDB ) and deepened <strong>DSA</strong> skills.
              </p>
            </div>
          </div>

          <div className="flex border-l-2 border-cyan-400 gap-1">
            <div className="relative -left-3 top-1 w-6 h-6 bg-cyan-400 rounded-full"></div>
            <div className="flex flex-col mb-1 w-11/12">
              <h1 className="text-cyan-400 text-2xl font-bold">2022</h1>
              <p className="text-gray-300">
                Started learning <strong>Web Development</strong> with{" "}
                <strong>HTML, CSS, JS</strong> and{" "}
                <strong>Data Structures & Algorithms</strong> (DSA) in{" "}
                <strong>C++</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
