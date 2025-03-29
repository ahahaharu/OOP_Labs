const StorageFormat = require("./StorageFormat");
const fs = require("fs");

class XmlFormat extends StorageFormat {
  save(document, path) {
    let xmlContent = `<document type="${document.type}">`;
    if (document.type === "RichText") {
      xmlContent += document.content
        .map(
          (segment) =>
            `<segment bold="${segment.bold}" italic="${
              segment.italic
            }" underline="${segment.underline}" color="${
              segment.color || ""
            }">${segment.text}</segment>`
        )
        .join("");
    } else {
      xmlContent += `<content>${document.content}</content>`;
    }
    xmlContent += `</document>`;
    fs.writeFileSync(`${path}.xml`, xmlContent);
    console.log(`Документ сохранён как XML: ${path}.xml`);
  }
}

module.exports = XmlFormat;
