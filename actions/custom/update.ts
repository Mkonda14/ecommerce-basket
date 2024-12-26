"use server";

import * as z from "zod";
import { CustomSchema } from "@/models/custom";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const updateProductSchema = z.object({
  customId: z.string(),
  data : CustomSchema
})

export const updateCustom = authAdminAction
.schema(updateProductSchema)
.action(async ({parsedInput: data})  => {

  const {data: custom, customId: id} = data;

  const productExists = await db.sneaker.findUnique({ where: { id } });
  if (!productExists) throw new ActionError("Product not found");

  const {
    name,
    description,
    price,
    themes,
    colorSecondaries,
    colorPrimary,
    categories
  } = custom;


  try {
    const custom = await db.custom.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price.toString()),

        colorSecondaries: {
          deleteMany: {},
          create: colorSecondaries?.map((color) => ({
            color: color?.code || "",
            name: color?.name || "",
          })),
        },

        colorPrimary: {
          connect: {
            id: colorPrimary,
          }
        },

        categories: {
          connect: categories.map((category) => ({
            id: category.value,
          })),
        },
        
        themes: {
          connect: themes?.map((theme) => ({
            id: theme,
          })),
        },
 
        updatedAt: new Date(),
      },
    });

    return {
      message: `Custom: ${custom.name} update successfully`,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    throw new ActionError(`Custom update failed error: ${error.message}`)
  }
})
