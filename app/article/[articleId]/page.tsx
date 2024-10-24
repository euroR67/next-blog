"use client"

import DeleteButton from '@/components/DeleteButton'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ArticleDetailPage = ({ params }: {params: { articleId: string }}) => {
  
    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)
    const router = useRouter();

    // useEffect permet de consommer l'API (article)
    useEffect(() => {
        const fetchArticle = async () => {
            // Récupérer les data de l'article via l'API
            const response = await fetch(`/api/article/${params.articleId}`)
            // Récupère les données au format JSON
            const data: ArticleWithTagsAndComments = await response.json()
            // Mets dans article le contenu de data récupérer dans l'API
            setArticle(data)
        }
        // Déclencher la fonction fetchArticle
        fetchArticle()
    }, [params.articleId])


    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, articleId: string) => {
        await fetch(`/api/article/${articleId}/delete`, {
            method: 'DELETE',
        });
        router.push('/article');
    };

    return (
    <div className='p-5'>
        {article && (
            <>
                <h1 className='text-2xl font-bold mb-5'>{article?.title}</h1>
                <p>{article?.text}</p>
                <div className='my-5 flex flex-wrap gap-3'>
                    {article?.tags.map((tagArticle: TagArticleType) => (
                        <Tag key={tagArticle.tag.id} text={tagArticle.tag.name} />
                    ))}
                </div>
                <div className='sm:top-5 sm:right-5'>
                    <DeleteButton articleId={article.id} handleDelete={handleDelete} />
                </div>
            </>
        )}
    </div>
  )
}

export default ArticleDetailPage