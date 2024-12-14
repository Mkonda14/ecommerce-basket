"use server";

import { ProductSchema } from "@/models/product";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { generateSlug } from "../help";

export const saveProduct = authAdminAction
  .schema(ProductSchema)
  .action(async ({parsedInput: data}) => {

    try {
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
    } = data;

    const { primary, secondary } = colors;

      const sneaker = await db.sneaker.create({
        data: {
          slug: generateSlug(marque, model),
          marque,
          model,
          description,
          price: parseFloat(price.toString()),
          promoPrice: parseFloat(promoPrice.toString()),
          isPromo,
          stock: parseInt(stock, 10),

          colorPrimary: {
            create: {
              color: primary.code,
              name: primary.name,
            },
          },

          colorSecondaries: secondary ? {
            create: secondary?.map((color) => ({
              color: color?.code || "",
              name: color?.name || "",
            })),
          } : {},

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
            connect: themes?.map((theme) => ({
              id: theme,
            })),
          },
          tags: {
            connect: tags.map((tag) => ({
              id: tag.value,
            })),
          },
          images: {
            create: images?.map((image) => ({
              secureUrl: image.secure_url,
              publicId: image.public_id,
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
