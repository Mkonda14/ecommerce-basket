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
                NOT: [
                    {id: sneakerId},
                    {colorSecondaries: {every: { id: ""}}}
                ],
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
            take: 3,
            orderBy: {
                createdAt: 'desc',
            },

        });

        // Filtrer pour exclure le sneaker concerné 
        const filteredSneakers = sneakers.filter(sneaker => sneaker.id !== sneakerId);
        return filteredSneakers;
        
    } catch (error) {
        console.error("Error getting sneaker suggestions from database:", error); 
        throw new Error("Error getting sneaker suggestions from database");
    }
}