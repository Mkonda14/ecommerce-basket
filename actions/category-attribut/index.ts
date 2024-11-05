"use server"

import { db } from "@/lib/db"

export const getCategorySneakers = async () => {
    try {
       return await db.categorySneaker.findMany()
    } catch (error) {
        throw new Error("Error while fetching categories sneakers" + error)
    }
}

export const getTagSneakers = async () => {
    try {
       return await db.tagSneaker.findMany() 
    } catch (error) {
        throw new Error("Error while fetching tags" + error)
    }
}

export const getCategorySneakerById = async (id: string) => {
    try {
       return await db.categorySneaker.findUnique({
        where: {
            id,
        },
       }) 
    } catch (error) {
        throw new Error("Error while fetching category sneaker" + error)
    }
}

export const getTagSneakerById = async (id: string) => {
    try {
       return await db.tagSneaker.findUnique({
        where: {
            id,
        },
       }) 
    } catch (error) {
        throw new Error("Error while fetching tag" + error)
    }
}

// ---- Theme

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
        select: {
            id: true,
            name: true,
            description: true,
            popularity: true,
            createdAt: true,
            updatedAt: true,
            categoryId: true,
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
                    globalName: true,
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

export const getCategoryThemes = async () => {
    try {
       return await db.categoryTheme.findMany()
    } catch (error) {
        throw new Error("Error while fetching categories themes" + error)
    }
}

export const getCategoryThemeById = async (id: string) => {
    try {
       return await db.categoryTheme.findUnique({
        where: {
            id,
        },
       }) 
    } catch (error) {
        throw new Error("Error while fetching category theme" + error)
    }
}