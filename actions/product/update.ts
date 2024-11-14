"use server";

import * as z from "zod";
import { ProductSchema } from "@/models/product";
import { db } from "@/lib/db";

export const updateProduct = async (id: string, data: z.infer<typeof ProductSchema>) => {
  const verified = ProductSchema.safeParse(data);

  if (!verified.success) {
    console.log(data, "verified", verified.error);
    return { type: "error", message: "Product schema validation failed" };
  }

  const productExists = await db.sneaker.findUnique({ where: { id } });
  if (!productExists) return { type: "error", message: "Product not found" };

  const {
    marque,
    model,
    description,
    price,
    promoPrice,
    isPromo,
    category,
    themes,
    tags,
    stock,
    colors,
    sizes,
  } = verified.data;

  const { primary, secondary } = colors;
  console.log(tags, "les tags uniquement");

  try {
    const sneaker = await db.sneaker.update({
      where: { id },
      data: {
        marque,
        model,
        description,
        price: parseFloat(price.toString()),
        promoPrice: parseFloat(promoPrice.toString()),
        isPromo,
        stock: parseInt(stock, 10),
        colorPrimary: primary.code,
        colorPrimaryName: primary.name,
        colorSecondaries: {
          deleteMany: {},
          create: secondary.map((color) => ({
            color: color.code,
            name: color.name,
          })),
        },
        sizes: {
          deleteMany: {},
          create: sizes.map((size) => ({
            size: parseInt(size.size, 10),
            quantity: parseInt(size.quantity, 10),
          })),
        },
        category: {
          connect: {
            id: category,
          },
        },
        themes: {
          connect: themes.map((theme) => ({
            id: theme,
          })),
        },
        tags: {
          connect: tags.map((tag) => ({
            id: tag.value,
          })),
        },
        updatedAt: new Date(),
      },
    });

    return {
      type: "success",
      message: `Product: ${sneaker.marque} update successfully`,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
    return {
      type: "error",
      message: `Sneaker update failed error: ${error.message}`,
    };
  }
};
