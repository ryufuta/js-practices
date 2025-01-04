import enquirer from "enquirer";

export class View {
  printMemos(memos) {
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  }

  displayMemoSelectionPrompt(memos, act) {
    const titles = memos.map((memo) => memo.title);
    const prompt = new enquirer.Select({
      name: "memo",
      message: `Choose a memo you want to ${act}:`,
      choices: titles,
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
