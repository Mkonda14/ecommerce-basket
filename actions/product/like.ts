"use server"

import { redirect } from "next/navigation";
import { currentUser } from "../auth";
import { db } from "@/lib/db";


export const getLike = async (sneakerId: string, userId: string)=>{
    return await db.likeSneaker.findFirst({
        where: {
            sneakerId: sneakerId,
            userId: userId
        }
    })
}

export const liked = async (sneakerId?: string)=>{
    if(!sneakerId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return redirect("/auth/sign-in");

    const like = await getLike(sneakerId, user.id);

    if(like){
        await db.likeSneaker.delete({
            where: {
                id: like.id,
            }
        })
        return false;
    }else{
        try {
            await db.likeSneaker.create({
                data: {
                    sneakerId: sneakerId,
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

export const isLike = async (sneakerId?: string): Promise<boolean> =>{
    if(!sneakerId) return false;

    const user = await currentUser();

    if(!user || !user?.id) return false;

    const like = await getLike(sneakerId, user.id);

    if(!like) return false;

    return true;
}

