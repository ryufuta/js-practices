import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

// エラーなしのプログラム
db.run("CREATE TABLE books (title TEXT NOT NULL UNIQUE)", () => {
  db.run("INSERT INTO books VALUES (?)", "JavaScript Primer", function () {
    console.log(`自動採番されたID: ${this.lastID}`);
    db.get("SELECT rowid AS id, title FROM books", (_, row) => {
      console.log(`取得したレコード: id: ${row.id}, title: ${row.title}`);
      db.run("DROP TABLE books");
    });
  });
});

await timers.setTimeout(100);

// エラーありのプログラム
db.run("CREATE TABLE books (title TEXT NOT NULL UNIQUE)", () => {
  db.run("INSERT INTO books VALUES (?)", null, (error) => {
    console.error(`レコード追加時のエラー: ${error}`);
    db.get("SELECT content FROM books", (error) => {
      console.error(`レコード取得時のエラー: ${error}`);
      db.run("DROP TABLE books", () => {
        db.close();
      });
    });
  });
});
