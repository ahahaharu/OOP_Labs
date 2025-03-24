import fs from "fs";

class FileStorage extends Storage {
  save(document, path) {
    fs.writeFileSync(path, document.getContent());
    console.log(`Документ сохранён в файл: ${path}`);
  }
  load(path) {
    if (fs.existsSync(path)) {
      return fs.readFileSync(path, "utf-8");
    }
    throw new Error(`Файл ${path} не найден`);
  }
}
