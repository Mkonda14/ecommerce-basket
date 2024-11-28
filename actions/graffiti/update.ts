"use server"

import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { GraffitiSchema } from "@/models/graffiti";
import { z } from "zod";

const updateSchema = z.object({
    graffitiId: z.string(),
    data: GraffitiSchema
})

export const updateGraffiti = authAdminAction
.schema(updateSchema)
.action(async ({parsedInput: {data, graffitiId}}) =>  {
    
    try {
        const category = await db.graffiti.update({
            where: {id: graffitiId},
            data: {
                name: data.name,
                description: data.description,
                category: {
                    connect: {
                        id: data.category
                    }
                },
                textMaxLength: parseInt(data.textMaxLength || "1"),
                textMaxWords: parseInt(data.textMaxWords || "1"),
                textMinLength: parseInt(data.textMinLength || "1"),
                defaultColors: {
                    deleteMany: {},
                    create: data.defaultColors.map((color) => ({
                        color: color.code,
                        name: color.name,
                    }))
                },
            }
        })
        return { message: `Graffiti : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Graffiti update failed error: ${error.message}`);
    }
});