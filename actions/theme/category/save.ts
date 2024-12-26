"use server"

import { CategoryThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

export const saveCategoryTheme = authAdminAction
.schema(CategoryThemeSchema)
.action(async ({parsedInput: data}) => {

    try {
        const category = await db.categoryTheme.create({
            data:{
                ...data,
                createdAt: new Date(),
            }
        })
        return { message: `Category theme : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category theme schema validation failed error: ${error.message}`);
    }
});
