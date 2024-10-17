"use server"

import { db } from "@/lib/db"

export const getCategories = async () => {
    try {
       return await db.category.findMany() 
    } catch (error) {
        throw new Error("Error while fetching categories" + error)
    }
}

export const getThemes = async () => {
    try {
       return await db.theme.findMany() 
    } catch (error) {
        throw new Error("Error while fetching themes" + error)
    }
}
export const getTags = async () => {
    try {
       return await db.tag.findMany() 
    } catch (error) {
        throw new Error("Error while fetching tags" + error)
    }
}