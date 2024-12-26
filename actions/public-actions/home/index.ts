"use server"

import { db } from "@/lib/db";
import { transToCardCustom } from "@/actions/translate"


export const getLastCustoms = async (limit?: number)=> {
    try{        
        const customs = await db.custom.findMany({
            take: limit || 4,
            orderBy:{
                createdAt: "desc"
            },
            select: {
                id: true,
                slug: true,
                name: true,
                price: true,
                colorSecondaries: {
                    select: {
                        color: true,
                        name: true,
                    }
                },
                colorPrimary:{
                    select:{
                        sneaker: {
                            select:  {
                                marque: true,
                                model: true,
                                price: true,
                                reduction: true,
                                isPromo: true,
                                isCustomByGraffiti: true,
                                tags: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        },
                        sizes: {
                            select: {
                                size: true,
                                quantity: true,
                            }
                        }
                    }
                },
                images: {
                    select: {
                        publicId: true
                    },
                    take: 1
                },
            },
        })

        return customs.map((custom)=> transToCardCustom(custom))

    }catch(err){
        throw new Error("error an get last customs from the database" + err)
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