Advanced TypeScript Assessment — Writeup
1. What does a generic constraint (K extends keyof T) buy you over any?
Using any completely opts out of TypeScript's type-checking system, meaning the compiler treats the type as an unverified wildcard. It provides zero autocompletion and won't catch spelling mistakes or runtime errors.

A generic constraint like K extends keyof T ensures a strict, mathematical relationship between two entities. It guarantees that:

The key K must dynamically match one of the actual literal property keys belonging to object T.

The return type can be tracked perfectly (e.g., tracking T[K] ensures that when you access a property, TypeScript knows exactly what structural type or primitive comes out of it).

Any typo or attempt to pass an invalid property string will be caught instantly at compile-time.

2. When would you use a mapped type vs a utility type like Pick?
Utility Types (Pick, Omit, etc.): You use these when you want to create a subset or modification of an existing object shape without fundamentally restructuring or altering the individual value types of its fields. For example, Pick<Product, "id" | "name"> extracts specific keys cleanly as-is.

Mapped Types: You use a custom mapped type when you need to loop through keys and systematically transform or remap either the keys themselves or their value types. For example, if you need to strip away nullability from every field (NonNullableFields<T>), make all fields read-only, or remap key names using string literal types (as \${P}_${K}``), a standard utility type cannot achieve this. You must use a custom mapped type loop.

3. What is the difference between unknown and any, and why is a type guard safer than a cast?
any vs unknown: Both can hold any value whatsoever. However, any allows you to immediately call methods, access properties, or assign it anywhere without checking first. On the other hand, unknown is highly restrictive. It tells the compiler, "This could be anything, so you cannot interact with it until you safely prove what type it is."

Type Guards vs Casts (as T): Type assertions (casting) simply tell the compiler to blindly trust your word and shut down warnings. If the runtime data structure changes or doesn't match your assertion, the application will crash at runtime. A type guard is vastly safer because it uses structural runtime logic (typeof, in, etc.) to dynamically verify the shape. It guarantees that the code branch only executes if the contract is truly fulfilled, preserving absolute type-safety.