import { FaPlus } from "react-icons/fa6"
import List from "./List"

const Lists = ({ lists }) => {
    console.log(lists)
  return (
    <div className="w-full h-auto overflow-auto flex gap-2">
        {
            lists.map(list => (
                <List list={list} key={list.id}/>
            ))
        }
        <div className="w-64 bg-white/40 py-2 px-4 h-fit rounded-lg text-white flex gap-1 items-center shadow-md">
            <FaPlus />
            Add another list
        </div>
    </div>
  )
}

export default Lists