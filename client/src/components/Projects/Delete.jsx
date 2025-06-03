import { useDroppable } from '@dnd-kit/core'
import { MdDeleteOutline } from "react-icons/md";


const Delete = ({ onDeleteHover }) => {
    const {setNodeRef} = useDroppable({
        id: 'del-zone'
    })
    
  return (
    <div ref={setNodeRef} className={`fixed translate-x-[50%] translate-y-[50%] transition-all duration-200 bottom-12 right-12 rounded-full bg-white/50 ${onDeleteHover ? "p-15 scale-105" : "p-5"}`}>
        <MdDeleteOutline className="w-8 h-8 fill-red-500" />
    </div>
  )
}

export default Delete