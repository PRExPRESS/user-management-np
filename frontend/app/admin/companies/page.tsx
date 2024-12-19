'use client'
import Breadcrumb from '@/app/Components/Breadcrumb'

import Input from '@/app/Components/FormInput'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import React, { useEffect, useState } from 'react'

import Table from '../../Components/Table'

import Pagination from '../../Components/Pagination'
import SelectInput from '../../Components/SelectInput'
import Button from '@/app/Components/CustomBotton'
import { getAllCompanies } from '@/app/services/companies.service'

interface Company {
    id: number;
    name:string;
}
const page = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
        const [search, setSearch] = useState('');
        const [searchTerm, setSearchTerm] = useState('');
        const [page, setPage] = useState('1');
        const [limit, setLimit] = useState('10');
        const [totalPages, setTotalPages] = useState(0);
        const [currentPage, setCurrentPage] = useState(1);

    const breadcrumb = [
        {
            title: 'Home',
            link: '/admin'
        },
        {
            title: 'Companies',
            link: '/admin/companies'
        },

    ]
    const headers = [
        {
            header: 'Name',
            key: 'name',
            sortType: 'string'

        },
        

    ]
    const data = [
        { name:  'Acme Inc.' },
        { name:  'Tech Solutions' },
        { name: 'Innovate Ltd.' },
        { name: 'GreenTech' },
        { name:  'Future Corp.' },
        { name:  'HealthCare Co.' },
        { name:  'BuildWorks' },
        { name:  'Smart Design' },
        
    ];

    

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const limits = [
        {
            label: '10',
            value: '10'
        },
        {
            label: '25',
            value: '25'
        },
        {
            label: '50',
            value: '50'
        },
        {
            label: '100',
            value: '100'
        },
    ]

    const handleChange = (selectedOption: any) => {
        console.log('Option selected:', selectedOption);
        setLimit(selectedOption ? selectedOption : '');
    };

    const fetchUsers = async () => {
        const response = await getAllCompanies(currentPage.toString(), limit, searchTerm);

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
        console.log('response', response);
        if (Array.isArray(response.companies)) {
            //console.log('Received an array of companies:', response.companies);
            const refined = response.companies.map((company: any) => {
                return {
                    id: company.id,
                    name: company.name
                }
            })
            
            setCompanies(refined);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);

        }

    }

    useEffect(() => {
        fetchUsers();
        console.log(currentPage, limit);
    }, [currentPage, limit, searchTerm]);

    return (
        <div className='flex flex-col justify-start items-start  h-[85vh] px-4 py-10'>
            <Breadcrumb items={breadcrumb} />
            <span className='text-2xl font-bold my-5'>Companies</span>
            <div className='container overflow-y-auto h-full flex flex-col items-start justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>

            <div className="flex  flex-col-reverse md:flex-row items-end md:items-center justify-between w-full mt-4">
                    <div className="flex flex-row items-center justify-end md:justify-start w-6/12 md:w-2/12">
                        <span className='text-sm text-text-light dark:text-text-dark'>Limit</span>
                        <SelectInput
                            options={limits}
                            label=''
                            onChange={handleChange}
                            value={limit}
                            className='w-1/2 ml-2'
                        />
                    </div>
                    <div className="flex flex-row items-center justify-end w-full md:w-3/12 mb-4 md:mt-1">
                        <Input
                            label=''
                            type='text'
                            placeholder='Search name or email ...'
                            className='w-1/3'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            
                        />
                        <Button
                            label=''
                            className='ml-2'
                            icon={<MagnifyingGlassIcon className='w-5 h-5 text-text-light dark:text-text-dark cursor-pointer hover:text-accent dark:hover:text-accent ' />}
                            onClick={() => setSearchTerm(search)}
                        />
                    </div>
                </div>
                <Table columns={headers as any} data={companies} />


            </div>
            <div className="w-full flex flex-row items-center justify-end mt-4">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    )
}

export default page
