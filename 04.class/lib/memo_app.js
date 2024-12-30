import { Memo } from "./memo.js";
import { View } from "./view.js";

export class MemoApp {
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
    this.#view.printMemos(memos);
  }

  async #printMemo() {
    const memos = await Memo.all();
    const selectedTitle = await this.#view.displayMemoSelectionPrompt(
      memos,
      "r",
    );

    const selectedMemo = await Memo.findByTitle(selectedTitle);
    this.#view.printMemo(selectedMemo);
  }

  async #deleteMemo() {
    const memos = await Memo.all();
    const selectedTitle = await this.#view.displayMemoSelectionPrompt(
      memos,
      "d",
    );

    await Memo.deleteByTitle(selectedTitle);
  }

  async #createMemo() {
    const buffers = [];
    for await (const chunk of process.stdin) {
      buffers.push(chunk);
    }
    const rows = Buffer.concat(buffers).toString().split("\n");
    const title = rows[0];
    const content = rows.slice(1).join("\n");

    await Memo.create(title, content);
  }
}
