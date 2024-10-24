"use client"

import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
// VERSION 1 : importer la database
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'

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
  const [articles, setArticles] = useState<ArticleWithTagsAndComments[]>([])

  // useEffect permet de consommer une API (articles)
  useEffect(() => {
    const fetchArticles = async () => {
      // Récupérer les articles via l'API
      const response = await fetch('/api/article')
      // Récupère les données au format JSON
      const data: ArticleWithTagsAndComments[] = await response.json()
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
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <ArticleCard key={article.id} article={article} />
          </Link>
        ))}
        </div>
    </div>
  )
}

export default ArticlePage