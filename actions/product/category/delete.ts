"use server"

import {z} from "zod";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

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