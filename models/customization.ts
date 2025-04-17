import {z} from "zod";

export const CustomizationSchema = z.object({
    graffitti: z.string(),
    text: z.string().min(1, "integer property text is required"),
    instruction: z.string().optional(),
    description: z.string().optional(),
    colors: z.array(z.object({
        code: z.string(),
        name: z.string()
    })).optional(),
});