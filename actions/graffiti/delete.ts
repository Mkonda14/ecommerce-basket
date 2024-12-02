"use server"

import { z } from "zod";
import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { deleteImage } from "../cloudinary/upload";

const idSchema = z.object({
    id: z.string(),
})

export const deleteGraffiti = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const publicId = (await db.imageGraffiti.findFirst({
            where: {graffitiId: id},
            select: {publicId: true},
        }))?.publicId 
        
        const category = await db.graffiti.delete({
            where: {id},
        })
        await deleteImage(publicId ? [publicId] : undefined);
        return { message: `Graffiti : ${category.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Graffiti delete failed error: ${error.message}`);
    }
});