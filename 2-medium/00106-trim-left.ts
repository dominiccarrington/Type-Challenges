/***
Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.

For example

```ts
type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
```
***/

/* === PROBLEM === */
type TrimLeft<S extends string> = S extends ""
  ? ""
  : S extends `${infer SFirst}${infer SRest}`
  ? SFirst extends " "
    ? TrimLeft<SRest>
    : SFirst extends "\n"
    ? TrimLeft<SRest>
    : SFirst extends "\t"
    ? TrimLeft<SRest>
    : `${SFirst}${SRest}`
  : never;

type A = TrimLeft<"str">;
//   ^?

type B = TrimLeft<" str">;
//   ^?

/* 
=== EXPLANATION ===
String Interpolation works in types?!
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>
];
