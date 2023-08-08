/* === PROBLEM === */
type MyOmit<
  TObj extends Record<TOmitKey, any>,
  TOmitKey extends PropertyKey
> = {
  [TProp in Exclude<keyof TObj, TOmitKey>]: TObj[TProp];
};

/* 
=== EXPLANATION ===
Original Idea was `[TProp in TObj]: TProp extends TOmitKey ? never : TObj[TProp]`
  However this makes the keys return Key: never which doesn't remove the key from the object
  
The correct option is to use Exclude
*/

/* === TEST CASES === */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}
