"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { transToCardCustom } from "../translate";

// Définition du schéma de validation pour les filtres
const IFilterCustomSchema = z.object({
  categoryThemes: z.array(z.string()).optional(),
  categorySneakers: z.array(z.string()).optional(),
  tagSneakers: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.number()).optional(),
  page: z.number().optional(),
  price: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
  sorts: z
    .object({
      alphabet: z.enum(["asc", "desc"]),
      price: z.enum(["asc", "desc"]),
    })
    .optional(),
});

// Fonction de filtrage des customs
export const filterCustom = async (data: z.infer<typeof IFilterCustomSchema>) => {
  // Validation des données d'entrée
  const verified = IFilterCustomSchema.safeParse(data);
  if (!verified.success) return;

  const {
    categoryThemes = [],
    categorySneakers = [],
    tagSneakers = [],
    sizes = [],
    colors = [],
    price = undefined,
    page = 1,
    sorts = undefined,
  } = verified.data;

  // Construction des conditions de filtrage
  const conditions = {
    AND: [
      categorySneakers.length > 0
        ? {colorPrimary: {sneaker: { category: { id: { in: categorySneakers } } }}}
        : {},
      categoryThemes.length > 0
        ? { themes: { some: { category: { id: { in: categoryThemes } } } } }
        : {},
      tagSneakers.length > 0
        ? {colorPrimary: {sneaker: { tags: { some: { id: { in: tagSneakers } } } }}}
        : {},
      sizes.length > 0 ? {colorPrimary: { sizes: { some: { size: { in: sizes } } } }} : {},
      colors.length > 0 ? { colorPrimary: { name: { in: colors } } } : {},
      price ? { price: { gte: price.min, lte: price.max } } : {},
    ],
  };

  try {
    // Requête pour récupérer les customs filtrés
    const customQuery = db.custom.findMany({
      where: conditions,
      skip: (page - 1) * 12,
      take: 12,
      select: {
        id: true,
        slug: true,
        name: true,
        price: true,
        colorSecondaries: {
            select: {
                color: true,
                name: true,
            }
        },
        colorPrimary:{
            select:{
                sneaker: {
                    select:  {
                        marque: true,
                        model: true,
                        price: true,
                        reduction: true,
                        isPromo: true,
                        tags: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                sizes: {
                    select: {
                        size: true,
                        quantity: true,
                    }
                }
            }
        },
        images: {
            select: {
                publicId: true
            },
            take: 1
        },
    },
      orderBy: [
        { price: sorts?.price || "asc" },
        { name: sorts?.alphabet || "asc" },
      ],
    });

    // Requête pour compter le nombre total de customs filtrés
    const totalQuery = db.custom.count({
      where: conditions,
    });

    // Exécution des requêtes en transaction
    const [customs, total] = await db.$transaction([customQuery, totalQuery]);    
    return { customs: customs.map((custom)=> transToCardCustom(custom)), total };

  } catch (error) {
    console.error(error);
  }
};
