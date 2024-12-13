import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { dbRunWithPromise, dbGetWithPromise } from "./lib/sqlite3_promise.js";

const db = new sqlite3.Database(":memory:");

// エラーなしのプログラム
dbRunWithPromise(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)")
  .then(() =>
    dbRunWithPromise(db, "INSERT INTO books VALUES (?)", "JavaScript Primer"),
  )
  .then((result) => {
    console.log(`自動採番されたID: ${result.lastID}`);
    return dbGetWithPromise(db, "SELECT rowid AS id, title FROM books");
  })
  .then((row) => {
    console.log(`取得したレコード: id: ${row.id}, title: ${row.title}`);
    dbRunWithPromise(db, "DROP TABLE books");
  });

await timers.setTimeout(100);

// エラーありのプログラム
dbRunWithPromise(db, "CREATE TABLE books (title TEXT NOT NULL UNIQUE)")
  .then(() => dbRunWithPromise(db, "INSERT INTO books VALUES (?)", null))
  .catch((error) => {
    console.error(`レコード追加時のエラー: ${error}`);
    return dbGetWithPromise(db, "SELECT content FROM books");
  })
  .catch((error) => {
    console.error(`レコード取得時のエラー: ${error}`);
    dbRunWithPromise(db, "DROP TABLE books");
  })
  .finally(() => db.close());
