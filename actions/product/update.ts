"use server";

import * as z from "zod";
import { ProductSchema } from "@/models/product";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const updateProductSchema = z.object({
  productId: z.string(),
  data : ProductSchema
})

export const updateProduct = authAdminAction
.schema(updateProductSchema)
.action(async ({parsedInput: data})  => {

  const {data: product, productId: id} = data;

  const productExists = await db.sneaker.findUnique({ where: { id } });
  if (!productExists) throw new ActionError("Product not found");

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
  } = product;

  const { primary, secondary } = colors;

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
      message: `Product: ${sneaker.marque} update successfully`,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    throw new ActionError(`Sneaker update failed error: ${error.message}`)
  }
})
