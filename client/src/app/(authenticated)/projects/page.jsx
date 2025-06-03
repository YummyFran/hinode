"use client"

import Delete from '@/components/Projects/Delete'
import ProjectCard from '@/components/Projects/ProjectCard'
import ProjectCardEmpty from '@/components/Projects/ProjectCardEmpty'
import { deleteProject, getProjects } from '@/lib/projectService'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [onDeleteHover, setOnDeleteHover] = useState(false)


  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data.projects)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 }
    })
  )

  const handleDragStart = async (e) => {
    setIsDragging(true)
  }

  const handleDragEnd = async (e) => {
    const { active, over} = e

    setIsDragging(false)

    if(!over) return

    if(over.id === 'del-zone') {
      const yes =  confirm("Are you sure you want to delete this project?")

      if(!yes) return

      await deleteProject({ projectId: active.id})
      fetchProjects()
    }
  }

  const handleDragOver = async (e) => {
      const { over } = e

      if (over && over.id === 'del-zone') {
          setOnDeleteHover(true)
      } else {
          setOnDeleteHover(false)
      }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className=' py-4 px-6 overflow-x-hidden h-full'>
      <h1 className='font-extrabold text-xl text-gray-700'>Projects</h1>
      <div className="project-cards py-6 flex gap-4 flex-wrap">
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver} sensors={sensors}>
          {
            projects.length > 0 &&
            projects.map((project, index) => (
              <ProjectCard key={index + project.id} project={project}/>
            ))
          }
          { isDragging && <Delete onDeleteHover={onDeleteHover}/>}
        </DndContext>

        <ProjectCardEmpty fetchProjects={fetchProjects}/>
      </div>
    </div>
  )
}

export default Projects