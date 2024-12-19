'use client'
import { useAuth } from '@/app/context/AuthContext';
import { Bars3Icon, MoonIcon, PowerIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useState } from 'react'
import MobileNavbar from '../MobileNavbar';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const {theme, setTheme} = useTheme();
    
    
    const {isAuthenticated, logout, user} = useAuth();
    
    const letter = user.name.charAt(0);
  return (

    <div className='w-full  dark:bg-background-dark  border-b dark:border-gray-200/10 flex flex-row items-center justify-between md:justify-end p-4 shadow'>
      <div className='md:hidden block'>
          <Bars3Icon className='w-6 h-6' onClick={() => setIsOpen(!isOpen)} />
        </div>
      <div className="flex flex-row items-center justify-evenly w-4/12 md:w-3/12">
        <span onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {
                theme === "dark" ? (
                    <SunIcon  className="w-6 md:w-8 h-6 md:h-8 text-white cursor-pointer hover:text-accent"/>
                ):(
                    <MoonIcon  className="w-6 md:w-8 h-6 md:h-8 text-text-light cursor-pointer hover:text-accent"/>
                )
            }
        </span>
        <Link href="/admin/profile" className="w-8 h-8 rounded-full flex flex-row items-center justify-center bg-accent border cursor-pointer hover:bg-green-700">
            <span className='dark:text-text-dark text-text-light'>{letter}</span>
        </Link>
        <span onClick={logout}>
            <PowerIcon  className="w-6 h-6 text-text-light dark:text-text-dark cursor-pointer hover:text-accent dark:hover:text-accent"/>
        </span>
      </div>
      {
          isOpen && (
            <div className='flex flex-col justify-center items-center w-full h-full bg-white'>
              <MobileNavbar username={isAuthenticated} logout={logout} close={(): void => setIsOpen(false)} />
              </div>
          )
        }
    </div>
  )
}

export default Topbar
