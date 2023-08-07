/* === PROBLEM === */
type MyReadonly<TObj> = {
  readonly [TKey in keyof TObj]: TObj[TKey];
};

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
