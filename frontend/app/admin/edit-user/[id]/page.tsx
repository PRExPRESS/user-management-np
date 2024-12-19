'use client'
import Breadcrumb from '@/app/Components/Breadcrumb'
import Button from '@/app/Components/CustomBotton'
import Input from '@/app/Components/FormInput'
import { EnvelopeIcon, LockClosedIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect } from 'react'

import { userValidation } from '../../../validations/user-validation';
import toastr from 'toastr';
import { redirect } from 'next/navigation';
import SelectInput from '@/app/Components/SelectInput'
import { getCompanies } from '@/app/services/companies.service'
import { getUserById, updateUser } from '@/app/services/users.service'
import { useAuth } from '@/app/context/AuthContext'
import { getAdminById, updateAdmin } from '@/app/services/auth.service'

type errorType = {
    fullName?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    phone?: string,
    address?: string
};

const page = () => {
    const [isAdmin, setIsAdmin] = React.useState(false);
    const searchParams = useSearchParams();
    const router = useParams();
    const { id } = router;
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    });
    const [companies, setCompanies] = React.useState<any[]>([]);
    const [selectedCompany, setSelectedCompany] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const [errors, setErrors] = React.useState<errorType>({});
    const { user } = useAuth();
    useEffect(() => {
        if (searchParams.get('admin') === 'true') {
            setIsAdmin(true);
        }
        console.log(searchParams.get('admin'));
    }, [searchParams]);
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
            title: 'Edit User',
            link: '/admin/edit-user/'
        }
    ];

    //fetch user
    useEffect(() => {
        const fetchData = async () => {
            let response
            if (isAdmin) {
                response = await getAdminById(+user.id)
            } else {
                response = await getUserById(+id!)
            }

            if (response.error) {
                toastr.error(response.error, '', {
                    closeButton: true,
                    progressBar: true,
                    positionClass: 'toast-top-right',
                })
                return
            }

            if (response) {
                setFormData({
                    fullName: response.name || '',
                    email: response.email || '',
                    password: '',
                    confirmPassword: '',
                    phone: response.phone || '',
                    address: response.address || '',
                })
                if (!isAdmin) {
                    setSelectedCompany(response.company_id || '')
                }
            }
        }

        fetchData()
    }, [isAdmin, id, user.id])


    //fetch all companies
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

    //handle submit
    const handleSubmit = async () => {
        let user: any = formData;
        setIsLoading(true);

        if(formData.password.trim() === '' || formData.confirmPassword.trim() === ''){
            user = {...user, password: '12345abc', confirmPassword: '12345abc'}
        }
        if(formData.address.trim() === '') user = {...user, address: 'N/A'}
        console.log('user', user);
        const errors = await userValidation(user);
        if (errors) {
            setErrors(errors);
            return
        }
        let response;


        const adminUpdated: {
            name: string;
            email: string;
            address: string;
            phone: string;
            password?: string;
        } = {
            name: user.fullName,
            email: user.email,
            address: user.address,
            phone: user.phone,
        };


        if (formData.password.trim() !== '') {
            adminUpdated.password = formData.password;
        }

        if (isAdmin) {
            response = await updateAdmin(+id!, adminUpdated);
        }

        response = await updateUser({
            name: user.fullName,
            email: user.email,
            address: user.address,
            phone: user.phone,
            company_id: selectedCompany,
            admin_id: user?.id
        }, +id!);

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

        toastr.success('Updated successfully!', '', {
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
            redirect('/admin/users');
        }, 2000);
    }
    return (
        <div className='flex flex-col justify-center w-full mb-10   p-4'>
            <Breadcrumb items={breadcrumb} />
            <span className='text-2xl font-bold my-5'>{isAdmin ? 'Edit Profile' : 'Edit User'}</span>
            <div className='flex flex-row items-center justify-start w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>
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

                    {
                        isAdmin && (
                            <>
                                <Input
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
                                />
                            </>
                        )
                    }
                    {
                        !isAdmin && (
                            <>
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
                                <SelectInput
                                    className='mt-4 z-50'
                                    label="Company"
                                    options={companies}
                                    onChange={handleChange}
                                    value={selectedCompany}
                                />
                            </>
                        )
                    }


                    <div className="flex items-center justify-center mt-4">
                        <Button
                            label="Save"
                            onClick={handleSubmit}
                            className='w-full bg-accent text-text-light dark:text-text-dark dark:bg-accent'
                            loading={isLoading}
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default page
