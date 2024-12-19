'use client';
import React, { useState } from 'react';
import Input from '../Components/FormInput';
import Button from '../Components/CustomBotton';
import Link from 'next/link';
import { userValidation } from '../validations/user-validation';
import toastr from 'toastr';
import { redirect } from 'next/navigation';
import { register } from '../services/auth.service';

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

  const handleSubmit =async ()=>{
    const user ={...formData, phone:'0000000000',address:'address'};
    
    const errors  = await userValidation(user);
    if(errors){
      setErrors(errors);
      return
    }

    const response = await register({...user, name: formData.fullName});

    if(response.error){
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

    toastr.success('Registration successful! Redirecting to login...','', {
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
      redirect('/login');
    }, 1000); 
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800 dark:text-white">
          Register
        </h1>
        <form>
          <div className="mb-4">
            <Input
              type="text"
              label="Name"
              placeholder="Enter your name"
              name="name"
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
              }}
              value={formData.fullName}
              error={errors.fullName}
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });}}
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
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });}}
              value={formData.password}
              error={errors.password}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              name="confirmPassword"
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });}}
              value={formData.confirmPassword}
              error={errors.confirmPassword}
            />
          </div>
          <Button
            label="Register"
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white hover:bg-green-600"
          />
        </form>
        <div className="text-text-light mt-3">
          Already have an account?
          <Link href="/login" className="text-accent hover:text-accent/80">
            {' '}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
