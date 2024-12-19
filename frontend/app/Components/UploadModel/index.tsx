'use client'
import React, { useEffect } from 'react'
import Input from '../FormInput'
import { CloudArrowUpIcon, XCircleIcon } from '@heroicons/react/24/outline'
import Button from '../CustomBotton'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
    setIsOpen: (input: boolean)=>void
    setFile: (input: File) => void
    handleUpload: () => void
}
const UploadModel: React.FC<Props> = ({setIsOpen, setFile, handleUpload}) => {
    const [isModelOpen, setIsModelOpen] = React.useState(true)
    
    useEffect(() => {
        if(isModelOpen){
            setIsOpen(true)
        }else{
            
            setTimeout(() => {
                setIsOpen(false)
            },500)
        }
    }, [isModelOpen, setIsOpen]);
    const [selectedFile, setSelectedFile] = React.useState<string>('');


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            //console.log('selectedFile', selectedFile.name);
           setFile(selectedFile);
           setSelectedFile(selectedFile.name);
            
        }
    }

    
  return (
    <div className='w-full h-full fixed top-0 left-0 z-50 inset-0 bg-black/50 flex flex-col items-center justify-center'>
        <AnimatePresence>
            {
                isModelOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="flex flex-col items-center justify-center bg:white w-[400px] bg-background-light text-text-light dark:bg-background-dark p-4">
                            {/* special note for only accept types .csv or .xlsx */}
                            <span className='text-sm text-text-light dark:text-text-dark'>Only .csv or .xlsx files are allowed</span>
                            <Input
                                className='mt-4'
                                type='file'
                                label=''
                                placeholder='J'
                                name='file'
                                value={''}
                                icon={<CloudArrowUpIcon className='w-5 h-5' />}
                                onChange={handleFileChange}
                            />
                            <div className="flex flex-row items-center justify-end  w-full ">
                                <Button
                                    label='Upload'
                                    onClick={handleUpload}
                                    type='submit'
                                    loading={false}
                                    disabled={false}
                                    className='mt-4 bg-accent text-text-dark'
                                />
                            </div>
                            {selectedFile && (
                                <div className="mt-4">
                                    <span className='text-sm text-text-light dark:text-text-dark'>Selected File: {selectedFile}</span>
                                </div>
                            )}
                        </div>
                        <div className="w-full flex flex-row items-center justify-center mt-5">
                            <span onClick={() => setIsModelOpen(false)}>
                                <XCircleIcon className='w-8 h-8   text-text-dark cursor-pointer hover:text-red-500 dark:hover:text-red-500' />
                            </span>
                        </div>

                    </motion.div>

                )
            }
        </AnimatePresence>
    </div>
  )
}

export default UploadModel
