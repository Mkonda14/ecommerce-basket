"use server"

import { redirect } from "next/navigation";
import { currentUser } from "../auth";
import { db } from "@/lib/db";


export const getLike = async (themeId: string, userId: string)=>{
    return await db.likeTheme.findFirst({
        where: {
            themeId: themeId,
            userId: userId
        }
    })
}

export const likedTheme = async (themeId?: string)=>{
    if(!themeId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return redirect("/auth/sign-in");

    const like = await getLike(themeId, user.id);

    if(like){
        await db.likeTheme.delete({
            where: {
                id: like.id,
            }
        })
        return false;
    }else{
        try {
            await db.likeTheme.create({
                data: {
                    themeId: themeId,
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

export const isLikeTheme = async (themeId?: string): Promise<boolean> =>{
    if(!themeId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return false;

    const like = await getLike(themeId, user.id);

    if(!like) return false;

    return true;
}

