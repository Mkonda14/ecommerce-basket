"use server"

import {z} from "zod";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const idSchema = z.object({
    id: z.string().min(5),
})

export const deleteCategoryTheme = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const category = await db.categoryTheme.delete({
            where: {id},
        })
        return { message: `category thème : ${category.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`category thème failed error: ${error.message}`);
    }
});