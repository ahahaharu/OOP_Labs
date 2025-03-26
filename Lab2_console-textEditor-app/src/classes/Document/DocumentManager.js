const TextEditor = require("../Commands/TextEditor");
const UndoRedoManager = require("../Utils/UndoRedoManager");
const Document = require("./Document");
const DocumentFactory = require("./DocumentFactory");
const InsertTextCommand = require("../Commands/InsertTextCommand");

const fs = require("fs");
const TxtFormat = require("../Storage/TxtFormat");
const JsonFormat = require("../Storage/JsonFormat");
const XmlFormat = require("../Storage/XmlFormat");
const xml2js = require("xml2js");

class DocumentManager {
  constructor(storage) {
    this.document = null;
    this.storage = storage;
    this.editor = null;
    this.undoRedo = new UndoRedoManager();
    this.clipboard = "";
    this.formatStrategies = {
      TXT: new TxtFormat(),
      JSON: new JsonFormat(),
      XML: new XmlFormat(),
    };
  }

  createDocument(type) {
    this.document = DocumentFactory.createDocument(type);
    this.editor = new TextEditor(this.document);
    // this.document.addObserver(new DocumentObserver());
    console.log(`Создан документ типа ${type}`);
  }

  openDocument(path) {
    path = "docs/" + path;
    try {
      const ext = path.split(".").pop().toLowerCase();
      let content, type;

      if (ext === "txt") {
        content = this.storage.load(path);
        type = "PlainText";
      } else if (ext === "json") {
        const rawData = fs.readFileSync(path, "utf8");
        const data = JSON.parse(rawData);
        type = data.type;
        content = data.content;
      } else if (ext === "xml") {
        const rawData = fs.readFileSync(path, "utf8");
        xml2js.parseString(rawData, (err, result) => {
          if (err) throw err;
          type = result.document.$.type;
          content = result.document.content[0];
        });
      } else {
        throw new Error("Неподдерживаемый формат файла");
      }

      this.document = new Document(type, content);
      this.editor = new TextEditor(this.document);
      // this.document.addObserver({ update: () => console.log(`Документ обновлён: ${this.document.getFormattedContent()}`) });
      console.log(
        `Открыт документ типа ${type}: ${this.document.getContent()}`
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  saveDocument(path, format) {
    path = "docs/" + path;
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    const strategy = this.formatStrategies[format];
    if (!strategy) {
      console.log("Неподдерживаемый формат");
      return;
    }
    strategy.save(this.document, path);
  }

  changeDocumentType(newType) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    this.document.setType(newType);
    console.log(`Тип документа изменён на ${newType}`);
  }

  deleteDocument(path) {
    path = "docs/" + path;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log(`Документ удалён: ${path}`);
    } else {
      console.log(`Файл ${path} не найден`);
    }
  }

  editDocument(position, text) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    const command = new InsertTextCommand(this.editor, position, text);
    this.undoRedo.executeCommand(command);
  }

  formatDocument(style, start, length, value) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    if (this.document.type === "PlainText") {
      console.log("PlainText не поддерживает форматирование");
      return;
    }
    if (this.document.type === "RichText") {
      this.document.applyFormatting(start, length, style, value);
      console.log(
        `Отформатированный текст: ${this.document.getFormattedContent()}`
      );
    } else if (
      this.document.type === "Markdown" &&
      ["bold", "italic", "underline"].includes(style)
    ) {
      const current = this.document.getContent();
      const formatters = { bold: "**", italic: "*", underline: "__" };
      const formattedText =
        current.slice(0, start) +
        formatters[style] +
        current.slice(start, start + length) +
        formatters[style] +
        current.slice(start + length);
      this.document.setContent(formattedText);
      console.log(
        `Отформатированный текст: ${this.document.getFormattedContent()}`
      );
    } else if (this.document.type === "Markdown" && style === "color") {
      this.document.applyColor(start, length, value);
      console.log(
        `Отформатированный текст: ${this.document.getFormattedContent()}`
      );
    }
  }

  undo() {
    this.undoRedo.undo();
  }

  redo() {
    this.undoRedo.redo();
  }

  viewDocument() {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    console.log(
      `Содержимое документа:\n${this.document.getFormattedContent()}`
    );
  }

  cutCopyPaste(action, position, length, text) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    if (action === "cut") {
      this.clipboard = this.editor.cutText(position, length);
      console.log(`Вырезано: ${this.clipboard}`);
    } else if (action === "copy") {
      this.clipboard = this.editor.copyText(position, length);
      console.log(`Скопировано: ${this.clipboard}`);
    } else if (action === "paste") {
      this.editor.pasteText(position, text);
      console.log("Текст вставлен");
    }
  }

  cutText(start, length) {
    if (!this.document || !this.editor) {
      console.log("Нет открытого документа");
      return;
    }
    this.clipboard = this.editor.cutText(start, length);
    console.log(`Вырезано: "${this.clipboard}"`);
  }

  copyText(start, length) {
    if (!this.document || !this.editor) {
      console.log("Нет открытого документа");
      return;
    }
    this.clipboard = this.editor.copyText(start, length);
    console.log(`Скопировано: "${this.clipboard}"`);
  }

  pasteText(position, text = null) {
    if (!this.document || !this.editor) {
      console.log("Нет открытого документа");
      return;
    }
    const pasteContent = text !== null ? text : this.clipboard;
    if (!pasteContent) {
      console.log("Буфер обмена пуст");
      return;
    }
    this.editor.pasteText(position, pasteContent);
    console.log(`Вставлено: "${pasteContent}"`);
  }

  getClipboard() {
    return this.clipboard;
  }

  searchText(query) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    const position = this.editor.searchText(query);
    if (position !== null) {
      console.log(`Текст найден на позиции: ${position}`);
    } else {
      console.log("Текст не найден");
    }
  }

  viewHistory() {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    const history = this.document.getHistory();
    console.log("История изменений:");
    history.forEach((entry, index) => {
      console.log(
        `${index}: ${new Date(entry.timestamp).toLocaleString()} - ${
          entry.content
        }`
      );
    });
  }
}

module.exports = DocumentManager;
