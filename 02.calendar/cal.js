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
  let datesPerWeek = new Array(firstDate.getDay()).fill("  ");
  const rows = [];
  [...Array(lastDate.getDate())]
    .map((_, i) => new Date(year, month - 1, i + 1))
    .forEach((date) => {
      datesPerWeek.push(String(date.getDate()).padStart(2));
      if (date.getDay() === saturday || date.getDate() === lastDate.getDate()) {
        rows.push(datesPerWeek.join(" "));
        datesPerWeek = [];
      }
    });
  const totalRows = 6;
  return rows.concat(new Array(totalRows - rows.length).fill(""));
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
