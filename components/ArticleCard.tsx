import React from 'react'
import { formatDate } from '@/lib/utils'
import Tag from './Tag';
import DeleteButton from './DeleteButton';

interface ArticleCardProps {
    article: ArticleWithTagsAndComments;
    onDelete: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onDelete }) => {
  
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/article/${article.id}/delete`, {
        method: 'DELETE'
      })

      if (response.ok) {
        onDelete(id);
      }
      
    } catch (error) {
        console.error('Error deleting article', error);
    }
  }
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
      event.preventDefault();
      event.stopPropagation();
      handleDelete(id);
  };
    return (
        <div 
            key={article.id} 
            className='border border-slate-400 rounded-lg p-5 hover:bg-emerald-50 hover:-translate-y-1 transition-all cursor-pointer'>
            {/* Titre de l'article */}
            <h2 className='text-2xl font-semibold text-emerald-700'>{article.title}</h2>

            {/* Afficher date heure */}
            <p className='text-sm text-gray-500'>{formatDate(new Date(article.createdAt))}</p>

            {/* Liste des tags */}
            <div className='flex flex-wrap gap-2'>
              {article.tags.map((tagArticle: { tag: { id: string; name: string } }) => (
                // <span 
                //   key={tagArticle.tag.id} 
                //   className='text-sm text-gray-500 p-1 px-3 my-2 bg-gray-100 rounded-full border hover:bg-emerald-600 duration-200 hover:text-white'>
                //   {tagArticle.tag.name}
                // </span>
                <Tag key={tagArticle.tag.id} text={tagArticle.tag.name} />
              ))}
            </div>
            {/* Contenu de l'article */}
            <p className='mt-3 line-clamp-4'>{article.text}</p>

            <div className='sm:top-5 sm:right-5'>
              <DeleteButton articleId={article.id} handleDelete={handleDeleteClick} />
            </div>
        </div>
    )
}

export default ArticleCard