"use server"

import {db} from '@/lib/db';

export const getGraffitis = async () => {
    try {
        return db.graffiti.findMany({
            include: {
                image: {
                    select:{
                        publicId: true
                    }
                },
                category: {
                    select:{
                        name: true
                    }
                }
            }
        });
    } catch (error) {
        throw new Error("Error get all graffitis to database: " + error)
    }
}

export const getGraffitiById = async (id: string) => {
    try {
        return db.graffiti.findUnique({
            where: {id},
            include: {
                defaultColors:{
                    select:{
                        color: true,
                        name: true
                    }
                }
            }
        });
    } catch (error) {
        throw new Error("Error get graffiti to database: " + error)
    }
}
