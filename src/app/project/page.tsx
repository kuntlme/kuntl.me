import Card from '@/components/card'
import { Project, projects } from '@/data/project'
import React from 'react'

const page = () => {
  return (
    <div className='bg-zinc-900 flex flex-col'>
      <section className="container mt-30">
        <h1 className="mb-3 text-7xl text-transparent text-outline font-bold">
          My Projects
        </h1>

        <div className='grid grid-cols-2 gap-4 mt-10'>
          {
            projects.map((project: Project) => (
              <Card key={project.id} title={project.title} description={project.description} githubLink={project.githubLink} direcLink={project.direcLink} techStack={project.techStack} />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default page