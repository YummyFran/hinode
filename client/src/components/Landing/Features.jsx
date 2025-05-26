import Card from "./Card";

const features = [
    {
        title: "Task Project Tracker",
        description: "Easily organize, prioritize, and track all your tasks from a centralized platform.",
        imageSrc: ""
    },{
        title: "To Do List",
        description: "Stay on top of your daily priorities with a simple and intuitive to-do list feature.",
        imageSrc: ""
    },{
        title: "Team Collaboration",
        description: "Work together seamlessly, share updates, and achieve goals as a team.",
        imageSrc: ""
    },{
        title: "Operationalize Goals",
        description: "Break down big objectives into actionable tasks and measure your progress effortlessly.",
        imageSrc: ""
    },{
        title: "Workspace Collaboration",
        description: "Create a shared workspace where teams can plan, discuss, and execute projects efficiently."
    }
]

export default function Features() {
  return (
    <section id="features" className="min-h-screen pb-6">
        <div className="heading text-center lg:py-0 px-6 flex flex-col gap-2 lg:gap-4">
            <h3 className="font-black text-2xl lg:text-3xl text-gray-900">Key Features of Hinode</h3>
            <h4 className="font-light text-sm lg:text-lg">Streamline your workflow and boost productivity.</h4>
        </div>
        <div className="feature-cards flex gap-4 gap-y-6 justify-center flex-wrap mt-6 mx-6">
            {features.map((feature, i) => (
                <Card key={i} title={feature.title} description={feature.description} imageSrc={feature.imageSrc} />
            ))}
        </div>
    </section>
  )
}
