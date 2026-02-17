import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  error, 
  className = '', 
  id,
  children,
  ...props 
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={selectId} className='block text-sm font-medium text-gray-700 mb-2'>
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all bg-white ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className='mt-2 text-sm text-red-600'>{error}</p>
      )}
    </div>
  );
};
