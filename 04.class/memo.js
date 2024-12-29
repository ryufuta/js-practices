#!/usr/bin/env node

import minimist from "minimist";
import { Memo } from "./lib/memo.js";
import { View } from "./lib/view.js";

const params = minimist(process.argv.slice(2));
await Memo.createTable();
const view = new View();

if (params.l) {
  const memos = await Memo.all();
  view.printMemos(memos);
} else if (params.r) {
  const memos = await Memo.all();
  const selectedTitle = await view.displayMemoSelectionPrompt(memos, "r");

  const selectedMemo = await Memo.findByTitle(selectedTitle);
  view.printMemo(selectedMemo);
} else if (params.d) {
  const memos = await Memo.all();
  const selectedTitle = await view.displayMemoSelectionPrompt(memos, "d");

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
