"use server"

import {db} from '@/lib/db';

export const getCategoryGraffitis = async () => {
    try {
        return db.categoryGraffiti.findMany();
    } catch (error) {
        throw new Error("Error get all category graffitis to database: " + error)
    }
}

export const getCategoryGraffitiById = async (id: string) => {
    try {
        return db.categoryGraffiti.findUnique({
            where: {id},
        });
    } catch (error) {
        throw new Error("Error get category graffiti to database: " + error)
    }
}
