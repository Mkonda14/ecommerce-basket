"use server"

import * as z from "zod"
import { signIn as login } from "@/auth";
import { AuthError } from "next-auth";

import { signInSchema } from "@/models";
import { DEFAULT_REDIRECT_ROUTE } from "@/routes";


export const signIn = async (data: z.infer<typeof signInSchema>, callbackUrl: string | null) => {
    const valid = signInSchema.safeParse(data);
    console.log(valid.data);
    if(!valid.success) return { msg: 'Invalid data', type: "error"}

    const {email, password} = valid.data;
    try {
        await login("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_REDIRECT_ROUTE
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { msg: 'Invalid credentials', type: "error" };            
                default:
                   return { msg: "Something went wrong", type: "error"} 
            }
        }
        throw error;
    }
}