const Command = require("./Command");

class PasteCommand extends Command {
  constructor(editor, position, text) {
    super();
    this.editor = editor;
    this.position = position;
    this.text = text;
    this.previousContent = this.editor.document.getContent();
  }

  execute() {
    this.editor.pasteText(this.position, this.text);
  }

  undo() {
    this.editor.document.setContent(this.previousContent);
  }
}

module.exports = PasteCommand;
