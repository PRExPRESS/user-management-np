import React from 'react'
import Breadcrumb from '../Components/Breadcrumb'

const Home = () => {
  return (
    <div className='flex flex-col justify-start items-start w-full  min-h-[85vh] px-4 py-10 overflow-y-auto'>
            <Breadcrumb items={[{ title: 'Dashboard', link: '/admin' }]} />
            <span className='text-2xl font-bold my-5'>Dashboard</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 w-full">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Users</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                            {'100'}
                        </p>
                    </div>
                    <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Active Users</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                            {'50'}
                        </p>
                    </div>
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">Total Companies</p>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                            {'30'}
                            
                        </p>
                    </div>
                    <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg shadow">
                        <p className="text-lg font-semibold text-gray-700 dark:text-white">
                            Avg Revenue
                        </p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                            ${'5000'}
                        </p>
                    </div>
                </div>
    </div>
  )
}

export default Home
