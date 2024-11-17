"use server"

import { db } from "@/lib/db";
import { z } from "zod";


const CardSuggestionSchema = z.object({
    sneakerId: z.string().optional(),
    themeIds: z.array(z.string()).optional()
});

export const getCardSuggestions = async (params : z.infer<typeof CardSuggestionSchema>) => {
    try {
        const verified = CardSuggestionSchema.safeParse(params);
        if (!verified.success) throw new Error("invalid parameters passed to CardSuggestionSchema");

        const {themeIds, sneakerId} = verified.data;

        const sneakers = await db.sneaker.findMany({
            where: {
                themes: { every:  { id: { in: themeIds }  } },
                id: {
                    not: sneakerId
                }
            },
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
            take: 3,
            orderBy: {
                createdAt: 'desc',
            },

        });
        return sneakers;
    } catch (error) {
        throw new Error("Error get sneakers suggestions to database: " + error)
    }
}