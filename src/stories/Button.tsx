import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
    label,
    onClick,
}: ButtonProps) => {
  return (
      <button
          className='bg-blue-500 dark:bg-pink-600 text-pink p-4 rounded-md shadow-2xl'
          onClick={onClick}
      >
        {label}
      </button>
  );
};
