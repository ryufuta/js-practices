import { Memo } from "./memo.js";
import { View } from "./view.js";

export class App {
  #view = null;

  constructor() {
    this.#view = new View();
  }

  async run(params) {
    await Memo.createTable();

    if (params.l) {
      await this.#printMemos();
    } else if (params.r) {
      await this.#printMemo();
    } else if (params.d) {
      await this.#deleteMemo();
    } else {
      await this.#createMemo();
    }

    await Memo.close();
  }

  async #printMemos() {
    const memos = await Memo.all();
    if (memos.length > 0) {
      this.#view.printMemos(memos);
    } else {
      this.#view.printNoMemos();
    }
  }

  async #printMemo() {
    await this.#selectMemo("see", async (selectedId) => {
      const memo = await Memo.find(selectedId);
      this.#view.printMemo(memo);
    });
  }

  async #deleteMemo() {
    await this.#selectMemo("delete", (selectedId) => Memo.delete(selectedId));
  }

  async #createMemo() {
    const buffers = [];
    for await (const chunk of process.stdin) {
      buffers.push(chunk);
    }
    const [title, ...contentRows] = Buffer.concat(buffers)
      .toString()
      .split("\n");
    const content = contentRows.join("\n");

    try {
      await Memo.create(title, content);
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT") {
        console.error(error.message);
      } else {
        throw error;
      }
    }
  }

  async #selectMemo(act, callback) {
    const memos = await Memo.all();
    if (memos.length > 0) {
      const selectedId = await this.#view.displayMemoSelectionPrompt(
        memos,
        act,
      );
      return callback(selectedId);
    }

    this.#view.printNoMemos();
  }
}
