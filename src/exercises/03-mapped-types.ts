/* ============================================================
 * EXERCISE 3 — Mapped Types
 * ============================================================
 * Build your OWN mapped types (do not just use built-ins).
 * No `any`. Run `npm run typecheck`.
 * ============================================================ */

export interface Settings {
  theme: string;
  fontSize: number;
  notifications: boolean;
}

/* ---- 3a. ReadOnly<T> (your own) ---- */
export type ReadOnly<T> = { readonly [K in keyof T]: T[K] };

export const locked: ReadOnly<Settings> = { theme: "dark", fontSize: 14, notifications: true };
// @ts-expect-error every field is readonly
locked.theme = "light";

/* ---- 3b. Nullable<T> ---- */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

export const partial: Nullable<Settings> = { theme: null, fontSize: 14, notifications: null };

/* ---- 3c. Getters<T> — mapped type with key remapping ---- */
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Must satisfy the Getters shape once your type is correct:
export const settingsGetters: Getters<Settings> = {
  getTheme: () => "dark",
  getFontSize: () => 14,
  getNotifications: () => true,
};