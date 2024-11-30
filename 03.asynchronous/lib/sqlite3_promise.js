export const dbRunWithPromise = (db, sql, params) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error === null) {
        resolve(this);
      } else {
        reject(error);
      }
    });
  });

export const dbGetWithPromise = (db, sql, params) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error === null) {
        resolve(row);
      } else {
        reject(error);
      }
    });
  });
