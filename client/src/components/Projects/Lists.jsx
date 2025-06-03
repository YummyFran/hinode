"use client"

import { FaPlus } from "react-icons/fa6"
import List from "./List"
import { useEffect, useRef, useState } from "react"
import Modal from "../Modal"
import { addList, deleteCard, moveCard } from "@/lib/projectService"
import { useRouter } from "next/navigation"
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core"
import Delete from "./Delete"

const Lists = ({ lists:initialLists, project_id }) => {
    const [lists, setLists] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listTitle, setListTitle] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [onDeleteHover, setOnDeleteHover] = useState(false)
    const router = useRouter()

    const scrollRef = useRef(null)
    let isDown = false
    let startX
    let scrollLeft

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 5 }
        })
    )

    const handleDragStart = async (e) => {
        setIsDragging(true)
    }

    const handleDragEnd = async (e) => {
        const {active, over} = e

        setIsDragging(false)

        if(!over) return

        
        const cardId = active.id.split("__")[0]
        const oldParent = active.id.split("__")[1]
        const newParent = over.id
        
        if(over.id === 'del-zone') {
            setLists(prevLists =>
                prevLists.map(list => ({
                ...list,
                cards: list.cards.filter(card => card.id !== cardId),
                }))
            )
            await deleteCard({cardId})
            return
        }
        
        if(newParent === oldParent) return

        moveCardInState(cardId, oldParent, newParent)
        await moveCard({ cardId, listId: newParent})
    }

    const handleDragOver = async (e) => {
        const { over } = e

        if (over && over.id === 'del-zone') {
            setOnDeleteHover(true)
        } else {
            setOnDeleteHover(false)
        }
    }

    const handleAddList = async () => {
        setSubmitting(true)
        await addList({ title: listTitle, project_id })
        setListTitle("")
        setIsModalOpen(false)
        setSubmitting(false)
        router.refresh()
    }

    const moveCardInState = (cardId, fromListId, toListId, position = null) => {
        setLists((prevLists) => {
            // Deep clone the lists to avoid mutating state directly
            const listsCopy = prevLists.map(list => ({
            ...list,
            cards: [...list.cards]
            }));

            // Find source and target lists
            const fromList = listsCopy.find(list => list.id === fromListId);
            const toList = listsCopy.find(list => list.id === toListId);

            if (!fromList || !toList) {
            console.warn("List not found");
            return prevLists;
            }

            // Find the card to move and remove it from the source list
            const cardIndex = fromList.cards.findIndex(card => card.id === cardId);
            if (cardIndex === -1) {
            console.warn("Card not found in source list");
            return prevLists;
            }

            const [cardToMove] = fromList.cards.splice(cardIndex, 1);

            // Update the card's task_list_id to the new list id
            cardToMove.task_list_id = toListId;

            // Insert card into target list at the specified position or at the end
            if (position === null || position > toList.cards.length) {
            toList.cards.push(cardToMove);
            } else {
            toList.cards.splice(position, 0, cardToMove);
            }

            // Optional: Recalculate positions if you want them to be consistent
            toList.cards = toList.cards.map((card, index) => ({
            ...card,
            position: index + 1,
            }));

            // You could also update positions in fromList if you want

            return listsCopy;
        });
    };


    useEffect(() => {
        setLists(initialLists)
    }, [initialLists])

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
    <div className="w-full flex-1 overflow-auto flex gap-2 scrollbar-hidden cursor-grab active:cursor-grabbing select-none" ref={scrollRef}>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver} sensors={sensors}>
            {
                lists?.map(list => (
                    <List list={list} key={list.id}/>
                ))
                
            }
            { isDragging && <Delete onDeleteHover={onDeleteHover} />}
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