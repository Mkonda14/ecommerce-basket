"use server";

import { CustomSchema } from "@/models/custom";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { generateSlug } from "../help";

export const saveCustom = authAdminAction
  .schema(CustomSchema)
  .action(async ({parsedInput: data}) => {

    try {
    const {
      name,
      description,
      price,
      themes,
      colorSecondaries,
      images,
      colorPrimary,
      categories
    } = data;

      const custom = await db.custom.create({
        data: {
          slug: generateSlug(name),
  
          name: name,
          description,
          price: parseFloat(price.toString()),

          colorSecondaries: colorSecondaries ? {
            create: colorSecondaries?.map((color) => ({
              color: color?.code || "",
              name: color?.name || "",
            })),
          } : {},

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
        message: `Custom: ${custom.name} saved successfully`,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      throw new ActionError(error.message);
    }
  });
