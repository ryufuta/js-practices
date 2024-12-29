import enquirer from "enquirer";

export class View {
  #MODE_TABLE = { r: "see", d: "delete" };

  printMemos(memos) {
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  }

  displayMemoSelectionPrompt(memos, mode) {
    const titles = memos.map((memo) => memo.title);
    const prompt = new enquirer.Select({
      name: "memo",
      message: `Choose a memo you want to ${this.#MODE_TABLE[mode]}:`,
      choices: titles,
    });
    return prompt.run();
  }

  printMemo(memo) {
    console.log(`${memo.title}\n${memo.content}`);
  }
}
