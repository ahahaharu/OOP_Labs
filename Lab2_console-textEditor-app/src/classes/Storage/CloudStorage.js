const { createClient } = require("@supabase/supabase-js");

// Конфигурация Supabase
const supabaseUrl = "https://dzgscjhkyhdammdiajaf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6Z3NjamhreWhkYW1tZGlhamFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMTc5NzAsImV4cCI6MjA1ODU5Mzk3MH0.2qfBFylVFD17n37M7Juvd0ytzZp7MnEWd-SQeQkdKDA";
const supabase = createClient(supabaseUrl, supabaseKey);

class CloudStorage {
  constructor(bucketName = "documents") {
    this.bucketName = bucketName;
  }

  async save(document, path, format = "TXT") {
    console.log("Попытка сохранить документ в Supabase...");
    console.log("Путь:", path, "Формат:", format);

    let content;
    let extension;
    if (format === "JSON") {
      content = JSON.stringify({
        type: document.type,
        content: document.content,
      });
      extension = "json";
    } else if (format === "XML") {
      content = `<document type="${
        document.type
      }">${document.getContent()}</document>`;
      extension = "xml";
    } else {
      content = document.getContent();
      extension = "txt";
    }
    const fileName = `${path}/${Date.now()}.${extension}`;
    console.log("Имя файла:", fileName);
    console.log("Содержимое:", content);

    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(fileName, content, {
        contentType:
          format === "JSON"
            ? "application/json"
            : format === "XML"
            ? "application/xml"
            : "text/plain",
      });

    if (error) {
      console.error("Ошибка Supabase:", error.message);
      throw new Error(`Ошибка сохранения: ${error.message}`);
    }
    console.log(`Документ сохранён в облако: ${fileName}`);
    return data.path;
  }

  async load(path) {
    console.log("Загрузка файла из Supabase:", path);
    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .download(path);
    if (error) {
      console.error("Ошибка загрузки:", error.message);
      throw new Error(`Ошибка загрузки: ${error.message}`);
    }
    const content = await data.text();
    console.log("Содержимое загружено:", content);
    return content;
  }

  async delete(path) {
    console.log("Удаление файла из Supabase:", path);
    const { error } = await supabase.storage
      .from(this.bucketName)
      .remove([path]);
    if (error) {
      console.error("Ошибка удаления:", error.message);
      throw new Error(`Ошибка удаления: ${error.message}`);
    }
    console.log(`Документ удалён из облака: ${path}`);
  }
}

module.exports = CloudStorage;
