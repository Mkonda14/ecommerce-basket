"use server"

import { z } from "zod";
import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { CategoryGraffitiSchema } from "@/models/graffiti";

const updateSchema = z.object({
    categoryId: z.string(),
    data: CategoryGraffitiSchema
})

export const updateCategoryGraffiti = authAdminAction
.schema(updateSchema)
.action(async ({parsedInput: {data, categoryId}}) =>  {
    
    try {
        const category = await db.categoryGraffiti.update({
            where: {id: categoryId},
            data: {
                ...data,
            }
        })
        return { message: `Category graffiti : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category graffiti updated failed error: ${error.message}`);
    }
});