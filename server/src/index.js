import express from "express";
import app from "./app.js";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 3000;

async function connectDB() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw error;
    }
}

connectDB().
    then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Server failed to start due to database connection error:", error);
        process.exit(1);
    });

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});