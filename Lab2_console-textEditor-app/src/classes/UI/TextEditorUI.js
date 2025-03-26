const readline = require("readline");
const InsertTextCommand = require("../Commands/InsertTextCommand");
const ReplaceTextCommand = require("../Commands/ReplaceTextCommand");

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

    let text = this.documentManager.document.getContent(); // Исходный текст
    let cursorPos = text.length;

    process.stdin.setRawMode(true);
    readline.emitKeypressEvents(process.stdin);

    const renderText = () => {
      process.stdout.write("\x1b[2J\x1b[0;0H");
      process.stdout.write(
        text.slice(0, cursorPos) + "|" + text.slice(cursorPos)
      );
    };

    renderText();

    return new Promise((resolve) => {
      const keyHandler = (str, key) => {
        if (key.ctrl && key.name === "x") {
          process.stdin.setRawMode(false);
          process.stdin.removeListener("keypress", keyHandler);
          // Создаём команду для замены текста только при завершении
          const command = new ReplaceTextCommand(
            this.documentManager.document,
            text
          );
          this.documentManager.undoRedo.executeCommand(command);
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
