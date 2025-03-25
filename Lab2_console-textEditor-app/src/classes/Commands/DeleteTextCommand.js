import { Command } from "./Command";

class DeleteTextCommand extends Command {
  constructor(editor, position, length) {
    super();
    this.editor = editor;
    this.position = position;
    this.length = length;
    this.deletedText = this.editor.document
      .getContent()
      .slice(this.position, this.position + this.length);
  }
  execute() {
    this.editor.deleteText(this.position, this.length);
  }
  undo() {
    this.editor.insertText(this.position, this.deletedText);
  }
}

module.exports = { DeleteTextCommand };
