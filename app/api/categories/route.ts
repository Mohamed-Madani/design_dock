import prisma from "@/lib";
import { NextResponse } from 'next/server'

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
export async function POST(request: Request){
    try {
        const json = await request.json()
        const created = await prisma.category.create({
            data: json
        })
        return NextResponse.json(created)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}