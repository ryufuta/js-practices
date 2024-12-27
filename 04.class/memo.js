#!/usr/bin/env node

import timers from "timers/promises";
import enquirer from "enquirer";
import minimist from "minimist";
import sqlite3 from "sqlite3";

const params = minimist(process.argv.slice(2));
const db = new sqlite3.Database("memo.sqlite3");
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS memos (title TEXT NOT NULL UNIQUE CHECK(title != ''), content TEXT)",
  );
});

if (params.l) {
  db.serialize(() => {
    db.each("SELECT title FROM memos", (_, row) => {
      console.log(row.title);
    });
  });
} else if (params.r) {
  let memos;
  db.serialize(() => {
    db.all("SELECT * FROM memos", (_, rows) => {
      memos = rows;
    });
  });

  await timers.setTimeout(100);
  const titles = memos.map((memo) => memo.title);
  const prompt = new enquirer.Select({
    name: "memo",
    message: "Choose a memo you want to see:",
    choices: titles,
  });
  const selectedTitle = await prompt.run();

  const selectedMemo = memos.filter((memo) => memo.title === selectedTitle)[0];
  console.log(`${selectedMemo.title}\n${selectedMemo.content}`);
} else if (params.d) {
  let memos;
  db.serialize(() => {
    db.all("SELECT * FROM memos", (_, rows) => {
      memos = rows;
    });
  });

  await timers.setTimeout(100);
  const titles = memos.map((memo) => memo.title);
  const prompt = new enquirer.Select({
    name: "memo",
    message: "Choose a memo you want to delete:",
    choices: titles,
  });
  const selectedTitle = await prompt.run();

  db.serialize(() => {
    db.run("DELETE FROM memos WHERE title == (?)", selectedTitle);
  });
} else {
  const buffers = [];
  for await (const chunk of process.stdin) {
    buffers.push(chunk);
  }
  const rows = Buffer.concat(buffers).toString().split("\n");
  const title = rows[0];
  const content = rows.slice(1).join("\n");

  db.serialize(() => {
    db.run("INSERT INTO memos VALUES (?, ?)", [title, content]);
  });
}

db.close();
