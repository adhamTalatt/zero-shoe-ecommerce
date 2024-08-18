import { z } from "zod";

export const productSchena = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  categery: z.enum(["man", "women", "kids"]),
  isFeatured: z.boolean().optional(),
});
