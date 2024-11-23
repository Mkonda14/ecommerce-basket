"use server"

import {z} from "zod"

import { CategorySneakerSchema, TagSneakerSchema, CategoryThemeSchema, ThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { getCategorySneakerById, getTagSneakerById, getCategoryThemeById, getThemeById } from ".";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const updateCategorySneakerSchema = z.object({
    categoryId: z.string().min(5),
    data: CategorySneakerSchema,
})
const updateTagSneakerSchema = z.object({
    tagId: z.string().min(5),
    data: TagSneakerSchema,
})
const updateCategoryThemeSchema = z.object({
    categoryId: z.string().min(5),
    data: CategoryThemeSchema,
})
const updateThemeSchema = z.object({
    themeId: z.string().min(5),
    data: ThemeSchema,
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

export const updateTagSneaker = authAdminAction
.schema(updateTagSneakerSchema)
.action(async ({parsedInput: {data, tagId: id}}) => {
   
    const tagExists = await getTagSneakerById(id);

    if (!tagExists) throw new ActionError("Tag sneaker not found");

    try {
        const tag = await db.tagSneaker.update({
            where: { id },
            data:{
                ...data,
            }
        })
        return { message: `Tag sneaker : ${tag.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Tag sneaker schema validation failed error: ${error.message}`);
    }
});

// ---- Thème

export const updateTheme = authAdminAction
.schema(updateThemeSchema)
.action(async ({parsedInput: {data, themeId: id}}) => {

    const themeExists = await getThemeById(id);

    if (!themeExists) throw new ActionError("Thème not found");

    try {
        const theme = await db.theme.update({
            where: { id },
            data:{
                name: data.name,
                description: data.description,
                categoryId: data.category,
            }
        })
        return { message: `Thème : ${theme.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Thème schema validation failed error: ${error.message}`);
    }
});

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