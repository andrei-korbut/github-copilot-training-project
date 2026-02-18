import React, { useState } from 'react';

interface DateInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  error,
  disabled = false,
  placeholder = 'dd/mm/yyyy',
  id,
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 8 digits (ddmmyyyy)
    if (input.length > 8) {
      input = input.slice(0, 8);
    }
    
    // Format as dd/mm/yyyy
    let formatted = '';
    if (input.length > 0) {
      formatted = input.slice(0, 2);
      if (input.length >= 3) {
        formatted += '/' + input.slice(2, 4);
      }
      if (input.length >= 5) {
        formatted += '/' + input.slice(4, 8);
      }
    }
    
    setDisplayValue(formatted);
    onChange(formatted);
  };

  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
