import React from 'react'

const Footer = () => {
  return (
    <div className='w-full z-20 dark:bg-background-dark bg-white  p-4 sticky  bottom-0 border-t dark:border-gray-200/10 flex flex-row items-center justify-center mt-[50px]'>
      {/* copyright */}
      <small className='text-text-light dark:text-gray-200 text-center'>Copyright &copy; 2024</small>
    </div>
  )
}

export default Footer
