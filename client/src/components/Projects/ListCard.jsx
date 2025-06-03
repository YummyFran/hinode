"use client"

import { useDraggable } from "@dnd-kit/core"
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";

const ListCard = ({ card, parent }) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id + "__" + parent
    })


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
            <h3 className="font-semibold text-gray-700">{card.title}</h3>
            <p className="overflow-hidden text-ellipsis text-gray-600">{card.description}</p>
        </div>
        <Modal
            title={card.title}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className={'flex text-wrap'}
        >
            <p className="text-wrap overflow-wrap wrap-break-word w-full">{card.description}</p>
        </Modal>
    </>
  )
}

export default ListCard