class FormatAdapter {
  static saveAsFormat(document, path, format) {
    let content = document.getContent();
    if (format === "JSON") {
      content = JSON.stringify({ content });
      fs.writeFileSync(`${path}.json`, content);
    } else if (format === "XML") {
      content = `<document>${content}</document>`;
      fs.writeFileSync(`${path}.xml`, content);
    } else {
      fs.writeFileSync(`${path}.txt`, content);
    }
    console.log(`Документ сохранён как ${format}: ${path}`);
  }
}
