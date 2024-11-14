"use server"

import { db } from "@/lib/db"


export type TFilter = {
    categorySneakers?: string[],
    categoryThemes?: string[],
    tagSneakers?: string[],
    sizes?: number[],
    colors?: string[],
    price?: {min: number, max: number},
    sorts?: {alphabet: "asc" | "desc", price: "asc" | "desc"},
    page?: number,
}

export const filterSneaker = async (data: TFilter) => {
    const {
        categorySneakers = [],
        categoryThemes = [],
        tagSneakers = [],
        sizes = [],
        colors = [],
        price = undefined,
        page = 1,
        sorts = { alphabet: "asc", price: "asc" },
    } = data;

    const conditions = {AND: [
        categorySneakers.length > 0 ? { category: { id: { in: categorySneakers } } } : {},
        categoryThemes.length > 0 ? { themes: { some: { category: { id: { in: categoryThemes } } } } } : {},
        tagSneakers.length > 0 ? { tags: { some: { id: { in: tagSneakers } } } } : {},
        sizes.length > 0 ? { sizes: { some: { size: { in: sizes } } } } : {},
        colors.length > 0 ? { colorPrimaryName: { in: colors } } : {},
        price ? { price: { gte: price.min, lte: price.max } } : {},
    ]}

    try {
        const sneakers = await db.sneaker.findMany({
            where: conditions,
            
            skip: (page - 1) * 12,
            take: 12,
            
            select:{
                id: true,
                marque: true,
                model: true,
                price: true,
                isPromo: true,
                stock: true,
                promoPrice: true,
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

            orderBy: [
                {price: sorts?.price || "asc",},
                {marque: sorts?.alphabet || "asc",}
            ],
        })

        const total = await db.sneaker.count({
            where: conditions
        });
        
        return {sneakers, total};
    } catch (error) {
        console.error(error);
    }
}

