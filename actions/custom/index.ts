"use server"

import { db } from "@/lib/db";
import { transToItemList } from "../translate";

export const getCustoms = async () => {
    try {

        const customs = await db.custom.findMany({
            orderBy:{
                createdAt:'desc'
            },
            select:{
                id: true,
                name: true,
                price: true,
                images:{
                    select:{
                        publicId: true,
                    },
                    take: 1,
                },
                colorPrimary: {
                    select:{
                        name: true,
                        color: true,
                        quantity: true,
                        sneaker:{
                            select:{
                                marque: true,
                                model: true,
                                isCustomByGraffiti: true,
                            },
                        },
                    },
                },
            },

        });
        return transToItemList(customs);
        
    } catch (error) {
        throw new Error("Error get all customs to database: " + error)
    }
}


export const getCustomUpdateById = async (id: string) => {
    try {
        const custom = await db.custom.findUnique({
            where: {
                id
            },
            include:{
                themes:{
                    select:{
                        id: true,
                    },
                },
                colorSecondaries:{
                    select:{
                        color: true,
                        name: true,
                    },
                },
            }
        });
        return custom;
        
    } catch (error) {
        throw new Error("Error get custom to database: " + error)
    }
}


export const getColorPrimaries = async () => {
    try {
        const colors = await db.colorPrimary.findMany({
            distinct: ["name"],
            select: {
                color: true,
                name: true,
            },
        })
        return colors
    } catch (error) {
        throw new Error("Error get custom colors primary to database: " + error)
    }
}