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
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const last_date = new Date(year, month, 0).getDate();
  let rows = [];
  let row = new Array(firstDayOfWeek).fill("  ");
  let dayOfWeek = firstDayOfWeek;
  for (let i = 1; i <= last_date; i++) {
    row.push(String(i).padStart(2));
    if (dayOfWeek === saturday || i === last_date) {
      rows.push(row.join(" "));
      row = [];
      dayOfWeek = 0;
    } else {
      dayOfWeek++;
    }
  }
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
