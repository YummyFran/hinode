import Lists from "@/components/Projects/Lists"
import { getProjectById } from "@/lib/projectService"
import { cookies } from "next/headers"

const Project = async ({ params }) => {
    const { id } = await params
    const cookieStore = cookies()
    const token = (await cookieStore).get('auth_token')?.value
    const {project} = await getProjectById(id, token)
   
  return (
    <div className="bg-accent-gradient py-4 px-6 h-full">
        <h1 className="font-bold mb-4 text-white">{project.title}</h1>
        <Lists lists={project.lists}/>
    </div>
  )
}

export default Project