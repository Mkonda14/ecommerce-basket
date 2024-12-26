"use server"

import { db } from "@/lib/db"

export const getCategorySneakers = async () => {
    try {
       return await db.categorySneaker.findMany()
    } catch (error) {
        throw new Error("Error while fetching categories sneakers" + error)
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
