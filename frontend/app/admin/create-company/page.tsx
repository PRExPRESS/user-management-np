'use client'
import Breadcrumb from '@/app/Components/Breadcrumb'
import Button from '@/app/Components/CustomBotton'
import Input from '@/app/Components/FormInput'
import { CloudArrowUpIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import UploadModel from '../../Components/UploadModel'
import { createCompany } from '@/app/services/companies.service'
import Papa from 'papaparse'

import * as XLSX from 'xlsx'


const page = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const breadcrumb = [
        {
            title: 'Home',
            link: '/admin'
        },
        {
            title: 'Users',
            link: '/admin/users'
        },
        {
            title: 'Create User',
            link: '/admin/edit-user/'
        }
    ]


    const handleBulkUpload = async () => {
        setIsOpen(false);

        const fileExtension = file!.name.split('.').pop()?.toLowerCase();

        if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
            toastr.error('Csv and Excel files only', '', {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            });
            return;
        }

        let userList: any[] = [];
        if (fileExtension === 'csv') {
            const reader = new FileReader();
            reader.onload = async ({ target }: ProgressEvent<FileReader>): Promise<void> => {
                if (!target?.result) return;

                const csv = Papa.parse(target.result as string, {
                    header: true,
                    skipEmptyLines: true
                });

                const parsedData: any[] = csv?.data || [];

                if (parsedData.length === 0) return;

                parsedData.forEach((user: any) => {
                    userList.push(
                        {
                            name: user.name.trim(),
                            
                        }
                    );
                });

                const response = await createCompany(userList);

                if (response.error) {
                    toastr.error(response.error, '', {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    });
                    return;
                }
                setIsLoading(false);

                toastr.success('User created successfully!', '', {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "showDuration": 300,
                    "hideDuration": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                });

                return;
            };

            reader.readAsText(file!);

        }

        if (fileExtension === 'xlsx') {
            const reader = new FileReader();
            reader.onload = async ({ target }: ProgressEvent<FileReader>): Promise<void> => {
                if (!target?.result) return;

                const data = new Uint8Array(target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const usersData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                usersData.slice(1).forEach((user: any) => {
                    userList.push(
                        {
                            name: user[0],
                            
                        }
                    );
                });

                const response = await createCompany(userList);

                if (response.error) {
                    toastr.error(response.error, '', {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    });
                    return;
                }
                setIsLoading(false);

                toastr.success('User created successfully!', '', {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "showDuration": 300,
                    "hideDuration": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                });

                return;
            };

            reader.readAsArrayBuffer(file!);

        }


    }
    const handleSubmit = async () => {
        
        setIsLoading(true);

        const response = await createCompany([name]);

        if (response.error) {
            toastr.error(response.error, '', {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            });
            return;
        }

        setIsLoading(false);

        toastr.success('Company created successfully!', '', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        });
        setTimeout(() => {
            //redirect('/admin/users');
        }, 1000);
    }

    return (
        <div className='flex flex-col min-h-[85vh]   p-4'>
            <Breadcrumb items={breadcrumb} />
            <span className='text-2xl font-bold my-5'>Create User</span>
            <div className='flex flex-col-reverse md:flex-row items-start justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>

                <div className="w-full md:w-4/12 flex flex-col items-start gap-6 justify-center">
                    <Input
                        className='mt-4'
                        type="text"
                        label="Name"
                        placeholder="Company Name"
                        name="name"
                        value=''
                        icon={<UserCircleIcon className='w-5 h-5' />}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="flex items-center justify-center ">
                        <Button
                            label="Save"
                            onClick={handleSubmit}
                            className='w-full bg-accent text-text-light dark:text-text-dark dark:bg-accent'
                            loading={false}
                        />
                    </div>

                </div>

                <div className="block ml-auto w-full md:w-2/12">
                    <Button
                        label="Bulk Upload"
                        onClick={() => setIsOpen(true)}
                        className='w-full bg-white border border-accent text-accent dark:border-accent dark:bg-background-dark dark:text-text-dark  hover:bg-accent hover:text-text-light dark:hover:bg-accent dark:hover:text-text-dark'
                        loading={false}
                        icon={<CloudArrowUpIcon className='w-5 h-5' />}
                    />
                </div>

            </div>
            {
                isOpen && <UploadModel setIsOpen={setIsOpen} setFile={setFile}
                    handleUpload={handleBulkUpload} />
            }
        </div>
    )
}

export default page
