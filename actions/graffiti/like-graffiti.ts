"use server"

import { redirect } from "next/navigation";
import { currentUser } from "../auth";
import { db } from "@/lib/db";


export const getLike = async (graffitiId: string, userId: string)=>{
    return await db.likeGraffiti.findFirst({
        where: {
            graffitiId,
            userId
        }
    })
}

export const likedGraffiti = async (graffitiId?: string)=>{
    if(!graffitiId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return redirect("/auth/sign-in");

    const like = await getLike(graffitiId, user.id);

    if(like){
        await db.likeGraffiti.delete({
            where: {
                id: like.id,
            }
        })
        return false;
    }else{
        try {
            await db.likeGraffiti.create({
                data: {
                    graffitiId,
                    userId: user.id,
                }
            })
            return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new Error("Error prevoque lors de l'action like" + error.message);
        }
    }
}

export const isLikeGraffiti = async (graffitiId?: string): Promise<boolean> =>{
    if(!graffitiId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return false;

    const like = await getLike(graffitiId, user.id);

    if(!like) return false;

    return true;
}

