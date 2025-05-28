'use client'

import Link from 'next/link'
import React from 'react'
import NavLink from './NavLink';
import { useSelector } from 'react-redux';

const AuthNavbar = () => {
    const user = useSelector(state => state.auth.user)?.user
    
    if(!user) return null
    return (
        <nav className='w-64 h-screen fixed p-2 flex flex-col gap-1 rounded-r-md bg-white'>
            <Link href="/" className="brand flex gap-2 items-center text-md font-bold cursor-pointer py-2 mb-2">
                <div className="logo-sm bg-accent-gradient"></div>
                Hinode
            </Link>
            <NavLink href={"/"}>
                <div className="icon w-6 aspect-square"></div>
                Projects
            </NavLink>
            <NavLink href={"/todos"}>
                <div className="icon w-6 aspect-square"></div>
                Todos
            </NavLink>
            <NavLink href={"/socials"}>
                <div className="icon w-6 aspect-square"></div>
                Socials
            </NavLink>
            <Link href={"/settings"} className='no-focus px-2 py-1 text-sm flex gap-2 items-center hover:bg-gray-100 rounded mt-auto text-gray-500'>
                <div className="icon w-6 aspect-square"></div>
                Settings
            </Link>
            <Link href={"/profile"} className='no-focus py-1 flex items-center gap-2 border-t border-gray-300 pt-4 mt-4'>
                <div className="profile-pic w-8 aspect-square rounded bg-red-300"></div>
                <div className="display-name flex flex-col gap-0">
                    <div className="name text-sm font-bold">{user.name}</div>
                    <div className="email text-sm">{user.email}</div>
                </div>
            </Link>
        </nav>
    )
}

export default AuthNavbar