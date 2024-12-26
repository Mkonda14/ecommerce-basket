"use server";

import { ProductSchema } from "@/models/product";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

export const saveProduct = authAdminAction
  .schema(ProductSchema)
  .action(async ({parsedInput: data}) => {

    try {
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
    } = data;

      const sneaker = await db.sneaker.create({
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
  
          createdAt: new Date(),
        },
      });


      return {
        message: `Product: ${sneaker.marque} saved successfully`,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      throw new ActionError(error.message);
    }
  });
