"use client"

import { useDraggable } from "@dnd-kit/core"
import { useEffect, useState } from "react";

const ListCard = ({ card }) => {
    const [isHydrated, setIsHydrated] = useState(false);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id
    })

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const style = isHydrated && transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : {};

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="bg-white p-2 rounded-lg shadow-sm" style={style}>
        <h3 className="font-semibold text-gray-700">{card.title}</h3>
        <p>{card.description}</p>
    </div>
  )
}

export default ListCard