/***
Implement the String to Union type. Type take string argument. The output should be a union of input letters

For example

```ts
type Test = "123"
type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"
```
***/

/* === PROBLEM === */
type StringToUnion<S extends string> = S extends ""
  ? never
  : S extends `${infer SFirst}${infer SRest}`
  ? SFirst | StringToUnion<SRest>
  : never;

/* 
=== EXPLANATION ===
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >
];
