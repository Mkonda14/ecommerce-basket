"use server"

import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// Configuration de Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
});

// Fonction pour télécharger un fichier sur Cloudinary
export const uploadToCloudinary = async (file: string, folder?: string): Promise<string> => {
    try {
        const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(file, {
            folder: folder || "product",
        });

        return uploadResult.secure_url;
    } catch (error) {
        const uploadError = error as UploadApiErrorResponse;
        console.error("Erreur lors du téléchargement sur Cloudinary:", uploadError.message);
        throw new Error(uploadError.message);
    }
};
