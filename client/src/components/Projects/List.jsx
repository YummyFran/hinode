import { FaPlus } from "react-icons/fa6"
import ListCard from "./ListCard"

const List = ({ list }) => {
  return (
    <div className="bg-gray-100 shadow-md w-64 rounded-lg h-fit p-2 flex flex-col gap-2 cursor-pointer">
        <h2 className="font-bold px-2">{list.title}</h2>
        {
            list.cards.map(card => (
                <ListCard card={card} key={card.id}/>
            ))
        }
        <div className="text-sm text-gray-400 px-2 flex gap-1 mt-2 items-center">
            <FaPlus />
            Add a card
        </div>
    </div>
  )
}

export default List