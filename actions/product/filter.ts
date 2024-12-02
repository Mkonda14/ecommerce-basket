"use server"

import { db } from "@/lib/db"
import { z } from "zod"


const IFilterSneakerSchema = z.object({
    categoryThemes: z.array(z.string()).optional(),
    categorySneakers: z.array(z.string()).optional(),
    tagSneakers: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    sizes: z.array(z.number()).optional(),
    page: z.number().optional(),
    price: z.object({
        min: z.number(),
        max: z.number(),
    }).optional(),
    sorts: z.object({
        alphabet: z.enum(["asc", "desc"]),
        price: z.enum(["asc", "desc"])
    }).optional(),
})


export const filterSneaker = async (data: z.infer<typeof IFilterSneakerSchema>) => {
    
    const verified = IFilterSneakerSchema.safeParse(data);
    if (!verified.success) return;
    
    const {
        categoryThemes = [],
        categorySneakers = [],
        tagSneakers = [],
        sizes = [],
        colors = [],
        price = undefined,
        page = 1,
        sorts = undefined,
    } = verified.data;

    const conditions = {AND: [
        categorySneakers.length > 0 ? { category: { id: { in: categorySneakers } } } : {},
        categoryThemes.length > 0 ? { themes: { some: { category: { id: { in: categoryThemes } } } } } : {},
        tagSneakers.length > 0 ? { tags: { some: { id: { in: tagSneakers } } } } : {},
        sizes.length > 0 ? { sizes: { some: { size: { in: sizes } } } } : {},
        colors.length > 0 ? { colorPrimaryName: { in: colors } } : {},
        price ? { price: { gte: price.min, lte: price.max } } : {},
    ]}

    try {
        const sneakerQuery =  db.sneaker.findMany({
            where: conditions,
            
            skip: (page - 1) * 12,
            take: 12,
            
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

            orderBy: [
                {price: sorts?.price,},
                {marque: sorts?.alphabet,}
            ],
        })

        const totalQuery =  db.sneaker.count({
            where: conditions
        });

        const [sneakers, total] = await db.$transaction([sneakerQuery, totalQuery]);
        
        return {sneakers, total};

    } catch (error) {
        console.error(error);
    }
}

