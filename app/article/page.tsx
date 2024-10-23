"use client"
// VERSION 1 : importer la database
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'

const ArticlePage = () => {

  // VERSION 1 , requête au sein même de la vue
  // // Récupérer la liste des articles
  // const articles = await db.article.findMany({
  //   // Liste des articles ordonnée par date de création
  //   orderBy: {
  //     createdAt: 'desc'
  //   },
  //   // Inclure les tags associés à chaque article
  //   include: {
  //     // Inclure les tags de chaque article
  //     tags: {
  //       // Inclure les informations des tags
  //       include: {
  //         // Inclure le nom du tag
  //         tag: true
  //       }
  //     }
  //   }
  // })

  // VERSION 2 : HOOKS
  const [articles, setArticles] = useState([])

  // useEffect permet de consommer une API (articles)
  useEffect(() => {
    const fetchArticles = async () => {
      // Récupérer les articles via l'API
      const response = await fetch('/api/article')
      // Récupère les données au format JSON
      const data = await response.json()
      // Mets dans article le contenu de data récupérer dans l'API
      setArticles(data)
    }
    // Appel de la fonction fetchArticles
    fetchArticles()
  }, [])
  
  return (
    <div className='p-5'>
        <h1 className='text-4xl font-bold mb-5'>Blog</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {articles.map((article: { id: string; title: string; text: string; createdAt: Date; tags: { tag: { id: string; name: string } }[] }) => (
          <div 
            key={article.id} 
            className='border border-slate-400 rounded-lg p-5 hover:bg-emerald-50 hover:-translate-y-1 transition-all cursor-pointer'>
            {/* Titre de l'article */}
            <h2 className='text-2xl font-semibold text-emerald-700'>{article.title}</h2>

            {/* Afficher date heure */}
            <p className='text-sm text-gray-500'>{formatDate(article.createdAt)}</p>

            {/* Liste des tags */}
            <div className='flex flex-wrap gap-2'>
              {article.tags.map((tagArticle: { tag: { id: string; name: string } }) => (
                <span 
                  key={tagArticle.tag.id} 
                  className='text-sm text-gray-500 p-1 px-3 my-2 bg-gray-100 rounded-full border hover:bg-emerald-600 duration-200 hover:text-white'>
                  {tagArticle.tag.name}
                </span>
              ))}
            </div>
            {/* Contenu de l'article */}
            <p className='mt-3 line-clamp-4'>{article.text}</p>
          </div>
        ))}
        </div>
    </div>
  )
}

export default ArticlePage