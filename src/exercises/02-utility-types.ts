/* ============================================================
 * EXERCISE 2 — Utility Types (Partial, Pick, Omit, Record)
 * ============================================================
 * No `any`. Run `npm run typecheck`.
 * ============================================================ */

import type { Product } from "./01-generic-constraints.ts";

/* ---- 2a. Partial for updates ---- */
export function updateProduct(product: Product, changes: Partial<Product>): Product {
  return { ...product, ...changes };
}

/* ---- 2b. Pick ---- */
export type ProductPreview = Pick<Product, "id" | "name">;
export const preview: ProductPreview = { id: 1, name: "Mug" };

/* ---- 2c. Omit ---- */
export type NewProduct = Omit<Product, "id">;
export const draft: NewProduct = { name: "Pen", price: 15, inStock: true };

/* ---- 2d. Record ---- */
export type PriceList = Record<string, number>;

export function buildPriceList(items: Product[]): PriceList {
  return items.reduce<PriceList>((acc, item) => {
    acc[item.name] = item.price;
    return acc;
  }, {});
}

// @ts-expect-error id was omitted from NewProduct
export const badDraft: NewProduct = { id: 9, name: "Pen", price: 15, inStock: true };