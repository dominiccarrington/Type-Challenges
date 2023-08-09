/***
Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

For example

```ts
type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
```
***/

/* === PROBLEM === */
type Whitespace = "\n" | "\t" | " ";

type TrimLeft<S extends string> = S extends ""
  ? ""
  : S extends `${Whitespace}${infer Rest}`
  ? TrimLeft<Rest>
  : S;

type WhitespaceString<S extends string> = S extends ""
  ? false
  : S extends Whitespace
  ? true
  : S extends `${infer SFirst}${infer SLast}`
  ? SFirst extends Whitespace
    ? WhitespaceString<SLast> extends true
      ? true
      : false
    : false
  : false;

type TrimRight<S extends string> = S extends ""
  ? ""
  : S extends `${infer SFirst}${infer SRest}`
  ? SFirst extends Whitespace
    ? WhitespaceString<SRest> extends true
      ? ""
      : `${SFirst}${TrimRight<SRest>}`
    : `${SFirst}${TrimRight<SRest>}`
  : S;

type Trim<S extends string> = TrimRight<TrimLeft<S>>;

type A1 = Trim<"str">;
//   ^?

type A2 = Trim<"     str">;
//   ^?

type A3 = Trim<"     str     ">;
//   ^?

type A4 = Trim<"   \n\t foo bar \t">;
//   ^?

type B1 = WhitespaceString<"">;
//   ^?

type B2 = WhitespaceString<" ">;
//   ^?

type B3 = WhitespaceString<" aa ">;
//   ^?

/* 
=== EXPLANATION ===
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];
