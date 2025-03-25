class Formatter {
  constructor(document) {
    this.document = document;
  }
  format() {
    throw new Error("Метод format не реализован");
  }
}

module.exports = Formatter;
