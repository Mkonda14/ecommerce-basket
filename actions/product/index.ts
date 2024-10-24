"use server"

import { db } from "@/lib/db";

export const getProducts = async () => {
    try {

        const sneakers = await db.sneaker.findMany({
            select:{
                id: true,
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
        throw new Error("Error get all sneakers to database: " + error)
    }
}

export const getProductCard = async (id: string) => {
    try {
        const sneaker = await db.sneaker.findUnique({
            where: {
                id
            },
            select:{
                id: true,
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
                sizes: {
                    select:{
                        size: true,
                        quantity: true,
                    },
                },
                colorSecondaries:{
                    select:{
                        color: true,
                        name: true,
                    },
                }
            },

        });
        return sneaker;
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}

export const getProductById = async (id: string) => {
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
                price: true,
                isPromo: true,
                promoPrice: true,
                stock: true,
                colorPrimary: true,
                colorPrimaryName: true,
                categoryId: true,
                createdAt: true,
                updatedAt: true,
                tags:{
                    select:{
                        id: true,
                        name: true,
                    },
                },
                themes:{
                    select:{
                        id: true,
                    },
                },
                colorSecondaries:{
                    select:{
                        color: true,
                        name: true,
                    },
                },
                sizes:{
                    select:{
                        size: true,
                        quantity: true,
                    },
                },
            }
        });
        return sneaker;
        
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}