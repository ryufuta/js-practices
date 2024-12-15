import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { dbRunWithPromise, dbGetWithPromise } from "./lib/sqlite3_promise.js";

const db = new sqlite3.Database(":memory:");

// エラーなしのプログラム
await dbRunWithPromise(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)");
const result = await dbRunWithPromise(
  db,
  "INSERT INTO books VALUES (?)",
  "JavaScript Primer",
);
console.log(`自動採番されたID: ${result.lastID}`);
const row = await dbGetWithPromise(db, "SELECT rowid AS id, title FROM books");
console.log(`取得したレコード: id: ${row.id}, title: ${row.title}`);
await dbRunWithPromise(db, "DROP TABLE books");

await timers.setTimeout(100);

// エラーありのプログラム
await dbRunWithPromise(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)");
try {
  await dbRunWithPromise(db, "INSERT INTO books VALUES (?)", null);
} catch (error) {
  console.error(`レコード追加時のエラー: ${error.message}`);
}
try {
  await dbGetWithPromise(db, "SELECT content FROM books");
} catch (error) {
  console.error(`レコード取得時のエラー: ${error.message}`);
}
await dbRunWithPromise(db, "DROP TABLE books");
db.close();
