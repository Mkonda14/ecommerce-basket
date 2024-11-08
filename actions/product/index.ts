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

export const getProductCardDerniers = async () => {
    try {
        const sneakers = await db.sneaker.findMany({
            select:{
                id: true,
                marque: true,
                model: true,
                price: true,
                isPromo: true,
                stock: true,
                promoPrice: true,
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
                },
                tags:{
                    select:{
                        name: true
                    },
                    take: 3
                },
            },
            take: 8,
            orderBy: {
                createdAt: 'desc',
            },

        });
        return sneakers;
    } catch (error) {
        throw new Error("Error get sneakers to database: " + error)
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

export const getColorPrimaries = async () => {
    try {
        const colors = await db.sneaker.findMany({
            select: {
                colorPrimary: true,
                colorPrimaryName: true,
            },
        })
        const exists: string[] = [];
        return colors.map(({colorPrimary, colorPrimaryName})=> {
            if(!exists.includes(colorPrimaryName)){
                exists.push(colorPrimaryName);
                return {name: colorPrimaryName, code: colorPrimary}
            }
        })
    } catch (error) {
        throw new Error("Error get sneaker colors primary to database: " + error)
    }
}