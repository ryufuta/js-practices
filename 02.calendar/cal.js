#!/usr/bin/env node

import minimist from "minimist";

export const buildCalendar = (year, month) => {
  return [
    buildCalendarHeader(year, month),
    buildCalendarBody(year, month),
  ].join("\n");
};

const buildCalendarHeader = (year, month) => {
  return [`      ${month}月 ${year}`, "日 月 火 水 木 金 土"].join("\n");
};

const buildCalendarBody = (year, month) => {
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  const dateStrings = [
    ...Array(firstDate.getDay()).fill("  "),
    ...Array.from({ length: lastDate.getDate() }, (_, i) =>
      String(i + 1).padStart(2),
    ),
  ];

  const dayCountPerRow = 7;
  const rows = [];
  while (dateStrings.length > 0) {
    const dateStringsPerRow = dateStrings.splice(0, dayCountPerRow);
    rows.push(dateStringsPerRow.join(" "));
  }
  const totalRows = 6;
  return rows.concat(Array(totalRows - rows.length).fill("")).join("\n");
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
