import { getProjectById } from "@/lib/projectService"
import { cookies } from "next/headers"

const Project = async ({ params }) => {
    const { id } = await params
    const cookieStore = cookies()
    const token = (await cookieStore).get('auth_token')?.value
    const {project} = await getProjectById(id, token)
    console.log(project)
  return (
    <div>
        <h1 className="font-bold">{project.title}</h1>
    </div>
  )
}

export default Project