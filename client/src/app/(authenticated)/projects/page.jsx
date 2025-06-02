"use client"

import ProjectCard from '@/components/Projects/ProjectCard'
import ProjectCardEmpty from '@/components/Projects/ProjectCardEmpty'
import { getProjects } from '@/lib/projectService'
import React, { useEffect, useState } from 'react'

const Projects = () => {
  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data.projects)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div>
      <h1 className='font-extrabold text-xl text-gray-700'>Projects</h1>
      <div className="project-cards py-6 flex gap-4 flex-wrap">
        {
          projects.length > 0 &&
          projects.map((project, index) => (
            <ProjectCard key={index + project.id} project={project}/>
          ))
        }
        <ProjectCardEmpty fetchProjects={fetchProjects}/>
      </div>
    </div>
  )
}

export default Projects