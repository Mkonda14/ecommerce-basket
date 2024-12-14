"use server"

import { db } from "@/lib/db";


export const getSneakerBySlug = async (slug: string)=>{
    try {
        return db.sneaker.findUnique({
            where: {
                slug,
            },
            include:{
                colorPrimary: {
                    select:{
                        color: true,
                        name: true,
                    },
                },
                category: {
                    select:{
                        name: true,
                        description: true,
                        designer: true,
                    }
                },
                tags:{
                    select:{
                        name: true,
                        description: true,
                    },
                },
                themes:{
                    select:{
                        id: true,
                        name: true,
                        description: true,
                        category: {
                            select:{
                                name: true,
                                description: true,
                                secondName: true,
                            }
                        }
                    },
                },
                colorSecondaries:{
                    select:{
                        color: true,
                        name: true,
                    },
                },
                images :{
                    select: {
                        id: true,
                        publicId: true,  
                    }
                },
                sizes:{
                    select:{
                        size: true,
                        quantity: true,
                    },
                },
                _count: {
                    select:{
                        likes: true,
                    }
                }
            },
        })
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}