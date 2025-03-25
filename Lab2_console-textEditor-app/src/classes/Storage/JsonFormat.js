const StorageFormat = require("./StorageFormat");
const fs = require("fs");

class JsonFormat extends StorageFormat {
  save(document, path) {
    const data =
      document.type === "RichText"
        ? { type: document.type, content: document.content }
        : { type: document.type, content: document.content };
    fs.writeFileSync(`${path}.json`, JSON.stringify(data, null, 2));
    console.log(`Документ сохранён как JSON: ${path}.json`);
  }
}

module.exports = JsonFormat;
