"use client"

import { useDraggable } from "@dnd-kit/core"
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { updateCard } from "@/lib/projectService";

const ListCard = ({ card, parent }) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [details, setDetails] = useState({ title: card.title, description: card.description })
    const [reflectedDetails, setReflectedDetails] = useState({ title: card.title, description: card.description })
    const [isEditting, setIsEditting] = useState({
        title: false,
        description: false
    })

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id + "__" + parent
    })

    const handleSave = async (setter) => {
        setIsEditting(prev => setter(prev))
        setReflectedDetails(details)

        await updateCard({ title: details.title, description: details.description, cardId: card.id})
    }

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const style = isHydrated && transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : {};

  return (
    <>
        <div 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes} 
            className="bg-white p-2 rounded-lg shadow-sm" 
            style={style}
            onClick={() => setIsModalOpen(true)}
        >
            <h3 className="font-semibold text-gray-700">{reflectedDetails.title}</h3>
            <p className="overflow-hidden text-ellipsis text-gray-600 line-clamp-2">{reflectedDetails.description}</p>
        </div>
        <Modal
            title={details.title}
            titleEditable={true}
            isEditting={isEditting.title}
            details={details}
            setDetails={setDetails}
            setIsEditting={setIsEditting}
            handleSave={handleSave}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className={'flex text-wrap'}
        >
            {
                isEditting.description ?
                    <textarea className="w-full field-sizing-content" type="text" value={details.description} onChange={e => setDetails(prev => ({...prev, description: e.target.value}))} onBlur={() => handleSave(prev => ({...prev, description: false}))} autoFocus></textarea>
                :
                    <p className="text-wrap overflow-wrap wrap-break-word w-full" onClick={() => setIsEditting(prev => ({...prev, description: true}))}>{details.description}</p>
            }
        </Modal>
    </>
  )
}

export default ListCard