"use client";
import React from 'react'
import Link from 'next/link';
const Navbar = () => {
  return (
    <nav className='h-16 bg-purple-700 flex justify-between px-3 items-center text-white'>
      <div className='logo font-bold text-2xl'>
      <Link href="/">Travel</Link>
      </div>
      <ul className='flex justify-between gap-4 items-center'>
        <Link href="/home"><li>HOME</li></Link>
        <Link href="/aboutus"><li>Contact</li></Link>
        <Link href="/book"><li>Book</li></Link>
        <Link href="/flight"><li>Flight</li></Link>
        <li className='flex gap-3'>
        <Link href="/search"><button className='bg-purple-500 rounded-lg p-3 py-1 font-bold'>Search Now</button></Link>
        <Link href="/shorten"><button className='bg-purple-500 rounded-lg p-3 py-1 font-bold'>Short Now</button></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar