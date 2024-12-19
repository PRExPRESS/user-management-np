'use client'
import React, { useState } from 'react'
import Input from '../Components/FormInput'
import Button from '../Components/CustomBotton'
import Link from 'next/link'

import { userValidation } from '../validations/user-validation';
import toastr from 'toastr';
import { redirect } from 'next/navigation';
import { address } from 'motion/react-client'
import { useAuth } from '../context/AuthContext'
import { adminLogin } from '../services/auth.service'
type errorType = { 
  fullName?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  phone?: string
 };
const page = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<errorType>({});
  const {login} = useAuth();

  const handleSubmit =async ()=>{
    const user ={...formData, phone:'0000000000',address:'address',fullName:'fullName',confirmPassword:formData.password};
    
    const errors  = await userValidation(user);
    if(errors){
      setErrors(errors);
      return
    }

    const response = await adminLogin({ email: formData.email, password: formData.password });
    console.log('response',response);
      if (response.error) {
        const showErrorToast = () => {
          toastr.error(response.error.message,'', {
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
        };
        showErrorToast();
        setErrors(response.error.message);
        
      }
      if(response.status === 201){
        login(response.user as any);
        toastr.success('Login successful! Redirecting to dashboard... ','', {
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
        redirect('/admin');
      }

    // login(formData.email,formData.password);
    // setTimeout(() => {
    //   redirect('/admin');
    // }, 500); 
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800 dark:text-white">Login</h1>
        <form>
          <div className="mb-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => {setFormData({...formData,email:e.target.value})}}
              value={formData.email}
              error={errors.email}
            />
          </div>
          <div className="mb-4">
          <Input 
            type="password"
            label="Password"
            placeholder="Enter your password"
            name="password"
            onChange={(e) => {setFormData({...formData,password:e.target.value})}}
            value={formData.password}
            error={errors.password}
          />
          </div>
          <Button 
          label="Login" 
          onClick={ handleSubmit}
          className='w-full bg-green-500 text-white hover:bg-green-600'
          />
        </form>
        <div className='text-text-light mt-3' >Don't have an account?<Link href="/register" className='text-accent hover:text-accent/80'> Register</Link></div>
      </div>
    </div>
  )
}

export default page
