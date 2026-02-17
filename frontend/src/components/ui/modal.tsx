import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  title, 
  children,
  maxWidth = 'md'
}) => {
  if (!isOpen) return null;
  
  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };
  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center min-h-screen z-50 p-4'>
      <div className={`bg-white rounded-2xl shadow-lg w-full ${maxWidthStyles[maxWidth]} p-8 space-y-6`}>
        {title && (
          <h2 className='text-lg font-bold text-gray-900'>{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};
