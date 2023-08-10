/***
Merge two types into a new type. Keys of the second type overrides keys of the first type.

For example

```ts
type foo = {
  name: string
  age: string
}
type coo = {
  age: number
  sex: string
}

type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
```
***/

/* === PROBLEM === */
type Merge<
  F extends Record<PropertyKey, any>,
  S extends Record<PropertyKey, any>
> = {
  [Prop in keyof F | keyof S]: Prop extends keyof S ? S[Prop] : F[Prop];
};

type A = Merge<Foo, Bar>;
//   ^?

/* 
=== EXPLANATION ===
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];
