const Command = require("./Command");

class CutCommand extends Command {
  constructor(editor, position, length) {
    super();
    this.editor = editor;
    this.position = position;
    this.length = length;
    this.cutText = null;
  }

  execute() {
    this.cutText = this.editor.cutText(this.position, this.length);
  }

  undo() {
    this.editor.pasteText(this.position, this.cutText);
  }
}

module.exports = CutCommand;
