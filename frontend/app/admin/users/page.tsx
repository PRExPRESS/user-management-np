'use client'
import Breadcrumb from '@/app/Components/Breadcrumb'

import Input from '@/app/Components/FormInput'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import React, { use, useEffect, useMemo, useState } from 'react'

import Table from '../../Components/Table'

import Pagination from '../../Components/Pagination'
import SelectInput from '../../Components/SelectInput'

import { getAllUsers, userDel } from '@/app/services/users.service'

import toastr from 'toastr';
import Button from '@/app/Components/CustomBotton'
import { redirect, useRouter } from 'next/navigation'
import Swal from 'sweetalert2'



interface Users {
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string,
    company: string
}
const page = () => {

    const [userData, setUserData] = useState<Users[]>([]);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState('1');
    const [limit, setLimit] = useState('10');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (selectedOption: any) => {
        console.log('Option selected:', selectedOption);
        setLimit(selectedOption ? selectedOption : '');
    };

    const fetchUsers = async () => {
        const response = await getAllUsers(currentPage.toString(), limit, searchTerm);

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
        if (Array.isArray(response.users)) {
            const refined = response.users.map((user: any) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    company: user.company.name,
                }
            });
            setUserData(refined);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);

        }

    }

    useEffect(() => {
        fetchUsers();
        console.log(currentPage, limit);
    }, [currentPage, limit, searchTerm]);

    // Search users
    // const filteredUsers = useMemo(() => {
    //     if (!search) {
    //         return userData; 
    //     }
    //     return userData.filter(user =>
    //         user.name.toLowerCase().includes(search.toLowerCase()) ||
    //         user.email.toLowerCase().includes(search.toLowerCase())
    //     );
    // }, [userData, search]);


    const breadcrumb = [
        {
            title: 'Home',
            link: '/admin'
        },
        {
            title: 'Users',
            link: '/admin/users'
        },

    ]
    const headers = [
        {
            header: 'Name',
            key: 'name',
            sortType: 'string'

        },
        {
            header: 'Email',
            key: 'email',
            sortType: undefined
        },
        {
            header: 'Phone',
            key: 'phone',
            sortType: undefined
        },
        {
            header: 'Address',
            key: 'address',
            sortType: undefined
        },
        {
            header: 'Company',
            key: 'company',
            sortType: undefined
        },

    ]


    // Pagination
    //const totalPages = 3;
    

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

    //handle update
    const handleUpdate = (value: any) => {
        redirect(`/admin/edit-user/${value.id}`);
    }
    //handle delete
    const handleDelete = (value: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              deleteUser(value.id);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        console.log(value);
    }
    const route = useRouter();
    const deleteUser = async (id: number) => {
        const res = await userDel(id);
        route.refresh();
        if(res.error){
            toastr.error(res.error, '', {
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
        })
        return
    }
    }

    return (
        <div className='flex flex-col justify-start items-start  min-h-[85vh] px-4 py-10 overflow-y-auto'>
            <Breadcrumb items={breadcrumb} />
            <span className='text-2xl font-bold my-5'>Users</span>
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
                <Table columns={headers as any} data={userData} onUpdate={handleUpdate} onDelete={handleDelete} />


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
