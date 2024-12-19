'use client'
import Breadcrumb from '@/app/Components/Breadcrumb'
import Button from '@/app/Components/CustomBotton'
import Input from '@/app/Components/FormInput'
import { CloudArrowUpIcon, EnvelopeIcon, LockClosedIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import React, { use, useEffect, useState } from 'react'
import UploadModel from '../../Components/UploadModel'

import SelectInput from '../../Components/SelectInput'

import { userValidation } from '../../validations/user-validation';
import toastr from 'toastr';
import { redirect } from 'next/navigation';
import { createUser } from '@/app/services/users.service'
import { getAllCompanies, getCompanies } from '@/app/services/companies.service'
import { useAuth } from '@/app/context/AuthContext'


import Papa from 'papaparse'

import * as XLSX from 'xlsx'


type errorType = {
    fullName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    phone?: string,
    address?: string
};
// type User = {
//     name: string,
//     email: string,
//     phone: string,
//     address: string
//     company_id: number,
//     admin_id: number
// }
// interface ParsedData {
//     [key: string]: string;
// }
const page = () => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    });
    const [errors, setErrors] = useState<errorType>({});
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);
    

    const { user } = useAuth();


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

    //fetch all companies
    const [companies, setCompanies] = useState<any[]>([]);
    useEffect(() => {
        const fetchCompanies = async () => {
            const response = await getCompanies();

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
            if (Array.isArray(response)) {
                const companies = response.map((company: any) => ({
                    label: company.name,
                    value: company.id
                }));
                //console.log('companies', companies);
                setCompanies(companies);
            }
        }
        fetchCompanies();
    }, []);

    //handle change for company
    const handleChange = (selectedOption: any) => {
        console.log('Option selected:', selectedOption);
        setSelectedCompany(selectedOption ? selectedOption : '');
    };

   
    

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
                            email: user.email.trim(),
                            phone: user.phone.trim(),
                            address: user.address.trim(),
                            admin_id: +user.admin_id.trim(),
                            company_id: +user.company_id.trim()
                        }
                    );
                });

                const response = await createUser(userList);

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
                            email: user[1],
                            phone: user[2],
                            address: user[3],
                            admin_id: user[4],
                            company_id: user[5],
                        }
                    );
                });

                const response = await createUser(userList);

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
        let _user: any = formData;
        setIsLoading(true);

        formData.password === '' ? _user = { ...formData, password: '12345abc', confirmPassword: '12345abc', } : _user = { ...formData };


        const errors = await userValidation(_user);
        if (errors) {
            setErrors(errors);
            setIsLoading(false);
            return
        }
        const users =
            [{
                name: formData.fullName,
                email: formData.email,
                address: formData.address,
                phone: formData.phone,
                company_id: selectedCompany,
                admin_id: user?.id
            }]


        const response = await createUser(users);

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
        setTimeout(() => {
            //redirect('/admin/users');
        }, 1000);
    }
    return (
        <div className='flex flex-col justify-center mb-10  p-4'>
            <Breadcrumb items={breadcrumb} />
            <span className='text-2xl font-bold my-5'>Create User</span>
            <div className='flex flex-col-reverse md:flex-row items-start justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>

                <div className=" w-full md:w-1/2">
                    <Input
                        className='mt-4'
                        type="text"
                        label="Name"
                        placeholder="John Doe"
                        name="name"
                        value={formData.fullName}
                        icon={<UserCircleIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        error={errors.fullName}
                    />

                    <Input
                        className='mt-4'
                        type="email"
                        label="Email"
                        placeholder="john@doe.com"
                        name="email"
                        value={formData.email}
                        icon={<EnvelopeIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                    />
                    <Input
                        className='mt-4'
                        type="text"
                        label="Phone Number"
                        placeholder="+1234567890"
                        name="phone"
                        value={formData.phone}
                        icon={<PhoneIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        error={errors.phone}
                    />
                    <Input
                        className='mt-4'
                        type="text"
                        label="Address"
                        placeholder="123 Main St, Anytown, USA"
                        name="address"
                        value={formData.address}
                        icon={<MapPinIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        error={errors.address}
                    />

                    {/* <Input
                        className='mt-4'
                        type="password"
                        label="Password"
                        placeholder="**********"
                        name="password"
                        value={formData.password}
                        icon={<LockClosedIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={errors?.password}
                    />
                    <Input
                        className='mt-4'
                        type="password"
                        label="Confirm Password"
                        placeholder="**********"
                        name="cpassword"
                        value={formData.confirmPassword}
                        icon={<LockClosedIcon className='w-5 h-5' />}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        error={errors?.confirmPassword}
                    /> */}

                    <SelectInput
                        className='mt-4 z-50'
                        label="Company"
                        options={companies}
                        onChange={handleChange}
                        value={selectedCompany}
                    />


                    <div className="flex items-center justify-center mt-4">
                        <Button
                            label="Save"
                            onClick={handleSubmit}
                            className='w-full bg-accent text-text-light dark:text-text-dark dark:bg-accent'
                            loading={isLoading}
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
