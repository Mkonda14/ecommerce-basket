"use server"

import {z} from "zod";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { deleteImage } from "../cloudinary/upload";

const idSchema = z.object({
    id: z.string().min(5),
})


export const deleteCategorySneaker = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const category = await db.categorySneaker.delete({
            where: {id},
        })
        return { message: `Category sneaker : ${category.name} delete successfully`}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Category sneaker failed error: ${error.message}`);
    }
});


// ------------

export const deleteTagSneaker = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const tag = await db.tagSneaker.delete({
            where: {id},
        })
        return { message: `Tag sneaker : ${tag.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Tag sneaker failed error: ${error.message}`);
    }
});

// -----------

export const deleteTheme = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const publicId = (await db.imageTheme.findFirst({
            where: {themeId: id},
            select: {publicId: true},
        }))?.publicId 

        const theme = await db.theme.delete({
            where: {id},
        })

        await deleteImage(publicId ? [publicId] : undefined);

        return { message: `Thème : ${theme.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Thème failed error: ${error.message}`);
    }
});

export const deleteCategoryTheme = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const category = await db.categoryTheme.delete({
            where: {id},
        })
        return { message: `category thème : ${category.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`category thème failed error: ${error.message}`);
    }
});
