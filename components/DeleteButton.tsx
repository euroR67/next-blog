import { useRouter } from 'next/navigation';
import React from 'react'

interface DeleteButtonProps {
    articleId: string;
}

const DeleteButton = ({ articleId }: DeleteButtonProps) => {
    
    const router = useRouter();

    // Fonction pour supprimer un article
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    
        if (!confirmDelete) return;
    
        try {
            // Méthode 1: fetch DELETE
            await fetch(`/api/article/${articleId}/delete`, {
                method: 'DELETE'
            })
            // Méthode 2: axios
            // const res = await axios.delete(`/api/article/${article.id}/delete`)
            router.push('/article')
        } catch (error) {
            console.error('An error occurred while deleting the article', error)
        }
    }

  return (
    <button
        onClick={handleDelete}
         className='flex gap-2 px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-xs'>
        Delete
    </button>
  )
}

export default DeleteButton