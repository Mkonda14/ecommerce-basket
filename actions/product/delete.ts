"use server"

import {z} from "zod";
import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const idSchema = z.object({
    id: z.string().min(5),
})

export const deleteSneaker = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const sneaker = await db.sneaker.delete({
            where: {id},
        });

        return { message: `Sneaker : ${sneaker.model} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Sneaker failed error: ${error.message}`);
    }
});