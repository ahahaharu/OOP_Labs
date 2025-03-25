const TextEditor = require("../Commands/TextEditor");
const UndoRedoManager = require("../Utils/UndoRedoManager");
const Document = require("./Document");
const DocumentFactory = require("./DocumentFactory");
const InsertTextCommand = require("../Commands/InsertTextCommand");
const BoldFormatter = require("../Formatter/BoldFormatter");
const ItalicFormatter = require("../Formatter/ItalicFormatter");
const UnderlineFormatter = require("../Formatter/UnderlineFormatter");
const FormatAdapter = require("../Storage/FormatAdapter");
const fs = require("fs");

class DocumentManager {
  constructor(storage) {
    this.document = null;
    this.storage = storage;
    this.editor = null;
    this.undoRedo = new UndoRedoManager();
  }

  createDocument(type) {
    this.document = DocumentFactory.createDocument(type);

    this.editor = new TextEditor(this.document);
    // this.document.addObserver(new DocumentObserver());
    console.log(`Создан документ типа ${type}`);
  }

  openDocument(path) {
    try {
      path = "docs/" + path;
      const content = this.storage.load(path);
      this.document = new Document("PlainText", content);
      this.editor = new TextEditor(this.document);
      // this.document.addObserver(new DocumentObserver());
      console.log(`Открыт документ: ${content}`);
    } catch (error) {
      console.log(error.message);
    }
  }

  saveDocument(path, format) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    FormatAdapter.saveAsFormat(this.document, path, format.toUpperCase());
  }

  deleteDocument(path) {
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

  formatDocument(style) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    try {
      let formatter;
      switch (style) {
        case "bold":
          formatter = new BoldFormatter(this.document);
          break;
        case "italic":
          formatter = new ItalicFormatter(this.document);
          break;
        case "underline":
          formatter = new UnderlineFormatter(this.document);
          break;
        default:
          throw new Error("Неподдерживаемый стиль");
      }
      const formatted = formatter.format();
      console.log(`Отформатированный текст: ${formatted}`);
      this.document.setContent(formatted);
    } catch (error) {
      console.log(error.message);
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
    console.log(`Содержимое документа: ${this.document.getContent()}`);
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
