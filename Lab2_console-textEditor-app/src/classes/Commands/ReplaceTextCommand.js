const Command = require("./Command");

class ReplaceTextCommand extends Command {
  constructor(document, newContent) {
    super();
    this.document = document;
    this.newContent = newContent;
    this.previousContent = this.document.getContent();
  }

  execute() {
    this.document.setContent(this.newContent);
  }

  undo() {
    this.document.setContent(this.previousContent);
  }
}

module.exports = ReplaceTextCommand;
