const Command = require("./Command");

class FormatCommand extends Command {
  constructor(document, start, length, style, value) {
    super();
    this.document = document;
    this.start = start;
    this.length = length;
    this.style = style;
    this.value = value;
    this.previousContent = structuredClone(this.document.content);
  }

  execute() {
    this.document.applyFormatting(
      this.start,
      this.length,
      this.style,
      this.value
    );
  }

  undo() {
    this.document.content = structuredClone(this.previousContent);
    // this.document.notifyObservers();
  }
}

module.exports = FormatCommand;
