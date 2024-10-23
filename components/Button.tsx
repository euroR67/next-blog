import Link from 'next/link';
import React from 'react'

interface ButtonProps {
  label: string;
  href: string;
}

const Button: React.FC<ButtonProps> = ({ label, href }) => {
  return (
    <Link 
        href={href} className='px-5 py-2 mt-3 block w-fit text-white bg-emerald-900 hover:bg-emerald-700 duration-150 cursor-pointer rounded-lg'>
        {label}
    </Link>
  )
}

export default Button