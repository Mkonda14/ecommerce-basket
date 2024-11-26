
import { getProducts } from "@/actions/product";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const {method} = req;

    if(method !== "GET") {
        return new NextResponse(JSON.stringify({message: 'Method Not Allowed ok in GET request'}), {status: 405});
    }

    try {
        const products = await getProducts();
        return new NextResponse(JSON.stringify(products), {status: 200});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error get products to database:', error);
        return new NextResponse(JSON.stringify({ message: `Internal Server Errors: ${error.message}` }), { status: 500});
    }
};