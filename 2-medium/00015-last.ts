/***
Implement a generic `Last<T>` that takes an Array `T` and returns its last element.

For example

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```
***/

/* === PROBLEM === */
type Last<TArr extends any[]> = TArr extends [infer TFirst]
  ? TFirst
  : TArr extends [any, ...infer TRest]
  ? Last<TRest>
  : never;

/* 
=== EXPLANATION ===
Tail Recursion

TODO: Expand on the type to limit the input to an array of length >= 1
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
