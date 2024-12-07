"use server"

import { db } from "@/lib/db";

export const getProducts = async () => {
    try {

        const sneakers = await db.sneaker.findMany({
            select:{
                id: true,
                marque: true,
                model: true,
                price: true,
                isPromo: true,
                stock: true,
                images:{
                    select:{
                        publicId: true,
                    },
                    take: 1,
                },
                category: {
                    select:{
                        name: true,
                    },
                }
            },

        });
        return sneakers;
        
    } catch (error) {
        throw new Error("Error get all sneakers to database: " + error)
    }
}

export const getProductCardDerniers = async () => {
    try {
        const sneakers = await db.sneaker.findMany({
            where:{
                NOT:{
                    colorSecondaries: {every: { id: ""}}
                }
            },
            include:{
                images:{
                    select:{
                        publicId: true,
                    },
                    take: 1,
                },
                sizes: {
                    select:{
                        size: true,
                        quantity: true,
                    },
                },
                colorSecondaries:{
                    select:{
                        color: true,
                        name: true,
                    },
                },
                tags:{
                    select:{
                        name: true
                    },
                    take: 3
                },
            },
            take: 4,
            orderBy: {
                createdAt: 'desc',
            },

        });
        return sneakers;
    } catch (error) {
        throw new Error("Error get sneakers to database: " + error)
    }
}

export const getProductCard = async (id: string) => {
    try {
        const sneaker = await db.sneaker.findUnique({
            where: {
                id
            },
            select:{
                id: true,
                marque: true,
                model: true,
                price: true,
                isPromo: true,
                stock: true,
                images:{
                    select:{
                        publicId: true,
                    },
                    take: 1,
                },
                sizes: {
                    select:{
                        size: true,
                        quantity: true,
                    },
                },
                colorSecondaries:{
                    select:{
                        color: true,
                        name: true,
                    },
                }
            },

        });
        return sneaker;
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}

export const getProductById = async (id: string) => {
    try {
        const sneaker = await db.sneaker.findUnique({
            where: {
                id
            },
            select:{
                id: true,
                slug: true,
                marque: true,
                model: true,
                description: true,
                price: true,
                isPromo: true,
                promoPrice: true,
                stock: true,
                categoryId: true,
                createdAt: true,
                updatedAt: true,
                colorPrimary: {
                    select:{
                        color: true,
                        name: true,
                    },
                },
                tags:{
                    select:{
                        id: true,
                        name: true,
                    },
                },
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
                sizes:{
                    select:{
                        size: true,
                        quantity: true,
                    },
                },
            }
        });
        return sneaker;
        
    } catch (error) {
        throw new Error("Error get sneaker to database: " + error)
    }
}

export const getSneakerById = async (sneakerId: string)=>{
    try {
        return db.sneaker.findUnique({
            where: {id: sneakerId},
            select:{
                id: true,
                marque: true,
                model: true,
                description: true,
                price: true,
                isPromo: true,
                promoPrice: true,
                stock: true,
                categoryId: true,
                createdAt: true,
                updatedAt: true,
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
        throw new Error("Error get sneaker colors primary to database: " + error)
    }
}