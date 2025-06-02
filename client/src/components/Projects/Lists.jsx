"use client"

import { FaPlus } from "react-icons/fa6"
import List from "./List"
import { useState } from "react"
import Modal from "../Modal"
import { addList } from "@/lib/projectService"
import { useRouter } from "next/navigation"

const Lists = ({ lists, project_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listTitle, setListTitle] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const handleAddList = async () => {
        setSubmitting(true)
        await addList({ title: listTitle, project_id })
        setListTitle("")
        setIsModalOpen(false)
        setSubmitting(false)
        router.refresh()
    }

  return (
    <div className="w-full h-auto overflow-auto flex gap-2">
        {
            lists.map(list => (
                <List list={list} key={list.id}/>
            ))
        }
        <div className="w-64 bg-white/40 py-2 px-4 h-fit rounded-lg text-white flex gap-1 items-center shadow-md cursor-pointer"
            onClick={() => setIsModalOpen(true)}
        >
            <FaPlus />
            Add another list
        </div>
        <Modal
            isOpen={isModalOpen} 
            onClose={() => {
                setIsModalOpen(false)
            }} 
            title={"Create A List"}
            className={`flex flex-col gap-4`}
            >
            <div className="group flex flex-col gap-1">
                <label className='font-bold' htmlFor="title">List title</label>
                <input className='py-2 px-3 rounded' id="title" type="text" placeholder='Your project title' value={listTitle} onChange={(e) => setListTitle(e.target.value)} />
            </div>
            <button className='bg-accent-gradient text-white p-2 rounded disabled:opacity-50 cursor-pointer' onClick={handleAddList} disabled={submitting}>{submitting ? "Creating list" : "Create"}</button>
        </Modal>
    </div>
  )
}

export default Lists