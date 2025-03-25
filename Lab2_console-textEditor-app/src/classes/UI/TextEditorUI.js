const readline = require("readline");

class TextEditorUI {
  constructor(documentManager, rl) {
    this.documentManager = documentManager;
    this.rl = rl;
  }

  edit() {
    if (!this.documentManager.document) {
      console.log("Нет открытого документа");
      return Promise.resolve();
    }

    console.log("\nРедактируйте текст (Ctrl+X для завершения):");

    let text = this.documentManager.document.getContent();
    let cursorPos = text.length;

    process.stdin.setRawMode(true);
    readline.emitKeypressEvents(process.stdin);

    const renderText = () => {
      process.stdout.write("\x1b[2J\x1b[0;0H");
      const lines = text.split("\n");
      let charCount = 0;

      let cursorLine = 0;
      let cursorCol = cursorPos;
      for (let i = 0; i < lines.length; i++) {
        if (charCount + lines[i].length >= cursorPos) {
          cursorLine = i;
          cursorCol = cursorPos - charCount;
          break;
        }
        charCount += lines[i].length + 1;
      }

      for (let i = 0; i < lines.length; i++) {
        if (i === cursorLine) {
          process.stdout.write(
            lines[i].slice(0, cursorCol) + "|" + lines[i].slice(cursorCol)
          );
        } else {
          process.stdout.write(lines[i]);
        }
        if (i < lines.length - 1) process.stdout.write("\n");
      }
    };

    renderText();

    return new Promise((resolve) => {
      const keyHandler = (str, key) => {
        if (key.ctrl && key.name === "x") {
          process.stdin.setRawMode(false);
          process.stdin.removeListener("keypress", keyHandler);
          this.documentManager.document.setContent(text);
          console.log("\nРедактирование завершено");
          resolve();
        } else if (key.name === "backspace" && cursorPos > 0) {
          text = text.slice(0, cursorPos - 1) + text.slice(cursorPos);
          cursorPos--;
          renderText();
        } else if (key.name === "return") {
          text = text.slice(0, cursorPos) + "\n" + text.slice(cursorPos);
          cursorPos++;
          renderText();
        } else if (key.name === "left" && cursorPos > 0) {
          cursorPos--;
          renderText();
        } else if (key.name === "right" && cursorPos < text.length) {
          cursorPos++;
          renderText();
        } else if (!key.ctrl && !key.meta && str) {
          text = text.slice(0, cursorPos) + str + text.slice(cursorPos);
          cursorPos++;
          renderText();
        }
      };

      process.stdin.on("keypress", keyHandler);
    });
  }
}

module.exports = TextEditorUI;
