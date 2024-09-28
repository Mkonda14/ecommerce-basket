"use server"

import { signOut as logout } from "@/auth";
import { ROOT } from "@/routes";

export const signOut = async () => {
    try {
        await logout({
            redirectTo: ROOT
        });
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }
};
