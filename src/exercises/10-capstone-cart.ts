/* ============================================================
 * EXERCISE 10 — Capstone: Type & Build a Shopping Cart
 * ============================================================
 * Pull it all together: interfaces, generics, unions, utility types,
 * narrowing, and typed operations. No `any`. Run typecheck AND test.
 * ============================================================ */

/* ---- 10a. Types ---- */
export interface CartItem {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  currency: "ZAR" | "USD";
}

/* ---- 10b. Operations (all PURE — never mutate the input cart) ---- */

export function addItem(cart: Cart, item: CartItem): Cart {
  const exists = cart.items.some((i) => i.productId === item.productId);
  const nextItems = exists
    ? cart.items.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      )
    : [...cart.items, item];

  return { ...cart, items: nextItems };
}

export function removeItem(cart: Cart, productId: number): Cart {
  return {
    ...cart,
    items: cart.items.filter((item) => item.productId !== productId),
  };
}

export function subtotal(cart: Cart): number {
  return cart.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
}

export function applyDiscount(cart: Cart, rate: number): number {
  if (rate < 0 || rate > 1) {
    throw new Error("Discount rate must be between 0 and 1");
  }
  return subtotal(cart) * (1 - rate);
}

/* ---- 10c. Sample data (must satisfy your types) ---- */
export const cart: Cart = {
  currency: "ZAR",
  items: [
    { productId: 1, name: "Mug", unitPrice: 80, quantity: 2 },
    { productId: 2, name: "Notebook", unitPrice: 45, quantity: 1 },
  ],
};

// @ts-expect-error "EUR" is not a supported currency
export const badCart: Cart = { currency: "EUR", items: [] };