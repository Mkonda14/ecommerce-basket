"use server"

import { db } from "@/lib/db";

export const getProducts = async () => {
    try {

        const sneakers = await db.sneaker.findMany({
            select:{
                marque: true,
                model: true,
                price: true,
                isPromo: true,
                stock: true,
                images:{
                    select:{
                        publicId: true,
                    },
                    take: 1,
                },
                category: {
                    select:{
                        name: true,
                    },
                }
            },

        });
        return sneakers;
        
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}