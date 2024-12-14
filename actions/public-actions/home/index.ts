"use server"

import { db } from "@/lib/db";

export const getProductCardDerniers = async () => {
    try {
        const sneakers = await db.sneaker.findMany({
            where:{
                NOT:{
                    colorSecondaries: {every: { id: ""}}
                }
            },
            include:{
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
            take: 4,
            orderBy: {
                createdAt: 'desc',
            },

        });
        return sneakers;
    } catch (error) {
        throw new Error("Error get sneakers to database: " + error)
    }
}

export const getThemeCards = async () => {
    try {
       return await db.theme.findMany({
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
        throw new Error("Error while fetching themes" + error)
    }
}