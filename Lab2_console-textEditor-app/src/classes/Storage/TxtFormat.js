const StorageFormat = require("./StorageFormat");
const fs = require("fs");

class TxtFormat extends StorageFormat {
  save(document, path) {
    const content =
      document.type === "RichText" ? document.getContent() : document.content;
    fs.writeFileSync(`${path}.txt`, content);
    console.log(`Документ сохранён как TXT: ${path}.txt`);
  }
}

module.exports = TxtFormat;
