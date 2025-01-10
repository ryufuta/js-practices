import enquirer from "enquirer";

export class View {
  printMemos(memos) {
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  }

  displayMemoSelectionPrompt(memos, act) {
    const choices = memos.map((memo) => {
      return { name: memo.title, value: memo.id };
    });
    const prompt = new enquirer.Select({
      name: "memo",
      message: `Choose a memo you want to ${act}:`,
      choices,
      result() {
        return this.focused.value;
      },
    });
    return prompt.run();
  }

  printMemo(memo) {
    console.log(`${memo.title}\n${memo.content}`);
  }

  printNoMemos() {
    console.error("メモがありません");
  }
}
