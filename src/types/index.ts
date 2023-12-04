import { z } from "zod";

export const ProductIDSchema = z
  .string()
  .min(1)
  .refine((str) => str.includes("product-"), "Invalid product ID");

export const ProductPositionSchema = z.object({
  positionId: z.string().min(1),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  productId: ProductIDSchema,
  quantity: z.number(),
});
export type ProductPosition = z.infer<typeof ProductPositionSchema>;

export const StartingPositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type StartingPosition = z.infer<typeof StartingPositionSchema>;

export const InputSchema = z.object({
  products: z.array(ProductIDSchema),
  startingPosition: StartingPositionSchema,
});
export type Input = z.infer<typeof InputSchema>;

export const OutputSchema = z.object({
  pickingOrder: z.array(
    z.object({
      productId: ProductIDSchema,
      positionId: z.string(),
    }),
  ),
  distance: z.number(),
});
export type Output = z.infer<typeof OutputSchema>;
