import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const Upload = async (request: NextRequest) =>{

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if(!file){
        return NextResponse.json({ success: false})
    }
    
    try {
        const fileName = uuidv4().toString();
        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const path = `/public/uploads/${fileName}`;
        await writeFile(path, buffer);
          
        console.log(fileName);
        return NextResponse.json({ success: true, fileName });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false})
    }

}