"use server"

import { db } from "@/lib/db";

export const getProducts = async () => {
    try {

        const sneakers = await db.sneaker.findMany();
        return sneakers;
        
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}