"use server"

import {z} from "zod"

import { CategoryThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { getCategoryThemeById } from ".";
import { ActionError, authAdminAction } from "@/lib/safe-actions";


const updateCategoryThemeSchema = z.object({
    categoryId: z.string().min(5),
    data: CategoryThemeSchema,
})


export const updateCategoryTheme = authAdminAction
.schema(updateCategoryThemeSchema)
.action(async ({parsedInput: {data, categoryId: id}}) => {

    const categoryExists = await getCategoryThemeById(id);

    if (!categoryExists) throw new ActionError("Category thème not found");

    try {
        const category = await db.categoryTheme.update({
            where: { id },
            data:{
                ...data,
            }
        })
        return { message: `Category thème : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category thème schema validation failed error: ${error.message}`);
    }
});