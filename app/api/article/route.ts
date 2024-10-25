import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const articles = await db.article.findMany({
            // Liste des articles ordonnée par date de création
            orderBy: {
              createdAt: 'desc'
            },
            // Inclure les tags associés à chaque article
            include: {
              // Inclure les tags de chaque article
              tags: {
                // Inclure les informations des tags
                include: {
                  // Inclure le nom du tag
                  tag: true
                }
              }
            }
          })
        // Retourne une réponse au format JSON
        return NextResponse.json(articles);
    } catch (error) {
        console.error("[ARTICLES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    const { title, text } = await req.json();

    const slug = title.toLowerCase().replace(/ /g, "-");

    // Vérification que les données requises sont bien présentes
    if (!title || !text) {
      return new Response(JSON.stringify({ message: "Missing title or text" }), {
        status: 400,
        headers: {'Content-Type': 'application/json'}
      });
    }

    const article = await db.article.create({
      data: {
        title,
        text: text,
        slug,
      },
    });

    return new Response(JSON.stringify(article), {
      status: 201,
      headers: {'Content-Type': 'application/json'}
    });

  } catch (error) {
    console.error("Erreur lors de la création de l'article", error);
  }
}