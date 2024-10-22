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
        return NextResponse.json(articles);
    } catch (error) {
        console.error(error);
        return { status: 500, body: { error: "Internal server error" } };
    }
}