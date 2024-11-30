import { PrismaClient } from "@prisma/client";

// Declare a variable to hold the PrismaClient instance
let prisma: PrismaClient;

// Initialize PrismaClient based on the environment
if (process.env.NODE_ENV !== "production") {
    // In development, create a new PrismaClient instance for each request
    prisma = new PrismaClient();
} else {
    // In production, reuse the PrismaClient instance to avoid exhausting database connections
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

// Export the PrismaClient instance for use in other parts of the application
export default prisma;