"use server"

import { CategorySneakerSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";


export const saveCategorySneaker = authAdminAction
.schema(CategorySneakerSchema)
.action(async ({parsedInput: data}) =>  {
    
    try {
        const category = await db.categorySneaker.create({
            data:{
                ...data,
                createdAt: new Date(),
            }
        })
        return { message: `Category sneaker : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category sneaker schema validation failed error: ${error.message}`);
    }
});
