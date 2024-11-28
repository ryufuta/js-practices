import { describe, it } from "node:test";
import * as assert from "node:assert";
import { buildCalendar } from "../cal.js";

describe("given a year and month, buildCalendar returns the same calendar string as the macOS cal command", () => {
  // macOSのcalコマンドではカレンダー全体の行数は常に8行
  // 年月によって日付が並ぶ行の行数が4~6とブレがあるが、不足分は空行で埋められる仕様
  // テストケース削減のためにこの空行の数の観点で同値分割した上でカレンダー全体の文字列をチェックする

  it("calendar with no blank lines", () => {
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

  it("calendar with a blank line", () => {
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

  it("calendar with two blank lines", () => {
    const expected = `      2月 1970
日 月 火 水 木 金 土
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28

`;
    assert.strictEqual(buildCalendar(1970, 2), expected);
  });
});
