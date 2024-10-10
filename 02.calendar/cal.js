#!/usr/bin/env node

import parseArgs from "minimist";

export const cal = (year, month) => {
  return [
    `      ${month}月 ${year}`,
    "日 月 火 水 木 金 土",
    ...arrangeDates(year, month),
  ].join("\n");
};

const arrangeDates = (year, month) => {
  const saturDay = 6;
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const last_date = new Date(year, month, 0).getDate();
  let rows = [];
  let row = new Array(firstDayOfWeek).fill("  ");
  let dayOfWeek = firstDayOfWeek;
  for (let i = 1; i <= last_date; i++) {
    row.push(String(i).padStart(2));
    if (dayOfWeek === saturDay || i === last_date) {
      rows.push(row.join(" "));
      row = [];
      dayOfWeek = 0;
    } else {
      dayOfWeek++;
    }
  }
  const totalRows = 6;
  if (rows.length < totalRows) {
    rows.push("");
  }
  return rows;
};

if (import.meta.filename === process.argv[1]) {
  const today = new Date();
  const options = {
    default: {
      y: today.getFullYear(),
      m: today.getMonth() + 1,
    },
  };
  const params = parseArgs(process.argv.slice(2), options);
  console.log(cal(params.y, params.m));
}
