"use server"

import { z } from "zod";
import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const idSchema = z.object({
    id: z.string(),
})

export const deleteCategoryGraffiti = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const category = await db.categoryGraffiti.delete({
            where: {id},
        })
        return { message: `Category graffiti : ${category.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category graffiti delete failed error: ${error.message}`);
    }
});