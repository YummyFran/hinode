import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLink = ({ href, children}) => {
    const pathname = usePathname();

    const linkClass = (path) =>
        pathname === path
            ? 'bg-gray-100 font-bold'
            : '';
  return (
    <Link href={href} className={`no-focus px-2 py-1 text-sm flex gap-2 items-center hover:bg-gray-100 rounded ${linkClass(href)}`}>
        {children}
    </Link>
  )
}

export default NavLink