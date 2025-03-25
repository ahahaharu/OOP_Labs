const Formatter = require("./Formatter");

class UnderlineFormatter extends Formatter {
  format() {
    return `\x1b[4m${this.document.getContent()}\x1b[0m`;
  }
}

module.exports = UnderlineFormatter;
