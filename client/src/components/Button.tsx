import React from 'react';

interface ButtonProps {
  children: string;
  blue?: boolean;
  red?: boolean;
  green?: boolean;
  black?: boolean;
  orange?: boolean;
  chris?: boolean;
  stewie?: boolean;
  meg?: boolean;
  mobile?: boolean;
  form?: boolean;
  desktop?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  blue,
  red,
  green,
  black,
  orange,
  chris,
  stewie,
  meg,
  mobile,
  desktop,
  form,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-sm lg:text-base rounded-lg
              text-white font-semibold shadow-md hover:scale-105 whitespace-nowrap
      ${blue ? 'bg-blue-700 hover:bg-blue-900 shadow-lg shadow-blue-900' : ''}
      ${red ? 'bg-red-700 hover:bg-red-900 shadow-lg shadow-red-900' : ''}
      ${green ? 'bg-green-700 hover:bg-green-900 shadow-lg shadow-green-900' : ''}
      ${black ? 'bg-black shadow-lg shadow-black' : ''}
      ${orange ? 'bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-700' : ''}
      ${chris ? 'bg-fm2-chris hover:bg-fm2-chris-dark shadow-lg shadow-fm2-chris-dark' : ''}
      ${stewie ? 'bg-fm2-stewie hover:bg-fm2-stewie-dark shadow-lg shadow-fm2-stewie-dark' : ''}
      ${meg ? 'bg-fm2-meg hover:bg-fm2-meg-dark shadow-lg shadow-fm2-meg-dark' : ''}
      ${mobile ? 'px-3 py-2 my-2 w-full' : ''}
      ${desktop ? 'px-3 lg:px-4 py-4 lg:py-5' : ''}
      ${form ? 'px-3 lg:px-4 py-2' : ''}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
