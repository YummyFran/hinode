'use client'

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    return (
        <nav className="flex justify-between items-center py-4 px-4 lg:px-32 fixed top-0 left-0 right-0 z-10">
            <Link href="/" className="brand flex gap-2 items-center text-lg font-bold cursor-pointer">
                <div className="logo bg-accent-gradient"></div>
                Hinode 
            </Link>
            <div className="burger flex items-center lg:hidden" onClick={() => setIsMobileNavOpen(true)}>
                <button id="burger" className="text-gray-700 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                </button>
            </div>  
            <ul className="links hidden lg:flex gap-6 text-sm absolute left-1/2 -translate-x-1/2">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#product">Product</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
            </ul>

            <div className="cta hidden lg:flex items-center gap-2 text-sm">
                <Link href={'/login'} className="border-[1.5px] border-gray-200 px-8 py-2 rounded-full hover:border-accent">Login</Link>
                <Link href={'/signup'} className="px-8 py-2 rounded-full bg-accent-gradient bg-[length:150%_150%] bg-[position:0%_0%] hover:bg-[position:70%_0%] transition-[background-position] duration-300 text-white">Sign Up</Link>
            </div>

            <ul className={`mobile-links lg:hidden z-0 fixed top-0 right-0 px-4 py-4 w-full h-full flex-col gap-4 text-lg items-end bg-red-50 ${isMobileNavOpen ? 'flex' : 'hidden'}`}>
                <div className="head w-full flex justify-between">
                    <Link href="/" className="brand flex gap-2 items-center text-lg font-bold cursor-pointer">
                        <div className="logo bg-accent-gradient"></div>
                        Hinode 
                    </Link>
                    <div className="close text-2xl px-2" onClick={() => setIsMobileNavOpen(false)}>
                        &times;
                    </div>
                </div>
                <li><a href="#home" className="px-2">Home</a></li>
                <li><a href="#features" className="px-2">Features</a></li>
                <li><a href="#product" className="px-2">Product</a></li>
                <li><a href="#pricing" className="px-2">Pricing</a></li>
                <li><a href="#blog" className="px-2">Blog</a></li>
                <li><a href="#contact" className="px-2">Contact Us</a></li>
                <div className="cta flex flex-col items-center gap-2 mt-auto text-sm w-full">
                    <Link href={'/login'} className="border-[1.5px] w-full text-center border-gray-200 px-8 py-2 rounded-full hover:border-accent">Login</Link>
                    <Link href={'/signup'} className="px-8 py-2 w-full text-center rounded-full bg-accent-gradient bg-[length:150%_150%] bg-[position:0%_0%] hover:bg-[position:70%_0%] transition-[background-position] duration-300 text-white">Sign Up</Link>
                </div>
            </ul>
        </nav>
    )
}