"use server"

import {z} from "zod";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { deleteImage } from "../cloudinary/upload";

const idSchema = z.object({
    id: z.string().min(5),
})


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