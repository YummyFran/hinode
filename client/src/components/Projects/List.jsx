"use client"

import { FaPlus } from "react-icons/fa6"
import dynamic from "next/dynamic";
const ListCard = dynamic(() => import("./ListCard"), { ssr: false });
// import ListCard from "./ListCard"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Modal from "../Modal"
import { addCard, updateList } from "@/lib/projectService"
import { useDraggable, useDroppable } from "@dnd-kit/core"

function mergeRefs(...refs) {
    return (node) => {
        for (let ref of refs) {
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref != null) {
                ref.current = node
            }
        }
    }
}

const List = ({ list, project_id }) => {    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cardDetails, setCardDetails] = useState({ title: "", description: "" })
    const [listDetails, setListDetails] = useState({ title: list.title, isEditting: false })
    const [submitting, setSubmitting] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false);

    const router = useRouter()

    const {setNodeRef} = useDroppable({
        id: list.id
    })

    const { attributes, listeners, setNodeRef: setDraggableNodeRef, transform } = useDraggable({
        id: list.id + "__" + "list"
    })

    const handleAddCard = async () => {
        setSubmitting(true)
        await addCard({ title: cardDetails.title, description: cardDetails.description, list_id: list.id })
        setCardDetails({ title: "", description: "" })
        setIsModalOpen(false)
        setSubmitting(false)
        router.refresh()
    }

    const handleSave = async () => {
        setListDetails(prev => ({...prev, isEditting: false}))

        await updateList({ title: listDetails.title, project_id, list_id: list.id })
    }

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const style = isHydrated && transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : {};

  return (
    <div 
        ref={mergeRefs(setNodeRef, setDraggableNodeRef)} 
        {...attributes}
        {...listeners}
        className="bg-gray-100 shadow-md w-64 rounded-lg h-fit p-2 flex flex-col gap-2 cursor-pointer shrink-0 select-text"
        style={style}
    >
        {
            listDetails.isEditting ?
                <input className="font-bold px-2" type="text" value={listDetails.title} onChange={e => setListDetails(prev => ({...prev, title: e.target.value}))} onBlur={() => handleSave()} autoFocus/>
            :
                <h2 className="font-bold px-2 wrap-break-word" onClick={() => setListDetails(prev => ({...prev, isEditting: true}))}>{listDetails.title}</h2>
        }
        <div className="flex flex-col gap-2">
        {
            list.cards.map(card => (
                <ListCard card={card} key={card.id} parent={list.id}/>
            ))
        }
        </div>
        <div className="text-sm text-gray-400 px-2 flex gap-1 mt-2 items-center"
            onClick={() => setIsModalOpen(true)}
        >
            <FaPlus />
            Add a card
        </div>
        <Modal
            isOpen={isModalOpen} 
            onClose={() => {
                setIsModalOpen(false)
            }} 
            title={"Create A Card"}
            className={`flex flex-col gap-4`}
            >
            <div className="group flex flex-col gap-1">
                <label className='font-bold' htmlFor="title">Card title</label>
                <input className='py-2 px-3 rounded' id="title" type="text" placeholder='Your project title' value={cardDetails.title} onChange={(e) => setCardDetails(prev => ({...prev, title: e.target.value}))} />
            </div>
            <div className="group flex flex-col gap-1">
                <label className='font-bold' htmlFor="description">Card description</label>
                <textarea className='py-2 px-3 rounded' id="description" type="text" placeholder='Your project title' value={cardDetails.description} onChange={(e) => setCardDetails(prev => ({...prev, description: e.target.value}))}></textarea>
            </div>
            <button className='bg-accent-gradient text-white p-2 rounded disabled:opacity-50 cursor-pointer' onClick={handleAddCard} disabled={submitting}>{submitting ? "Creating card" : "Create"}</button>
        </Modal>
    </div>
  )
}

export default List