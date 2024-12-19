'use client'
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
interface OptionProps {
    value: string;
    label: string;
}

interface SelectInputProps {
    options: OptionProps[];
    onChange: (value: string) => void;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    label?: string;
    error?: string;
}
const SelectInput: React.FC<SelectInputProps> = ({ options, onChange, value, placeholder, disabled, className, label, error}) => {
    const {theme} = useTheme();
    const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) return null;
    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderColor: state.isFocused
                ? '#4CAF50'  // Change border color on focus
                : state.isDisabled
                    ? '#D3D3D3'  // Change border color when disabled
                    : '#D1D5DB', // Default border color (gray)
            backgroundColor: theme === 'dark' ? '#1f2937  ' : '#f9fafb', // dark background when not disabled
            cursor: state.isDisabled ? 'not-allowed' : 'pointer', // Disable cursor for disabled state
            paddingLeft: '10px',
            paddingTop: '2px',
            paddingBottom: '2px',
            boxShadow: 'none',
            borderRadius: '0',
            transition: 'border-color 0.2s ease',
            width: '100%',
            height: '40px',
            
            fontSize: '1rem',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
            borderRadius: '0.375rem',
            padding: '0',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            marginTop: '',
            maxHeight: '100px', // Set maximum height for the options menu
            overflowY: 'auto',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#4CAF50'  // Highlight selected option
                : state.isFocused
                    ? '#2F855A'  // Focused option color
                    : '#1F2937', // Default background color
            color: state.isDisabled ? '#9E9E9E' : '#FFFFFF', // Text color when disabled
            cursor: state.isDisabled ? 'not-allowed' : 'pointer', // Disable cursor for disabled option
            padding: '10px',
            fontSize: '1rem',
            
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: theme === 'dark' ? '#FFFFFF' : '#1F2937', //  selected value
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#A0AEC0', // Light gray placeholder
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: '#A0AEC0', // Light gray for dropdown indicator
        }),
    }
    return (
        <div className={`w-full ${className}`}>
            <label htmlFor="" className="block dark:text-text-dark text-gray-700 text-sm ">{label}</label>
            <Select
                options={options}
                value={options.find((option) => option.value === value)}
                onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : '')}
                placeholder={placeholder}
                isDisabled={disabled}
                styles={customStyles}
                defaultValue={options[0]}
                isSearchable={true}
                
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    )
}

export default SelectInput
