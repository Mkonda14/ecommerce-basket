"use server"

import { NextResponse } from "next/server";

import { getGraffitis } from "@/actions/graffiti";


export async function GET(req: Request){
    if(req.method !== "GET"){
        return new NextResponse(JSON.stringify({message: "Invalid GET request"}), {status: 405});
    }

    try {
        const themes = await getGraffitis();
        return new NextResponse(JSON.stringify(themes), {status: 200});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new NextResponse(JSON.stringify({message: `Internal Server Errors: ${error.message}`}), {status: 500});
    }
}
