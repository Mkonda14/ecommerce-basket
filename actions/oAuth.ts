"use server"

import { signIn } from "@/auth"
import { DEFAULT_REDIRECT_ROUTE } from "@/routes"

export const oauth = async (provider: "google" | "github", callbackUrl?: string | undefined) => {
    await signIn(provider, {
        redirectTo: callbackUrl || DEFAULT_REDIRECT_ROUTE
    })
}