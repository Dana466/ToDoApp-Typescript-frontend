import React from 'react';

interface ButtonProps {
  text: string;
  page: 'signup' | 'login'; // Restricting to specific values for clarity
  submitFunction: (e: React.FormEvent) => Promise<void>; // Accepts an event parameter
}

const Button: React.FC<ButtonProps> = ({
  text,
  page,
  submitFunction,
}) => {

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await submitFunction(e);
  };

  return (
    <button id={page} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
