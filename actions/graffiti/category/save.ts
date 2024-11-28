"use server"

import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { CategoryGraffitiSchema } from "@/models/graffiti";

export const saveCategoryGraffiti = authAdminAction
.schema(CategoryGraffitiSchema)
.action(async ({parsedInput: data}) =>  {
    
    try {
        const category = await db.categoryGraffiti.create({
            data: {
                ...data,
                createdAt: new Date()
            }
        })
        return { message: `Category graffiti : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category graffiti save failed error: ${error.message}`);
    }
});