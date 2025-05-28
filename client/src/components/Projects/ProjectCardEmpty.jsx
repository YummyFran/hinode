import React from 'react'
import { FaPlus } from "react-icons/fa6";


const ProjectCardEmpty = () => {
  return (
    <div className='
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
    '>
        <FaPlus className='w-10 h-10'/>
        Add New Project
    </div>
  )
}

export default ProjectCardEmpty