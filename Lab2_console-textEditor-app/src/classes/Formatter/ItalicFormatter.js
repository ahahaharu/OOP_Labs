import { Formatter } from "./Formatter";

class ItalicFormatter extends Formatter {
  format() {
    return `\x1b[3m${this.document.getContent()}\x1b[0m`;
  }
}

module.exports = { ItalicFormatter };
