import Link from 'next/link'
import React from 'react'

export default function CTA() {
  return (
    <div className='rounded-2xl bg-accent-gradient mx-2 py-20'>
        <div className="heading text-center lg:py-0 px-6 flex flex-col gap-2 lg:gap-4">
            <h3 className="font-black text-4xl lg:text-5xl px-6 lg:px-70 text-white">Ready to Take Control of Your Tasks?</h3>
            <h4 className="font-light text-md lg:text-lg text-white">Join Hinode and turn chaos into clarity—your productivity upgrade starts now.</h4>
        </div>
        <div className="cta text-center pt-18">
            <Link href={'/signup'} className="bg-accent-gradient lg:text-lg text-white py-4 px-8 rounded-full bg-[length:150%_150%] bg-[position:0%_0%] hover:bg-[position:70%_0%] transition-[background-position] duration-300">Sign Up For Free</Link>
        </div>
    </div>
  )
}
