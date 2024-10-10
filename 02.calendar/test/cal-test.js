import { test } from "node:test";
import * as assert from "node:assert";
import { cal } from "../cal.js";

// 月が1桁
test("2024_3", () => {
  const expected = `      3月 2024
日 月 火 水 木 金 土
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31`;
  assert.strictEqual(cal(2024, 3), expected);
});

// 月が2桁、最終行が空行
test("2023_11", () => {
  const expected = `      11月 2023
日 月 火 水 木 金 土
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30
`;
  assert.strictEqual(cal(2023, 11), expected);
});

// 最終2行が空行
test("1970_2", () => {
  const expected = `      2月 1970
日 月 火 水 木 金 土
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28

`;
  assert.strictEqual(cal(1970, 2), expected);
});
