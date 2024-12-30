#!/usr/bin/env node

import minimist from "minimist";
import { MemoApp } from "./lib/memo_app.js";

const params = minimist(process.argv.slice(2));
const app = new MemoApp();
await app.run(params);
