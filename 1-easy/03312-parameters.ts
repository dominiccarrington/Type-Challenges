/* === PROBLEM === */
type MyParameters<TFunc extends (...args: any[]) => any> = TFunc extends (
  arg: undefined
) => any
  ? []
  : TFunc extends (...args: [infer TFirst, ...infer TRest]) => any
  ? [TFirst, ...MyParameters<(...args: TRest) => any>]
  : [];

/* 
=== EXPLANATION ===
Checking `TFunc extends () => any`
  This is checking for all functions that return any, so any function.
  This means that the type would escape after 1 iteration (I don't know
  why it didn't do 0 but oh well)

Instead we check for `TFunc extends (arg: undefined) => any`
  JavaScript, and therefore TypeScript, are funny beasts. If the argument is not 
  defined, it will be given as undefined. This allows us to create the escape clause.
  
After the escape check, we infer the First argument and the rest of the arguments.
  Then use tail recursion to run through the rest of the arguments in the same type
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
const baz = (): void => {};

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>
];
