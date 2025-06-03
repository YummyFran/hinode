"use client"

import { FaPlus } from "react-icons/fa6"
import List from "./List"
import { useEffect, useRef, useState } from "react"
import Modal from "../Modal"
import { addList, moveCard } from "@/lib/projectService"
import { useRouter } from "next/navigation"
import { DndContext } from "@dnd-kit/core"

const Lists = ({ lists, project_id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listTitle, setListTitle] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const scrollRef = useRef(null)
    let isDown = false
    let startX
    let scrollLeft

    const handleDragEnd = async (e) => {
        const {active, over} = e

        if(!over) return

        const cardId = active.id
        const newParent = over.id

        await moveCard({ cardId, listId: newParent})
        router.refresh()
    }

    const handleAddList = async () => {
        setSubmitting(true)
        await addList({ title: listTitle, project_id })
        setListTitle("")
        setIsModalOpen(false)
        setSubmitting(false)
        router.refresh()
    }

    useEffect(() => {
        const slider = scrollRef.current

        const mouseDownHandler = (e) => {
            if (e.target !== slider) return
            
            isDown = true
            slider.classList.add("active")
            startX = e.pageX - slider.offsetLeft
            scrollLeft = slider.scrollLeft
        }

        const mouseLeaveHandler = () => {
            isDown = false
            slider.classList.remove("active")
        }

        const mouseUpHandler = () => {
            isDown = false
            slider.classList.remove("active")
        }

        const mouseMoveHandler = (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - slider.offsetLeft
            const walk = (x - startX) * 1.5 // scroll-fast multiplier
            slider.scrollLeft = scrollLeft - walk
        }

        slider.addEventListener("mousedown", mouseDownHandler)
        slider.addEventListener("mouseleave", mouseLeaveHandler)
        slider.addEventListener("mouseup", mouseUpHandler)
        slider.addEventListener("mousemove", mouseMoveHandler)

        return () => {
            slider.removeEventListener("mousedown", mouseDownHandler)
            slider.removeEventListener("mouseleave", mouseLeaveHandler)
            slider.removeEventListener("mouseup", mouseUpHandler)
            slider.removeEventListener("mousemove", mouseMoveHandler)
        }
    }, [])

  return (
    <div className=" w-full h-full overflow-auto flex gap-2 scrollbar-hidden cursor-grab active:cursor-grabbing select-none" ref={scrollRef}>
        <DndContext onDragEnd={handleDragEnd}>
            {
                lists.map(list => (
                    <List list={list} key={list.id}/>
                ))
            }
        </DndContext>

        <div className="w-64 bg-white/40 py-2 px-4 h-fit rounded-lg text-white flex gap-1 items-center shadow-md cursor-pointer shrink-0"
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