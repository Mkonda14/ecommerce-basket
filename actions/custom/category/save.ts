"use server"

import { CategoryCustomSchema } from "@/models/custom";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";


export const saveCategoryCustom = authAdminAction
.schema(CategoryCustomSchema)
.action(async ({parsedInput: data}) =>  {
    
    try {
        const category = await db.categoryCustom.create({
            data:{
                ...data,
                createdAt: new Date(),
            }
        })
        return { message: `Category custom : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category custom schema validation failed error: ${error.message}`);
    }
});
