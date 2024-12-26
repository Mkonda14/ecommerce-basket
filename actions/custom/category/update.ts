"use server"

import {z} from "zod"

import { CategoryCustomSchema } from "@/models/custom";
import { db } from "@/lib/db";
import { getCategoryCustomById } from ".";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const updateCategoryCustomSchema = z.object({
    categoryId: z.string().min(5),
    data: CategoryCustomSchema,
})

export const updateCategoryCustom = authAdminAction
.schema(updateCategoryCustomSchema)
.action(async ({parsedInput: {data, categoryId: id}}) => {

    const categoryExists = await getCategoryCustomById(id);

    if (!categoryExists) throw new ActionError("Category custom not found");

    try {
        const category = await db.categoryCustom.update({
            where: { id },
            data:{
                ...data,
            }
        })
        return { message: `Category custom : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category custom schema updated validation failed error: ${error.message}`);
    }
});