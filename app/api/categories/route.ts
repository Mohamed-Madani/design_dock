import prisma from "@/lib";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schéma de validation avec Zod
const categorySchema = z.object({
  name: z.string().min(1, "Le nom de la catégorie est obligatoire."),
});

// GET endpoint to fetch all categories
export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new category
// Expects a JSON body with category data
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = categorySchema.parse(json);
    const newCategory = await prisma.category.create({
      data: {
        name: validatedData.name,
      },
    });
    return NextResponse.json(newCategory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Gestion des erreurs de validation Zod
      return NextResponse.json(
        { error: error.errors.map((err) => err.message) }, // Extraire les messages d'erreur
        { status: 400 } // Code de statut HTTP pour les erreurs de validation
      );
    }

    // Gestion des autres erreurs
    return NextResponse.json(
      { error: "Impossible de créer la catégorie. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
