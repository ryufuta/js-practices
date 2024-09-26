import { test } from "node:test";
import * as assert from "node:assert";
import { fizzbuzz } from "../fizzbuzz.js";

test("converts a multiple of 3 to Fizz", () => {
  assert.strictEqual(fizzbuzz(3), "Fizz");
});

test("converts a multiple of 5 to Buzz", () => {
  assert.strictEqual(fizzbuzz(5), "Buzz");
});

test("converts a multiple of 3 and 5 to FizzBuzz", () => {
  assert.strictEqual(fizzbuzz(15), "FizzBuzz");
});

test("converts any other number to string", () => {
  assert.strictEqual(fizzbuzz(1), "1");
});
