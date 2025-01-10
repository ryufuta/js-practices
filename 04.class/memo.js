#!/usr/bin/env node

import minimist from "minimist";
import { App } from "./lib/app.js";

const params = minimist(process.argv.slice(2));
const app = new App();
await app.run(params);
