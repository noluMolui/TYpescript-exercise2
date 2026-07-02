/* ============================================================
 * EXERCISE 4 — Conditional Types & infer
 * ============================================================
 * No `any`. Run `npm run typecheck`.
 * ============================================================ */

/* ---- 4a. Flatten<T> ---- */
export type Flatten<T> = T extends (infer U)[] ? U : T;

// Compile-time checks (these are type-level assertions):
export const f1: Flatten<string[]> = "hello";   // must be string
export const f2: Flatten<number> = 42;          // must be number

/* ---- 4b. UnwrapPromise<T> ---- */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export const u1: UnwrapPromise<Promise<boolean>> = true;   // boolean
export const u2: UnwrapPromise<string> = "x";              // string

/* ---- 4c. NonNullableFields<T> ---- */
export type NonNullableFields<T> = { [K in keyof T]: NonNullable<T[K]> };

type Raw = { a: string | null; b: number | undefined };
export const clean: NonNullableFields<Raw> = { a: "ok", b: 5 };
// @ts-expect-error a can no longer be null
export const bad: NonNullableFields<Raw> = { a: null, b: 5 };