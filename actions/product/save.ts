"use server";

import * as z from "zod";
import { ProductSchema } from "@/models/product";
import { db } from "@/lib/db";

export const saveProduct = async (data: z.infer<typeof ProductSchema>) => {
  const verified = ProductSchema.safeParse(data);

  if (!verified.success) {
    return { type: "error", message: "Product schema validation failed" };
  }

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
    images,
  } = verified.data;

  const { primary, secondary } = colors;

  try {
    const sneaker = await db.sneaker.create({
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
          create: secondary.map((color) => ({
            color: color.code,
            name: color.name,
          })),
        },
        sizes: {
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
        images: {
          create: images.map((image) => ({
            secureUrl: image.secure_url,
            publicId: image.public_id,
          })),
        },
        createdAt: new Date(),
      },
    });

    return {
      type: "success",
      message: `Product: ${sneaker.marque} saved successfully`,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    
    return {
      type: "error",
      message: `Sneaker saved failed error: ${error.message}`,
    };
  }
};

