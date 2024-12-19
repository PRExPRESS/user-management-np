'use client'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Profile = () => {

    const [user, setUser] = React.useState({
        id: 1,
        name: 'John Doe',
        email: '0BZ9w@example.com',
        phone: '+91 1234567890',
        role: 'Admin'

    });
    return (
        <div className='w-full h-full flex flex-col items-start justify-start'>
            <div className="w-full h-[250px] relative">
                <Image
                    src={'/imgs/profile-bg.png'}
                    alt='profile-bg'
                    layout='fill'
                    objectFit='cover'
                    width={0}

                    className=' object-cover' />
            </div>


            {/* profile details */}
            <div className="flex flex-col items-center  justify-start border border-gray-200 bg-white w-full md:w-5/12 h-auto p-4 shadow-lg relative left-1/2 -translate-x-1/2">
                <div className="z-10 w-[150px] h-[150px] flex items-center -translate-y-1/2 justify-center rounded-full border-[5px] border-gray-400">
                    <Image
                        src={'/imgs/avatar.png'}
                        alt="profile-bg"
                        height={150}
                        width={150}
                        className="rounded-full object-cover"
                    />
                </div>

                <div className="flex flex-col items-center justify-center relative top-[-50px] w-full">
                    <div className="flex flex-row items-center justify-center w-full">
                        <h2 className="font-semibold text-2xl text-text-light text-center">{user.name}</h2>
                        <Link href={`/admin/edit-user/${user.id}?admin=true `}>
                            <PencilSquareIcon className="w-5 h-5 text-gray-400 hover:text-accent ml-5 cursor-pointer " />
                        </Link>

                    </div>
                    <p className="text-accent text-center">{user.role}</p>
                    <table className=' mt-5'>
                        <tbody>
                            <tr>
                                <td className="font-semibold text-text-light">Email:</td>
                                <td className="text-text-light">{user.email}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold text-text-light">Phone:</td>
                                <td className="text-text-light">{user.phone}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold text-text-light">Address:</td>
                                <td className="text-text-light">{user.phone}</td>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    )
}

export default Profile
