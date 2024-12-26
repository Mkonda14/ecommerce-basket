"use server"

import { redirect } from "next/navigation";
import { currentUser } from "../auth";
import { db } from "@/lib/db";


export const getLike = async (customId: string, userId: string)=>{
    return await db.likeCustom.findFirst({
        where: {
            customId: customId,
            userId: userId
        }
    })
}

export const likedCustom = async (customId?: string)=>{
    if(!customId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return redirect("/auth/sign-in");

    const like = await getLike(customId, user.id);

    if(like){
        await db.likeCustom.delete({
            where: {
                id: like.id,
            }
        })
        return false;
    }else{
        try {
            await db.likeCustom.create({
                data: {
                    customId: customId,
                    userId: user.id,
                }
            })
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new Error("Error prevoque lors de l'action like custom" + error.message);
        }
    }
}

export const isLikeCustom = async (customId?: string): Promise<boolean> =>{
    if(!customId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return false;

    const like = await getLike(customId, user.id);

    if(!like) return false;

    return true;
}

