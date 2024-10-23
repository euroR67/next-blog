import React from 'react'

interface TagProps {
  text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
  return (
    <span className='text-sm text-gray-500 p-1 px-3 my-2 bg-gray-100 rounded-full border hover:bg-emerald-600 duration-200 hover:text-white'>
        {text}
    </span>
  )
}

export default Tag