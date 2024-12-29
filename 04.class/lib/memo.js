import sqlite3 from "sqlite3";

export class Memo {
  static #db = null;

  static get db() {
    if (this.#db === null) {
      this.#db = new sqlite3.Database("memo.sqlite3");
    }
    return this.#db;
  }

  static all() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos", (error, rows) => {
        if (error === null) {
          resolve(rows);
        } else {
          reject(error);
        }
      });
    });
  }

  static create(title, content) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO memos VALUES (?, ?)",
        [title, content],
        (error) => {
          if (error === null) {
            resolve();
          } else {
            reject(error);
          }
        },
      );
    });
  }

  static findByTitle(title) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM memos WHERE title == (?)",
        title,
        (error, row) => {
          if (error === null) {
            resolve(row);
          } else {
            reject(error);
          }
        },
      );
    });
  }

  static deleteByTitle(title) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM memos WHERE title == (?)", title, (error) => {
        if (error === null) {
          resolve();
        } else {
          reject(error);
        }
      });
    });
  }

  static close() {
    return new Promise((resolve, reject) => {
      this.db.close((error) => {
        if (error === null) {
          resolve();
        } else {
          reject(error);
        }
      });
    });
  }

  static createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos (title TEXT NOT NULL UNIQUE CHECK(title != ''), content TEXT)",
        (error) => {
          if (error === null) {
            resolve();
          } else {
            reject(error);
          }
        },
      );
    });
  }
}
