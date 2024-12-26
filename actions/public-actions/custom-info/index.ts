"use server"

import { db } from "@/lib/db";

export const getGraffitiCards = async () => {
    try {
       return await db.graffiti.findMany({
        include: {
            image: {
                select: {
                    publicId: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                },
            },
            category: {
                select: {
                    name: true,
                    secondName: true,
                },
            },      
        }
       }) 
    } catch (error) {
        throw new Error("Error while fetching graffitis card" + error)
    }
}