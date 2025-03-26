const Command = require("./Command");

class MarkdownFormatCommand extends Command {
  constructor(document, start, length, style, value) {
    super();
    this.document = document;
    this.start = start;
    this.length = length;
    this.style = style;
    this.value = value;
    this.previousContent = this.document.getContent();
  }

  execute() {
    if (this.style === "color") {
      this.document.applyColor(this.start, this.length, this.value);
    } else {
      const current = this.document.getContent();
      const formatters = { bold: "**", italic: "*", underline: "__" };
      const formattedText =
        current.slice(0, this.start) +
        formatters[this.style] +
        current.slice(this.start, this.start + this.length) +
        formatters[this.style] +
        current.slice(this.start + this.length);
      this.document.setContent(formattedText);
    }
  }

  undo() {
    this.document.setContent(this.previousContent);
  }
}

module.exports = MarkdownFormatCommand;
