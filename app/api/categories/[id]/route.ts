import prisma from "@/lib";
import { NextResponse } from "next/server";

// This file handles API routes for individual category operations
// The [id] in the folder name is used as a dynamic route parameter

// GET endpoint to fetch a single category by ID
export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const id= params.id
    const category = await prisma.category.findUnique(
        {where: {id: id}}
    );
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// PUT endpoint to update an existing category
export async function PUT(request: Request, {params}: {params: {id: string}}) {
  try {
      const id = params.id;
      const json = await request.json();
    const updated = await prisma.category.update({
      where: {id: id},
      data: json
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
        { error: "Failed to update category" },
        { status: 500 }
      );
  }
  
}

// DELETE endpoint to remove a category
export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    try {
        const id= params.id
        const deleted = await prisma.category.delete({
            where: {id: id}
        })
        return NextResponse.json(deleted)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
          );
    }
}
