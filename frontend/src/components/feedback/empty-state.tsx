import React from 'react';

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  icon, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <p className="text-gray-600 text-center text-lg">
        {message}
      </p>
    </div>
  );
};
