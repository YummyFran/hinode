import Link from "next/link";

export default function Hero() {
    return (    
        <section id="home" className="bg-[linear-gradient(to_bottom,_#ffffff_0%,_#ffb88c_70%,_#de6262_100%)] h-screen relative flex flex-col">
            <div className="hero text-center py-12 lg:py-18 px-6 flex flex-col gap-2 lg:gap-4">
                <h1 className="font-black text-4xl lg:text-5xl text-gray-900">A New Dawn for Productivity.</h1>
                <h2 className="font-light text-md lg:text-xl">Track smarter, focus sharper, and finish stronger with Hinode.</h2>
            </div>
            <div className="cta text-center pt-24 lg:pt-2">
                <Link href={'/signup'} className="bg-accent-gradient lg:text-lg text-white py-4 px-8 rounded-full bg-[length:150%_150%] bg-[position:0%_0%] hover:bg-[position:70%_0%] transition-[background-position] duration-300">Get Started For Free</Link>
            </div>
            <div className="scroll sticky mt-auto bottom-6 mb-6 flex justify-center">
                <a href="#features" className="icon border border-white w-5 h-10 rounded-full flex justify-center items-end p-1 cursor-pointer">
                    <div className="cursor w-full aspect-square bg-white rounded-full animate-bounce rotate-180 mb-1"></div>
                </a>
            </div>
        </section>
    )
}