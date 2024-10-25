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
  
  // Fonction handleDelete pour supprimer un article sans recharger la page
  const handleDelete = (deletedArticleId: string) => {
    // Met à jour l'état des articles en filtrant l'article supprimé
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== deletedArticleId)
    );
  }

  // Fonction handleSubmit pour créer un article
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const text = (form.elements.namedItem("text") as HTMLTextAreaElement)
      .value;

    try {
      const response = await fetch("/api/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text }),
      });

      if (response.ok) {
        const newArticle: ArticleWithTagsAndComments = await response.json();
        setArticles((prevArticles) => [newArticle, ...prevArticles]);

        form.reset();
      } else {
        console.error("Erreur lors de la création de l'article");
      }
    } catch (error) {
      console.error("[CREATE ARTICLE]", error);
    }
  };
  return (
    <div className='p-5'>
        <h1 className='text-4xl font-bold mb-5'>Blog</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <ArticleCard
            key={article.id}
            article={article}
            onDelete={handleDelete} // Passe la fonction handleDelete
          />
          </Link>
        ))}
        </div>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-2 w-[300ox] mt-5'>
            <input 
              className='px-2 py-1 rounded-sm border border-gray-300'
              type="text" name="title" placeholder='Title'/>
            <textarea
              className='px-2 py-1 rounded-sm border border-gray-300'
              name="text" placeholder='text'/>
            <button 
              type='submit'
              className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Create article
            </button>
        </form>
    </div>
  )
}

export default ArticlePage