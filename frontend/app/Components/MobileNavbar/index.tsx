
import React from 'react'


import { XMarkIcon } from '@heroicons/react/16/solid';

import SidebarNav from '../Sidebar-nav';
import { HomeIcon } from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/outline';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'motion/react';


interface MobileNavProps {
    username: boolean;
    logout: () => void;
    close: () => void;
}
const MobileNav: React.FC<MobileNavProps> = ({ username, logout, close }) => {
    const sidebarItems = [
        {
            title: "Dashboard",
            icon: <HomeIcon className='w-4 h-4 text-text-light dark:text-text-dark'/>,
            links: [
                {
                    title: "Home",
                    href: "/admin",
                }
            ],
        },
        {
            title: "Users",
            icon: <UsersIcon className='w-4 h-4 text-text-light dark:text-text-dark'/>,
            links: [
                {
                    title: "Users",
                    href: "/admin/users",
                },
                {
                    title: "Create User",
                    href: "/admin/create-user",
                }
                
            ]
        },
        {
            title: "Companies",
            icon: <BuildingStorefrontIcon className='w-4 h-4 text-text-light dark:text-text-dark'/>,
            links: [
                {
                    title: "Companies",
                    href: "/admin/companies",
                },
                {
                    title: "Create Company",
                    href: "/admin/create-company",
                }
                
            ]
        }
    ]
    return (
        <div className='w-full h-full inset-0 bg-black/50 absolute top-0 left-0 z-50'>
            <AnimatePresence>
                <motion.div 
                initial={{ x: '-100%' }} 
                animate={{ x: '0%' }} 
                exit={{ x: '-100%' }} 
                transition={{ duration: 0.3, ease: 'easeOut' }} 
                 >

            <div className='w-10/12 h-full min-h-screen bg-background-light dark:bg-background-dark relative p-4'>
                <span className='absolute top-0 right-0'><XMarkIcon className="w-8 h-8 text-accent cursor-pointer hover:text-red-500" onClick={close} /></span>
                <span className='text-2xl font-bold text-text-dark p-4  border-b border-gray-200/10 font-mono'> U M S</span>
                <div className="flex flex-col ">
                    <SidebarNav sidebarItems={sidebarItems} setIsOpen={close}   />
                </div>
            </div>
                </motion.div>
            
            </AnimatePresence>
        </div>
    )
}

export default MobileNav;