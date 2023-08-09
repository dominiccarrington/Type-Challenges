/***
Implement a generic `Pop<T>` that takes an Array `T` and returns an Array without it's last element.

For example

```ts
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
```

**Extra**: Similarly, can you implement `Shift`, `Push` and `Unshift` as well?
***/

/* === PROBLEM === */
type Pop<T extends any[]> = T extends [any]
  ? []
  : T extends [infer TFirst, ...infer TRest]
  ? [TFirst, ...Pop<TRest>]
  : [];

/* 
=== EXPLANATION ===
Again using tail recursion.
Once the array has 1 element in it, just ignore it.
*/

type Shift<T extends any[]> = T extends [any, ...infer TRest] ? TRest : [];

type Push<T extends any[], V> = [...T, V];

/* 
=== EXPLANATION ===
*/

type Unshift<T extends any[], V> = [V, ...T];

/* 
=== EXPLANATION ===
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>,
  Expect<Equal<Pop<[]>, []>>
];

type casesShift = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<["a", "b", "c", "d"]>, ["b", "c", "d"]>>,
  Expect<Equal<Shift<[]>, []>>
];

type casesPush = [
  Expect<Equal<Push<[3, 2, 1], 4>, [3, 2, 1, 4]>>,
  Expect<Equal<Push<["a", "b", "c", "d"], "e">, ["a", "b", "c", "d", "e"]>>,
  Expect<Equal<Push<[], 2>, [2]>>
];

type casesUnshift = [
  Expect<Equal<Unshift<[3, 2, 1], 4>, [4, 3, 2, 1]>>,
  Expect<Equal<Unshift<["a", "b", "c", "d"], "e">, ["e", "a", "b", "c", "d"]>>,
  Expect<Equal<Unshift<[], 1>, [1]>>
];
