"use client"

import { addMember, removeMember, updateProject } from "@/lib/projectService"
import { generateMemberLayout } from "@/lib/utils"
import { useState } from "react"
import Modal from "../Modal"
import Member from "./Member"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

const ProjectHeader = ({title, description, projectId, members}) => {
    const [details, setDetails] = useState({ title, description })
    const [isEditting, setIsEditting] = useState({
        title: false,
        description: false
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMembersOpen, setIsMembersOpen] = useState(false)
    const [memberEmail, setMemberEmail] = useState("")
    const router = useRouter()

    const authUser = useSelector(state => state.auth.user)?.user

    const authUserRole = members.find((m) => m.id === authUser?.id)?.pivot.role;

    const handleSave = async (setter) => {
        setIsEditting(prev => setter(prev))

        await updateProject({ title: details.title, description: details.description, projectId })
    }

    const handleAddMember = async () => {
        await addMember({ email: memberEmail, projectId })
        router.refresh()
    }

    const handleRemoveMember = async (userId) => {
        await removeMember({ userId, projectId})
        router.refresh()
    }

  return (
    <>
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
            <p className="ml-auto text-gray-100 text-xs" >Members: <span className="hover:underline cursor-pointer" onClick={() => setIsMembersOpen(true)}>{generateMemberLayout(members)}</span></p>
            {
                authUserRole === "owner" &&
                <button 
                    className="text-white bg-touch hover:bg-accent-gradient transition-all duration-200 px-4 py-1 text-xs rounded cursor-pointer" 
                    onClick={() => setIsModalOpen(true)}
                >
                    Add a member
                </button>
            }
        </div>
        <Modal
            title={"Add a member"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className={'flex flex-col'}
        >
            <div className="group flex flex-col gap-1">
                <label className='font-bold' htmlFor="title">Email address</label>
                <input className='py-2 px-3 rounded no-focus focus:outline-0' id="title" type="text" placeholder="New member's email address" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} />
            </div>  
            <button className="bg-accent-gradient self-end text-white py-2 px-4 rounded-md cursor-pointer" onClick={() => handleAddMember()}>Add member</button>
        </Modal>
        <Modal
            title={`Project Members`}
            isOpen={isMembersOpen}
            onClose={() => setIsMembersOpen(false)}
        >
            {
                members.toReversed().map((member) => {
                    return (
                        <Member member={member} key={member.id} authUserRole={authUserRole} handleRemoveMember={handleRemoveMember}/>
                    )
                })
            }
        </Modal>
    </>
  )
}

export default ProjectHeader