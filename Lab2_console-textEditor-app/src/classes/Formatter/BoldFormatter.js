import { Formatter } from "./Formatter";

class BoldFormatter extends Formatter {
  format() {
    return `\x1b[1m${this.document.getContent()}\x1b[0m`;
  }
}

module.exports = { BoldFormatter };
