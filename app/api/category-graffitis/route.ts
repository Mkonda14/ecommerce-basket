"use server"

import { NextResponse } from "next/server";

import { getCategoryGraffitis } from "@/actions/graffiti/category";


export async function GET(req: Request){
    if(req.method !== "GET"){
        return new NextResponse(JSON.stringify({message: "Invalid GET request"}), {status: 405});
    }

    try {
        const categories = await getCategoryGraffitis();
        return new NextResponse(JSON.stringify(categories), {status: 200});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new NextResponse(JSON.stringify({message: `Internal Server Errors: ${error.message}`}), {status: 500});
    }
}
