import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tags = await db.tag.findMany({
            // Liste des tags ordonnée par date de création
            orderBy: {
              name: 'asc'
            }
          })
        // Retourne une réponse au format JSON
        return NextResponse.json(tags);
    } catch (error) {
        console.error("[TAGS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}