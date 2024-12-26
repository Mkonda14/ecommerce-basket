"use server"

import { db } from "@/lib/db"

export const getSneakerSelectForm = async () => {
    try {
       return await db.sneaker.findMany({
            select: {
                marque: true,
                model: true,
                colorPrimaries: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        quantity: true
                    }
                }
            }
       });
    } catch (error) {
        throw new Error("Error while fetching sneaker form select" + error)
    }
}