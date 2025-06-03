"use client"

import { timeAgo } from '@/lib/utils'
import { useDraggable } from '@dnd-kit/core'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const generateMemberLayout = (members = []) => {
    const count = members.length

    const getFirstName = (index) => members[index].name.split(" ")[0]

    if (count === 0) return ""
    if (count === 1) return getFirstName(0)
    if (count === 2) return `${getFirstName(0)} and ${getFirstName(1)}`

    return `${getFirstName(0)}, and ${count - 1} others`
}

const ProjectCard = ({ project: {
    id,
    title,
    description,
    users,
    created_at,
    updated_at,
    total_tasks,
    completed_tasks
} }) => {
    const router = useRouter()
    const [isHydrated, setIsHydrated] = useState(false)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id
    })

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const style = isHydrated && transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : {};
    
  return (
    <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className='
            cursor-pointer
            w-64 
            bg-white
            aspect-square 
            rounded-xl
            flex
            flex-col
            overflow-hidden
            hover:scale-101
            hover:shadow-md
            transition
            duration-200
        '
        style={style}
        onClick={() => router.push(`/projects/${id}`)}    
    >
        <div className='flex-1 bg-accent-gradient px-4 py-5'>
            <p className='font-black text-md mb-2 text-white'>{title}</p>
            <p className='font-normal text-xs text-gray-50 mb-auto'>{description}</p>
        </div>
        <div className='bg-white p-4'>
            <p className='text-sm text-gray-600'>{`${completed_tasks === 0 ? 'No' : `${completed_tasks}/${total_tasks}`} tasks completed ${completed_tasks === 0 && 'yet'}`}</p>
            <div className='flex justify-between mt-2'>
                <p className='text-sm text-gray-500'>{generateMemberLayout(users)}</p>
                <p className='text-sm text-gray-500'>{timeAgo(updated_at)}</p>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard