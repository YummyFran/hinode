import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Modal from '../Modal';
import { addProject } from '@/lib/projectService';

const ProjectCardEmpty = ({ fetchProjects }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: ""
  })
  const [submitting, setSubmitting] = useState(false)
  
  const handleAddProject = async () => {
    setSubmitting(true)
    await addProject(projectDetails)
    setProjectDetails({ title: "", description: "" })
    setIsModalOpen(false)
    await fetchProjects()
    setSubmitting(false)
  }
  
  return (
    <>
      <div 
        className='
          cursor-pointer 
          w-64 
          bg-white 
          aspect-square 
          border-dashed 
          border-gray-400
          text-gray-500
          0 border-2 
          rounded-xl
          flex
          flex-col
          justify-center
          items-center
          gap-2
          hover:border-accent
          hover:text-accent
          transition
          dutation-200
        '
        onClick={() => setIsModalOpen(true)}
      >
          <FaPlus className='w-10 h-10'/>
          Add New Project
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          console.log('click')
          setIsModalOpen(false)
        }} 
        title={"Create New Project"}
        className={`flex flex-col gap-4`}
      >
        <div className="group flex flex-col gap-1">
          <label className='font-bold' htmlFor="title">Project title</label>
          <input className='py-2 px-3 rounded' id="title" type="text" placeholder='Your project title' value={projectDetails.title} onChange={(e) => setProjectDetails(prev => ({...prev, title: e.target.value}))} />
        </div>
        <div className="group flex flex-col gap-1">
          <label className='font-bold' htmlFor="description">Project Description</label>
          <input className='py-2 px-3 rounded' id="description" type="text" placeholder='A short description of your project' value={projectDetails.description} onChange={(e) => setProjectDetails(prev => ({...prev, description: e.target.value}))}/>
        </div>
        <button className='bg-accent-gradient text-white p-2 rounded disabled:opacity-50' onClick={handleAddProject} disabled={submitting}>{submitting ? "Creating project" : "Create"}</button>
      </Modal>
    </>
  )
}

export default ProjectCardEmpty