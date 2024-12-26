"use server"

import { db } from "@/lib/db"


export const getThemes = async () => {
    try {
       return await db.theme.findMany();
    } catch (error) {
        throw new Error("Error while fetching themes" + error)
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

export const getThemeById = async (id: string) => {
    try {
       return await db.theme.findUnique({
        where: {
            id,
        },
       }) 
    } catch (error) {
        throw new Error("Error while fetching theme" + error)
    }
}