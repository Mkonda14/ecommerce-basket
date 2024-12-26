"use server";

import * as z from "zod";
import { ProductSchema } from "@/models/product";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const updateProductSchema = z.object({
  sneakerId: z.string(),
  data : ProductSchema
})

export const updateProduct = authAdminAction
.schema(updateProductSchema)
.action(async ({parsedInput: data})  => {

  const {data: product, sneakerId: id} = data;

  const productExists = await db.sneaker.findUnique({ where: { id } });
  if (!productExists) throw new ActionError("Product not found");

  const {
    marque,
    model,
    description,
    price,
    reduction,
    isCustomByGraffiti,
    isPromo,
    category,
    tags,
    colorPrimaries,
    stock
  } = product;

  try {
    const sneaker = await db.sneaker.update({
      where: { id },
      data: {
        marque,
        model,
        description,
        price: parseFloat(price.toString()),
        reduction: (parseInt(reduction) / 100),
        isCustomByGraffiti,
        isPromo,
        stock: parseInt(stock),

        colorPrimaries: {
          deleteMany: {},
          create: colorPrimaries.map((colorPrimary)=>({
            color: colorPrimary.code,
            name: colorPrimary.name,
            quantity: colorPrimary.sizes.map((size)=> parseInt(size.quantity)).reduce((prev, curr)=> prev + curr, 0),
            sizes: {
              create: colorPrimary.sizes.map((size) => ({
                size: parseInt(size.size, 10),
                quantity: parseInt(size.quantity, 10),
              })),
            },
          }))
        },

        category: {
          connect: {
            id: category,
          },
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
