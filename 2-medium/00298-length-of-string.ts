/***
Compute the length of a string literal, which behaves like `String#length`.
***/

/* === PROBLEM === */
type StringToTuple<S extends string> = S extends ""
  ? []
  : S extends `${infer SFirst}${infer SLast}`
  ? [SFirst, ...StringToTuple<SLast>]
  : [];

type LengthOfString<S extends string> = S extends ""
  ? 0
  : StringToTuple<S>["length"];

type A = LengthOfString<"foo">;
//   ^?

/* 
=== EXPLANATION ===
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];
