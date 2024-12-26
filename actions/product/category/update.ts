"use server"

import {z} from "zod"

import { CategorySneakerSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { getCategorySneakerById } from ".";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const updateCategorySneakerSchema = z.object({
    categoryId: z.string().min(5),
    data: CategorySneakerSchema,
})

export const updateCategorySneaker = authAdminAction
.schema(updateCategorySneakerSchema)
.action(async ({parsedInput: {data, categoryId: id}}) => {

    const categoryExists = await getCategorySneakerById(id);

    if (!categoryExists) throw new ActionError("Category sneaker not found");

    try {
        const category = await db.categorySneaker.update({
            where: { id },
            data:{
                ...data,
            }
        })
        return { message: `Category sneaker : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category sneaker schema updated validation failed error: ${error.message}`);
    }
});