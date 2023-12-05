import { z } from "zod";

export const ProductIDSchema = z
  .string()
  .min(1)
  .refine((str) => str.includes("product-"), "Invalid product ID");

export const PositionSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});
export type Position = z.infer<typeof PositionSchema>;

export const ProductPositionSchema = z.object({
  positionId: z.string().min(1),
  productId: ProductIDSchema,
  quantity: z.number(),
  ...PositionSchema.shape,
});
export type ProductPosition = z.infer<typeof ProductPositionSchema>;

export const InputSchema = z.object({
  products: z.array(ProductIDSchema),
  startingPosition: PositionSchema,
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
