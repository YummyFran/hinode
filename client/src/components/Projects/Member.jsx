import { useSelector } from "react-redux"

const Member = ({ member, authUserRole, handleRemoveMember }) => {
    const user = useSelector(state => state.auth.user)?.user

  return (
    <div className="flex items-center gap-2 py-4 px-4 rounded-xl shadow bg-gray-50 mb-2">
        <p className="font-bold text-md">{member.name}</p>
        <span className={`px-3 py-1 rounded-full text-xs text-white ${member.pivot.role == "owner" ? "bg-accent-gradient" : "bg-gray-400"}`}>{member.pivot.role}</span>
        {
            authUserRole === "owner" &&
            member.id !== user.id &&
            member.pivot.role !== "owner" && 
                (
                    <button 
                        className="text-xs text-red-400 ml-auto py-2 px-4 rounded-md cursor-pointer hover:font-bold hover:bg-red-400 hover:text-white transition-all duration-200"
                        onClick={() => handleRemoveMember(member.id)}
                    >
                        Remove
                    </button>
                )
        }
    </div>
  )
}

export default Member