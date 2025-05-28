import React from 'react'

const generateMemberLayout = (members = []) => {
    const count = members.length

    if (count === 0) return ""
    if (count === 1) return members[0]
    if (count === 2) return `${members[0]} and ${members[1]}`

    return `${members[0]}, and ${count - 1} others`
}

const ProjectCard = ({ project: {
    id,
    title,
    description,
    members,
    created_at,
    updated_at,
    total_tasks,
    completed_tasks
} }) => {
  return (
    <div className='
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
    '>
        <div className='flex-1 bg-accent-gradient px-4 py-5'>
            <p className='font-black text-md mb-2 text-white'>{title}</p>
            <p className='font-normal text-xs text-gray-50 mb-auto'>{description}</p>
        </div>
        <div className='bg-white p-4'>
            <p className='text-sm text-gray-600'>{`${completed_tasks}/${total_tasks} tasks completed`}</p>
            <div className='flex justify-between mt-2'>
                <p className='text-sm text-gray-500'>{generateMemberLayout(members)}</p>
                <p className='text-sm text-gray-500'>{updated_at}</p>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard