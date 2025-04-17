"use server";

import { CustomizationSchema } from "@/models/customization";
import { db } from "@/lib/db";
import { ActionError, actionClient } from "@/lib/safe-actions";
import { z } from "zod";
import { currentUser } from "@/actions/auth";


const UpCustomizationSchema = z.object({
    custom : CustomizationSchema,
    sneaker: z.string(),
})

export const saveCustomization = actionClient
  .schema(UpCustomizationSchema)
  .action(async ({parsedInput: {custom, sneaker}}) => {

    try {
    const {
      graffitti,
      description,
      instruction,
      colors,
      text,
    } = custom;

      const user = await currentUser();
      if(!user || !user?.id) throw new ActionError("Veuillez-vous connecter d'abord si vous avez un compte");

      await db.customization.create({
        data: {  
            text: text,
          instruction: instruction || "",
          description: description || "",

          colors: colors ? {
            create: colors?.map((color) => ({
              color: color?.code || "",
              name: color?.name || "",
            })),
          } : {},

          graffiti: {
            connect: {
              id: graffitti,
            }
          },
          sneaker: {
            connect: {
              id: sneaker,
            }
          },
          user: {
            connect: {
              id: user.id,
            }
          },
          
          createdAt: new Date(),
        },
      });


      return {
        message: `Customization saved successfully`,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      throw new ActionError(error.message);
    }
  });
