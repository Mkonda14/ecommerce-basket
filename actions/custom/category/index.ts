"use server"

import { db } from "@/lib/db"

export const getCategoryCustoms = async () => {
    try {
       return await db.categoryCustom.findMany()
    } catch (error) {
        throw new Error("Error while fetching categories customs" + error)
    }
}


export const getCategoryCustomById = async (id: string) => {
    try {
       return await db.categoryCustom.findUnique({
        where: {
            id,
        },
       }) 
    } catch (error) {
        throw new Error("Error while fetching category custom" + error)
    }
}
