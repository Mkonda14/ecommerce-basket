"use server"

import { db } from "@/lib/db";


export const getGraffitiCards = async () => {
    try {
       return await db.graffiti.findMany({
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
        throw new Error("Error while fetching graffitis card" + error)
    }
}

export const getSneakerBySizeColorId = async (arr: string[]) => {
    try {
        const sneaker = await db.sneaker.findFirst({
            where: {
                AND: [
                    {id: arr[2]},
                    {colorPrimaries: { some: { name: arr[1] } }},
                    {colorPrimaries: { some: { sizes: { some: {size: parseInt(arr[0])}}} }}
                ]
            },
            select:{
                id: true,
            }
        });
        return sneaker;
        
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}