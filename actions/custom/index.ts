"use server"

import { db } from "@/lib/db";

export const getProductCustom = async () => {
    try {
        const sneakers = await db.sneaker.findMany({
            where:{
                 colorSecondaries: {every: { id: ""}}
            },

            include:{
                images:{
                    select:{
                        publicId: true,
                    },
                    take: 1,
                },
                tags:{
                    select:{
                        name: true
                    },
                    take: 3
                },
            },
            orderBy: {
                createdAt: 'desc',
            },

        });
        return sneakers;
    } catch (error) {
        throw new Error("Error get sneakers to database: " + error)
    }
}