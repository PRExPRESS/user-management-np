import React from 'react';

type ButtonProps = {
  label: string; // Button text
  onClick: () => void; // Click event handler
  type?: 'button' | 'submit' | 'reset'; // Button type
  loading?: boolean; // Whether the button is in loading state
  disabled?: boolean; // Whether the button is disabled
  className?: string; // Custom classes to style the button
  icon?: React.ReactNode; // Optional icon before the text
  fullWidth?: boolean; // Make the button full width
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  icon,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center px-4 py-2  font-semibold transition-all ${
        fullWidth ? 'w-full' : ''
      } ${loading ? 'bg-gray-400 cursor-not-allowed' : ''} 
         disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full border-t-2 border-white w-5 h-5 mr-2"></div>
      ) : (
        icon && <div className="mr-2">{icon}</div>
      )}
      {label}
    </button>
  );
};

export default Button;
