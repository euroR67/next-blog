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
    <div>
        <h1 className='text-2xl font-bold'>Blog</h1>
        {articles.map((article: { id: string; title: string; text: string; createdAt: Date; tags: { tag: { id: string; name: string } }[] }) => (
          <div key={article.id}>
            {/* Titre de l'article */}
            <h2 className='text-2xl font-semibold text-emerald-700'>{article.title}</h2>

            {/* Afficher date heure */}
            <p className='text-sm text-gray-500'>{formatDate(article.createdAt)}</p>

            {/* Liste des tags */}
            {article.tags.map((tagArticle: { tag: { id: string; name: string } }) => (
              <span key={tagArticle.tag.id} className='text-sm text-gray-500 p-1 bg-gray-100 rounded-full border'>
                {tagArticle.tag.name}
              </span>
            ))}
            {/* Contenu de l'article */}
            <p>{article.text}</p>
          </div>
        ))}
    </div>
  )
}

export default ArticlePage