import { uploadToCloudinary } from "@/actions/cloudinary/upload";
import type { NextApiRequest, NextApiResponse } from 'next';


export async function POST (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed ok in POST request');
    }

    const file = req.body.file;

    if (!file) {
        return res.status(400).json({ success: false, message: 'No file provided' });
    }

    try {
        const secure_url = await uploadToCloudinary(file, "product");
        return res.status(200).json({ secure_url });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ success: false, message: `Internal Server Error` });
    }
};

