'use client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { a } from 'motion/react-client';
import Link from 'next/link';
import React, { JSX, useEffect, useState } from 'react'

interface NavItem {
    title: string;
    icon: JSX.Element;
    links: { title: string; href: string }[];
}

interface SidebarProps {
    sidebarItems: NavItem[];
    setIsOpen ?: (input: boolean) => void

}


const SidebarNav: React.FC<SidebarProps> = ({ sidebarItems , setIsOpen}) => {
    const [activeLink, setActiveLink] = useState<string>("");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleLinkClick = (href: string) => {
        setActiveLink(href);
        if(setIsOpen) setIsOpen(false);
    };

    const toggleDropdown = (title: string) => {
        setOpenDropdown(openDropdown === title ? null : title);
    };

    useEffect(() => {
        setActiveLink(window.location.pathname);
        sidebarItems.filter((item) => {
            item.links.filter((link) => {
                if (link.href === window.location.pathname) {
                    toggleDropdown(item.title);
                }
            })
        })
    }, []);

    return (
        <div className="px-4 mt-5">
            <ul>
                {sidebarItems.map((item) => (
                    <li key={item.title} className="mb-4">
                        <div
                            className="flex items-center justify-between cursor-pointer md:text-text-dark hover:text-accent"
                            onClick={() => toggleDropdown(item.title)}
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.title}</span>
                            </div>
                            <span>
                                {openDropdown === item.title ? (
                                    <ChevronUpIcon className='w-4 h-4 md:text-white' />
                                ) : (
                                    <ChevronDownIcon className='w-4 h-4 md:text-white' />
                                )}
                            </span>
                        </div>

                        {openDropdown === item.title && (
                            <ul className="ml-4 mt-2 space-y-2">
                                {item.links.map((link: { title: string; href: string }) => (
                                    <li key={link.href}>
                                        <Link href={link.href}>
                                            <div
                                                className={`block px-2 py-1 md:text-gray-300 hover:bg-gray-700 rounded-md ${activeLink === link.href ? "bg-gray-600" : ""
                                                    }`}
                                                onClick={() => handleLinkClick(link.href)}
                                            >
                                                {link.title}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarNav
