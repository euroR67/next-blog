// import { useRouter } from 'next/navigation';
import React from 'react'

interface DeleteButtonProps {
    articleId: string;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const DeleteButton = ({ articleId, handleDelete }: DeleteButtonProps) => {
    const onClick=(e:React.MouseEvent<HTMLButtonElement>)=>{
        handleDelete(e, articleId)
    }
    // const router = useRouter();
    return (
        <button
            onClick={onClick}
            className='flex gap-2 px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-xs'>
            Delete
        </button>
    )
}

export default DeleteButton