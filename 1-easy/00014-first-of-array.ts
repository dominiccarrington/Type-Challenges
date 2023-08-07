/* === PROBLEM === */
type First<TArray extends any[]> = TArray extends [infer TFirst, ...any]
  ? TFirst
  : never;

/* 
=== EXPLANATION ===
`TArray extends any[]` defines the type parameter. TArray must be an array of any type

`TArray extends [infer TFirst, ...any]` defines a condition on the type.
  This allows TypeScript to get the type of the first item in the array
  while providing a check to see if there is a first item.

We can't use `TArray extends [TFirst, ...any]` since this makes First<[]> an invalid type.
  First<[]> is a valid case therefore we can't block it.
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];
