import { deleteCategorySneaker } from "@/actions/category-attribut/delete";
import { NextResponse } from "next/server";


export async function POST(req: Request){

    const json = await req.json();
    const id = String(json.id);


    try {
        const values = await deleteCategorySneaker({id: id})

        if(req.method !== "POST"){
            return new NextResponse(JSON.stringify({message: "Invalid GET request"}), {status: 405});
        }

        return new NextResponse(JSON.stringify({
            data: values?.data,
            serverError: values?.serverError?.serverError,
            validationErrors: values?.validationErrors, 
        }), {status: 200});

    } catch (error) {
        
    }
}