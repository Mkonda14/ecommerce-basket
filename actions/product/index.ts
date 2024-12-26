"use server"

import { db } from "@/lib/db";

export const getProducts = async () => {
    try {

        const sneakers = await db.sneaker.findMany({
            orderBy:{
                createdAt:'desc'
            },
            include:{
                category: {
                    select:{
                        name: true,
                    },
                }
            },

        });
        return sneakers;
        
    } catch (error) {
        throw new Error("Error get all sneakers to database: " + error)
    }
}

export const getSneakerUpdatedById = async (id: string) => {
    try {
        const sneaker = await db.sneaker.findUnique({
            where: {
                id
            },
            select:{
                id: true,
                marque: true,
                model: true,
                description: true,
                reduction: true,
                price: true,
                isPromo: true,
                isCustomByGraffiti: true,
                stock: true,
                categoryId: true,
                createdAt: true,
                updatedAt: true,
                colorPrimaries: {
                    select:{
                        color: true,
                        name: true,
                        sizes:{
                            select:{
                                size: true,
                                quantity: true,
                            },
                        },
                    },
                },
                tags:{
                    select:{
                        id: true,
                        name: true,
                    },
                },
            }
        });
        return sneaker;
        
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}

export const getColorPrimaries = async () => {
    try {
        const colors = await db.colorPrimary.findMany({
            distinct: ["name"],
            select: {
                color: true,
                name: true,
            },
        })
        return colors
    } catch (error) {
        throw new Error("Error get sneaker colors primary to database: " + error)
    }
}