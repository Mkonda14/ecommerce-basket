"use server"

import { transToShowCustom } from "@/actions/translate";
import { db } from "@/lib/db";


export const getCustomBySlug = async (slug: string)=>{
    try {
        const custom = await db.custom.findUnique({
          where: {
            slug,
          },
          select: {
            id: true,
            slug: true,
            name: true,
            description: true,
            price: true,
            colorPrimary: {
              select: {
                color: true,
                name: true,
                sneaker: {
                  select: {
                    id: true,
                    model: true,
                    price: true,
                    marque: true,
                    reduction: true,
                    isPromo: true,
                    isCustomByGraffiti: true,
                    tags: {
                      select: {
                        name: true,
                        description: true,
                      },
                    },
                    category: {
                      select: {
                        name: true,
                        description: true,
                        designer: true,
                      },
                    },
                  },
                },
                sizes: {
                  select: {
                    size: true,
                    quantity: true,
                  },
                },
              },
            },
            themes: {
              select: {
                id: true,
                name: true,
                description: true,
                category: {
                  select: {
                    name: true,
                    description: true,
                    secondName: true,
                  },
                },
              },
            },
            colorSecondaries: {
              select: {
                color: true,
                name: true,
              },
            },
            images: {
              select: {
                id: true,
                publicId: true,
              },
            },
            _count: {
              select: {
                likes: true,
              },
            },
          },
        });
      
        return transToShowCustom(custom);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch custom data");
      }
      
}