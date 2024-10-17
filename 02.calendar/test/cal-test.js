import { test } from "node:test";
import * as assert from "node:assert";
import { buildCalendar } from "../cal.js";

test("2024_3 calendar with no blank lines", () => {
  const expected = `      3月 2024
日 月 火 水 木 金 土
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31`;
  assert.strictEqual(buildCalendar(2024, 3), expected);
});

test("2023_11 calendar with a blank line", () => {
  const expected = `      11月 2023
日 月 火 水 木 金 土
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30
`;
  assert.strictEqual(buildCalendar(2023, 11), expected);
});

test("1970_2 calendar with two blank lines", () => {
  const expected = `      2月 1970
日 月 火 水 木 金 土
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28

`;
  assert.strictEqual(buildCalendar(1970, 2), expected);
});
