"use client";
import React from 'react'
import Link from 'next/link';
import { CalendarIcon, MenuIcon, PhoneIcon, PlaneIcon, SearchIcon, XIcon,Hotel,TreePalm,CarTaxiFront } from 'lucide-react'
const Navbar = () => {
  return (
    // <nav className='h-16 bg-purple-700 flex justify-between px-3 items-center text-white'>
    //   <div className='logo font-bold text-2xl'>
    //   <Link href="/">Travel</Link>
    //   </div>
    //   <ul className='flex justify-between gap-4 items-center'>
    //     <Link href="/home"><li>HOME</li></Link>
    //     <Link href="/aboutus"><li>Contact</li></Link>
    //     <Link href="/book"><li>Book</li></Link>
    //     <Link href="/flight"><li>Flight</li></Link>
    //     <li className='flex gap-3'>
    //     <Link href="/search"><button className='bg-purple-500 rounded-lg p-3 py-1 font-bold'>Search Now</button></Link>
    //     <Link href="/shorten"><button className='bg-purple-500 rounded-lg p-3 py-1 font-bold'>Short Now</button></Link>
    //     </li>
    //   </ul>
    // </nav>
    <header className="bg-yellowCustom text-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* <MenuIcon className="h-6 w-6" /> */}
            <h1 className="text-2xl font-bold"><Link href="/">Travel</Link></h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/home" className="relative group inline-block text-black hover:text-black"><PlaneIcon className='mx-3' size={30}/> Flights<span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"/></Link>
            <Link href="/aboutus" className="relative group inline-block text-black hover:text-black"><Hotel className='mx-3' size={30}/> Hotels<span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"/></Link>
            <Link href="/book" className="relative group inline-block text-black hover:text-black"><TreePalm className='mx-3' size={30}/> Holidays<span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"/></Link>
            <Link href="#" className="relative group inline-block text-black hover:text-black"><CarTaxiFront className='mx-3' size={30}/> Car Hire<span className="absolute bottom-[-3px] left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"/></Link>
          </nav>
          <div className="flex items-center space-x-4">
            <PhoneIcon className="h-5 w-5" />
            <span>0208 843 4400</span>
          </div>
        </div>
      </header>
  )
}

export default Navbar