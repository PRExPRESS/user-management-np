'use client'
import React from 'react';

type InputProps = {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time' | 'week' | 'month' | 'color' | 'range' |'file' | 'checkbox' | 'radio' | 'hidden' | 'submit' | 'reset' | 'button'; 
  label?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder?: string; 
  error?: string; 
  icon?: React.ReactNode; 
  className?: string; 
  disabled?: boolean; 
  required?: boolean; 
  autoFocus?: boolean; 
  name?: string; 
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  error,
  icon,
  className,
  disabled = false,
  required = false,
  autoFocus = false,
  name,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block dark:text-text-dark text-gray-700 text-sm mb-2" htmlFor={name}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`w-full p-2 border  focus:outline-none focus:ring-2 focus:ring-accent ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ' dark:bg-gray-800'
          } ${error ? 'border-red-500' : 'border-gray-300'} ${icon ? 'pl-10' : ''}`}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
