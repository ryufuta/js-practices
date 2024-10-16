#!/usr/bin/env node

import minimist from "minimist";

export const buildCalendar = (year, month) => {
  return [
    `      ${month}月 ${year}`,
    "日 月 火 水 木 金 土",
    ...buildCalendarBody(year, month),
  ].join("\n");
};

const buildCalendarBody = (year, month) => {
  const saturday = 6;
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  let rows = [];
  let row = new Array(firstDate.getDay()).fill("  ");
  [...Array(lastDate.getDate())]
    .map((_, i) => new Date(year, month - 1, i + 1))
    .forEach((date) => {
      row.push(String(date.getDate()).padStart(2));
      if (date.getDay() === saturday || date.getDate() === lastDate.getDate()) {
        rows.push(row.join(" "));
        row = [];
      }
    });
  const totalRows = 6;
  const emptyRows = new Array(totalRows - rows.length).fill("");
  return rows.concat(emptyRows);
};

if (import.meta.filename === process.argv[1]) {
  const today = new Date();
  const params = minimist(process.argv.slice(2), {
    default: {
      y: today.getFullYear(),
      m: today.getMonth() + 1,
    },
  });
  console.log(buildCalendar(params.y, params.m));
}
