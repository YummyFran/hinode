import ProjectCard from '@/components/Projects/ProjectCard'
import ProjectCardEmpty from '@/components/Projects/ProjectCardEmpty'
import React from 'react'

const Projects = () => {
  const projects = [{
    id: "e4bnc92malcr4nsjgnarcor322nja",
    title: "My First Project",
    description: "This is a project about creating projects which creates projects like this porject.",
    members: [
      "oishi", "fran", "yum", "sean"
    ],
    created_at: "",
    updated_at: "2hrs ago",
    total_tasks: 46,
    completed_tasks: 24,
  }]
  return (
    <div>
      <h1 className='font-extrabold text-xl text-gray-700'>Projects</h1>
      <div className="project-cards py-6 flex gap-4">
        {
          projects.map((project, index) => (
            <ProjectCard key={index + project.id} project={project}/>
          ))
        }
        <ProjectCardEmpty />
      </div>
    </div>
  )
}

export default Projects