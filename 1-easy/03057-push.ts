/* === PROBLEM === */
type Push<T extends any[], U> = [...T, U];

/* 
=== EXPLANATION ===
Using array spread function, this is quite simple.
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];
