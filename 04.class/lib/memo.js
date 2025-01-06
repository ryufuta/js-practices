import sqlite3 from "sqlite3";

export class Memo {
  static #db = null;

  static get db() {
    if (!this.#db) {
      this.#db = new sqlite3.Database("memo.sqlite3");
    }
    return this.#db;
  }

  static all() {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT rowid, * FROM memos ORDER BY rowid ASC",
        (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows);
          }
        },
      );
    });
  }

  static create(title, content) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO memos VALUES (?, ?)",
        [title, content],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT rowid, * FROM memos WHERE rowid == (?)",
        id,
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve(row);
          }
        },
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM memos WHERE rowid == (?)", id, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static close() {
    return new Promise((resolve, reject) => {
      this.db.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos (title TEXT NOT NULL UNIQUE CHECK(title != ''), content TEXT)",
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }
}
