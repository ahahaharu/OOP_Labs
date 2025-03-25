import { Command } from "./Command";

class InsertTextCommand extends Command {
  constructor(editor, position, text) {
    super();
    this.editor = editor;
    this.position = position;
    this.text = text;
  }
  execute() {
    this.editor.insertText(this.position, this.text);
  }
  undo() {
    this.editor.deleteText(this.position, this.text.length);
  }
}

module.exports = { InsertTextCommand };
