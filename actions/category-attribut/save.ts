"use server"

import { CategorySneakerSchema, TagSneakerSchema, CategoryThemeSchema, ThemeSchema } from "@/models/category-attributs";
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

export const saveTagSneaker = authAdminAction
.schema(TagSneakerSchema)
.action(async ({parsedInput: data}) =>  {

    try {
        const tag = await db.tagSneaker.create({
            data:{
                ...data,
                createdAt: new Date(),
            }
        })
        return { message: `Tag sneaker : ${tag.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Tag sneaker saved failed error: ${error.message}`);
    }
});

// ------- Theme

export const saveTheme = authAdminAction
.schema(ThemeSchema)
.action(async ({parsedInput: data}) => {

    try {
        const theme = await db.theme.create({
            data:{
                name: data.name,
                description: data.description,
                categoryId: data.category,
                createdAt: new Date(),
                image: (data.image?.public_id ) ? {
                    create : {
                        publicId: data.image?.public_id,
                        secureUrl: data.image?.secure_url,
                    }
                } : {}
            }
        })
        return { message: `Theme : ${theme.name} saved successfully`}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Theme saved failed error: ${error.message}`);
    }
});

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
