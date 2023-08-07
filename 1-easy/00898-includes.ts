/* === PROBLEM === */
type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [
  infer TFirst,
  ...infer TRest
]
  ? IsEqual<TFirst, U> extends true
    ? true
    : Includes<TRest, U>
  : false;

/* 
=== EXPLANATION ===
I wouldn't call this an easy one due to the `IsEqual` constraint.
My initial idea of tail recursion was correct however I wasn't writing the syntax correctly,
  mainly where the false and the includes should have gone

`type Includes<T extends readonly any[], U> = U extends T[number] ? true : false`
  This works to match the general type however this fails with Includes<[{}], { a: "A" }> 
  since {} is the any object it matches { a:"A" }. etc.

My implementation uses tail recursion to check every element of the tuple for U.
  `T extends [infer TFirst, ...infer TRest]` feels very Haskell or Prolog.
  We check TFirst against U, if it doesn't match when we recursively call Includes with
  the rest of the array
Once the whole array has been checked, the type should be false
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];
