
const ListCard = ({ card }) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-700">{card.title}</h3>
        <p>{card.description}</p>
    </div>
  )
}

export default ListCard