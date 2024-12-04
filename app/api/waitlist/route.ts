import prisma from "@/lib";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schéma de validation avec Zod
const waitlistSchema = z.object({
  email: z.string().email("L'adresse email est invalide."),
});

// GET endpoint to fetch all waitlist
export async function GET(request: Request) {
  try {
    const subscriber = await prisma.waitlist.findMany();
    return NextResponse.json(subscriber);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 }
    );
  }
}

// POST endpoint to create a new waitlist
// Expects a JSON body with waitlist data
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validatedData = waitlistSchema.parse(json);
    const newSubscriber = await prisma.waitlist.create({
      data: {
        email: validatedData.email,
      }
    });
    return NextResponse.json(newSubscriber);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create waitlist" },
      { status: 500 }
    );
  }
}