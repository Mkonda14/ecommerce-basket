"use server"

import { db } from "@/lib/db"


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