"use client"

import { updateProject } from "@/lib/projectService"
import { useState } from "react"

const ProjectHeader = ({title, description, projectId}) => {
    const [details, setDetails] = useState({ title, description })
    const [isEditting, setIsEditting] = useState({
        title: false,
        description: false
    })

    const handleSave = async (setter) => {
        setIsEditting(prev => setter(prev))

        await updateProject({ title: details.title, description: details.description, projectId })
    }
  return (
    <div className="mb-4 flex gap-4 items-center">
        {
            isEditting.title ? 
                <input className="text-white font-bold field-sizing-content" type="text" value={details.title} onChange={e => setDetails(prev => ({...prev, title: e.target.value}))} onBlur={() => handleSave(prev => ({...prev, title: false}))} autoFocus/>
            :
                <h1 className="font-bold text-white cursor-pointer" onClick={() => setIsEditting({ title: true, description: false })}>{details.title}</h1>
        }
        {
            isEditting.description ?
                <input className="text-gray-100 text-sm field-sizing-content" type="text" value={details.description} onChange={e => setDetails(prev => ({...prev, description: e.target.value}))} onBlur={() => handleSave(prev => ({...prev, description: false}))} autoFocus/>
            :
                <p className="text-sm text-gray-100 cursor-pointer" onClick={() => setIsEditting({ title: false, description: true })}>{details.description}</p>
        }
    </div>
  )
}

export default ProjectHeader