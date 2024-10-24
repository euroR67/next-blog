import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { articleId: string}} ) 
{
    try {
        // Extraire l'identifiant de l'article
        const { articleId } = params;

        // Vérifier si l'article existe
        const article = await db.article.findUnique({
            where: {
                id: articleId
            }
        });

        // Si l'article n'existe pas retourner une erreur 404
        if (!article) {
            return new NextResponse('Article not found', { status: 404 });
        }

        // Supprimer l'article
        await db.article.delete({
            where: {
                id: articleId
            }
        });

        // Retourner une réponse de succès
        return new NextResponse('Article deleted successfully', { status: 200 });

    } catch (error) {
        console.error("[ARTICLE]", error);
        
        return new NextResponse("Internal Error", { status: 500 });
    }
}