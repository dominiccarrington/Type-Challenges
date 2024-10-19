/* === PROBLEM === */
type Diff<
  TOne extends Record<PropertyKey, any>,
  TTwo extends Record<PropertyKey, any>
> = {
  [K in keyof (TOne & TTwo) as K extends keyof (TOne | TTwo)
    ? never
    : K]: (TOne & TTwo)[K];
};

/* 
=== EXPLANATION ===
Attempt 1: Omit<TOne, keyof TTwo> & Omit<TTwo, keyof TOne>;
 - I don't know why this fails the tests, the types look correct
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type A = Prettify<Diff<Foo, Bar>>;
//   ^?

type B = Prettify<Diff<Foo, Bar>>;
//   ^?

type C = Prettify<Diff<Foo, Coo>>;
//   ^?

type D = Prettify<Diff<Coo, Foo>>;
//   ^?

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];
