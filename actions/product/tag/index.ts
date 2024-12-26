"use server"

import { db } from "@/lib/db"

export const getTagSneakers = async () => {
    try {
       return (await db.tagSneaker.findMany()) || []
    } catch (error) {
        throw new Error("Error while fetching tags" + error)
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