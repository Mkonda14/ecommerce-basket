import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_REDIRECT_ROUTE, PUBLIC_ROUTES } from "./routes";

const {auth} = NextAuth(authConfig);

export default auth((req)=>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    // const role = req.auth?.user.role === "ADMIN";

    const isApiAuthRoute = nextUrl.pathname.endsWith(API_AUTH_PREFIX);
    const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
    const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
    // const isAdminRoute = nextUrl.pathname.indexOf("admin/") > -1;

    if(isApiAuthRoute || isPublicRoute) return;
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
        }
        return;
    }

    if(!isLoggedIn && !isPublicRoute && !isAuthRoute){
        let callbackUrl = nextUrl.pathname;
        if(nextUrl.search){
            callbackUrl += nextUrl.search;
        }

        const encodedUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(new URL(`/auth/sign-in?callbackUrl=${encodedUrl}`, nextUrl));
    }

    // if(!role && isLoggedIn && isAdminRoute){
    //     return Response.redirect(new URL(`/auth/unauthorized`, nextUrl));
    // }
})

export const config = {
    matcher : [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/(api|trpc)(.*)"
    ]
}