#!/usr/bin/env node

import enquirer from "enquirer";
import minimist from "minimist";
import { Memo } from "./lib/memo.js";

const params = minimist(process.argv.slice(2));
await Memo.createTable();

if (params.l) {
  const memos = await Memo.all();
  memos.forEach((memo) => {
    console.log(memo.title);
  });
} else if (params.r) {
  const memos = await Memo.all();
  const titles = memos.map((memo) => memo.title);
  const prompt = new enquirer.Select({
    name: "memo",
    message: "Choose a memo you want to see:",
    choices: titles,
  });
  const selectedTitle = await prompt.run();

  const selectedMemo = await Memo.findByTitle(selectedTitle);
  console.log(`${selectedMemo.title}\n${selectedMemo.content}`);
} else if (params.d) {
  const memos = await Memo.all();
  const titles = memos.map((memo) => memo.title);
  const prompt = new enquirer.Select({
    name: "memo",
    message: "Choose a memo you want to delete:",
    choices: titles,
  });
  const selectedTitle = await prompt.run();

  await Memo.deleteByTitle(selectedTitle);
} else {
  const buffers = [];
  for await (const chunk of process.stdin) {
    buffers.push(chunk);
  }
  const rows = Buffer.concat(buffers).toString().split("\n");
  const title = rows[0];
  const content = rows.slice(1).join("\n");

  await Memo.create(title, content);
}

await Memo.close();
