"use server"

import {z} from "zod";
import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { deleteImage } from "../cloudinary/upload";

const idSchema = z.object({
    id: z.string().min(5),
})

export const deleteCustom = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const publicIds = (await db.imageCustom.findMany({
            where: {customId: id},
        })).map(image => image.publicId);

        const custom = await db.custom.delete({
            where: {id},
        });

        await deleteImage(publicIds);

        return { message: `Custom : ${custom.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Custom failed error: ${error.message}`);
    }
});