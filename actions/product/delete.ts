"use server"

import {z} from "zod";
import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { deleteImage } from "../cloudinary/upload";

const idSchema = z.object({
    id: z.string().min(5),
})

export const deleteSneaker = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const publicIds = (await db.imageSneaker.findMany({
            where: {sneakerId: id},
        })).map(image => image.publicId);

        const sneaker = await db.sneaker.delete({
            where: {id},
        });

        await deleteImage(publicIds);

        return { message: `Sneaker : ${sneaker.model} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Sneaker failed error: ${error.message}`);
    }
});