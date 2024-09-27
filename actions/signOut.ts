"use server"

import { signOut as logout } from "@/auth";
import { ROOT } from "@/routes";

export const signOut = async () => {
    await logout({
        redirect: true,
        redirectTo: ROOT
    });
    // add logical
}