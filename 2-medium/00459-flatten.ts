/***
In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

For example:

```ts
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```
***/

/* === PROBLEM === */
type Flatten<T extends any[]> = T extends []
  ? []
  : T extends [infer TFirst, ...infer TRest]
  ? [...(TFirst extends any[] ? Flatten<TFirst> : [TFirst]), ...Flatten<TRest>]
  : [];

type A = Flatten<[]>;
//    ^?

type B = Flatten<[1, 2, 3, 4]>;
//    ^?

type C = Flatten<[1, 2, [3, 4], [[[5]]]]>;
//    ^?

type D = Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>;
//    ^?

/* 
=== EXPLANATION ===
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >
];

// @ts-expect-error
type error = Flatten<"1">;
