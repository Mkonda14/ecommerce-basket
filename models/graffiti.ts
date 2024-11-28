import {z} from "zod";

export const GraffitiSchema = z.object({
    name: z.string().min(1, "string property name is required"),
    description: z.string().min(1, "string property description is required"),
    image: z.object({
        secure_url: z.string().default(""),
        public_id: z.string().default("")
    }),
    category: z.string(),
    defaultColors: z.array(z.object({
        code: z.string(),
        name: z.string()
    })),
    textMinLength: z.string().default('1').optional(),
    textMaxLength: z.string().default('1').optional(),
    textMaxWords: z.string().default('1').optional(),
})

export const CategoryGraffitiSchema = z.object({
    name: z.string().min(1, "integer property name is required"),
    secondName: z.string().optional(),
    description: z.string().min(1, "integer property description is required"),
});

export const CustomizationSchema = z.object({
    text: z.string().min(1, "integer property text is required"),
    instruction: z.string().optional(),
    description: z.string().optional(),
    colors: z.array(z.object({
        code: z.string(),
        name: z.string()
    })).optional(),
    sneaker: z.string(),
    user: z.string(),
});