import Lists from "@/components/Projects/Lists"
import ProjectHeader from "@/components/Projects/ProjectHeader"
import { getProjectById } from "@/lib/projectService"
import { cookies } from "next/headers"

const Project = async ({ params }) => {
    const { id } = await params
    const cookieStore = cookies()
    const token = (await cookieStore).get('auth_token')?.value
    const {project} = await getProjectById(id, token)
     
    if(project === undefined) return <div className="flex justify-center items-center h-full font-bold text-3xl">Unauthorized to access this project</div>
  return (
    <div className="bg-accent-gradient py-4 px-6 h-full flex flex-col max-h-screen">
        <ProjectHeader title={project.title} description={project.description} projectId={project.id} members={project.users}/>
        <Lists lists={project.lists} project_id={id} />
    </div>
  )
}

export default Project