"use server"

import * as z from "zod";
import { ProductSchema } from "@/models/product";

export const saveProduct = (data: z.infer<typeof ProductSchema>): void => {
    // Save product to your database here
    console.log("Product saved successfully", data);
    // Send a confirmation email to the user
}
