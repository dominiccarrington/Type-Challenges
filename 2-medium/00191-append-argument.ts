/***
For given function type `Fn`, and any type `A` (any in this context means we don't restrict the type, 
  and I don't have in mind any type 😉) create a generic type which will take `Fn` as the first argument, 
  `A` as the second, and will produce function type `G` which will be the same as `Fn` but with appended argument 
  `A` as a last one.

For example,

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// expected be (a: number, b: string, x: boolean) => number
```

> This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-4-495c) 
  by [@maciejsikora](https://github.com/maciejsikora)
***/

/* === PROBLEM === */
type AppendArgument<Fn extends (...args: any) => any, A> = Fn extends (
  ...args: infer Params
) => infer Return
  ? Params extends [infer FirstParam, ...infer RestParams]
    ? AppendArgument<(...args: RestParams) => any, A> extends (
        ...args: infer NewParams
      ) => any
      ? (_: FirstParam, ...args: NewParams) => Return
      : never
    : Params extends []
    ? (x: A) => Return
    : never
  : never;

/* 
=== EXPLANATION ===
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
//    ^?

type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
//    ^?

type Result2 = (x: undefined) => void;

type Case3 = AppendArgument<
  //    ^?
  (a: number, b: string, c: boolean) => void,
  undefined
>;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>
];
