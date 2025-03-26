const TextEditor = require("../Commands/TextEditor");
const UndoRedoManager = require("../Utils/UndoRedoManager");
const Document = require("./Document");
const DocumentFactory = require("./DocumentFactory");
const InsertTextCommand = require("../Commands/InsertTextCommand");
const DocumentObserver = require("../Notifications/DocumentObserver");
const CloudStorage = require("../Storage/CloudStorage");

const fs = require("fs");
const TxtFormat = require("../Storage/TxtFormat");
const JsonFormat = require("../Storage/JsonFormat");
const XmlFormat = require("../Storage/XmlFormat");
const xml2js = require("xml2js");
const CutCommand = require("../Commands/CutCommand");
const PasteCommand = require("../Commands/PasteCommand");
const FormatCommand = require("../Commands/FormatCommand");
const MarkdownFormatCommand = require("../Commands/MarkdownFormatCommand");

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
    this.notifications = [];
  }

  setStorage(storage) {
    this.storage = storage;
  }

  createDocument(type) {
    this.document = DocumentFactory.createDocument(type);
    this.editor = new TextEditor(this.document);
    this.document.addObserver(new DocumentObserver(this.notifications));
    console.log(`Создан документ типа ${type}`);
  }

  async openDocument(path) {
    path = "docs/" + path;
    try {
      const ext = path.split(".").pop().toLowerCase();
      let content, type;

      if (this.storage instanceof CloudStorage) {
        const rawData = await this.storage.load(path);
        if (ext === "txt") {
          content = rawData;
          type = "PlainText";
        } else if (ext === "json") {
          const data = JSON.parse(rawData);
          type = data.type;
          content = data.content;
        } else if (ext === "xml") {
          const result = await new Promise((resolve, reject) =>
            xml2js.parseString(rawData, (err, res) =>
              err ? reject(err) : resolve(res)
            )
          );
          type = result.document.$.type;
          content = result.document.content[0];
        } else {
          throw new Error("Неподдерживаемый формат файла в облаке");
        }
      } else {
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
          const result = await new Promise((resolve, reject) =>
            xml2js.parseString(rawData, (err, res) =>
              err ? reject(err) : resolve(res)
            )
          );
          type = result.document.$.type;
          content = result.document.content[0];
        } else {
          throw new Error("Неподдерживаемый формат файла");
        }
      }

      this.document = new Document(type, content);
      this.editor = new TextEditor(this.document);
      this.document.addObserver(new DocumentObserver(this.notifications));
      console.log(
        `Открыт документ типа ${type}: ${this.document.getContent()}`
      );
    } catch (error) {
      console.log(`Ошибка открытия документа: ${error.message}`);
    }
  }

  async saveDocument(path, format) {
    path = "docs/" + path;
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    if (this.storage instanceof CloudStorage) {
      try {
        await this.storage.save(this.document, path, format);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const strategy = this.formatStrategies[format];
      if (!strategy) {
        console.log("Неподдерживаемый формат");
        return;
      }
      strategy.save(this.document, path);
    }
  }

  async deleteDocument(path) {
    if (this.storage instanceof CloudStorage) {
      try {
        await this.storage.delete(path);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      path = "docs/" + path;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log(`Документ удалён: ${path}`);
      } else {
        console.log(`Файл ${path} не найден`);
      }
    }
  }

  changeDocumentType(newType) {
    if (!this.document) {
      console.log("Нет открытого документа");
      return;
    }
    this.document.setType(newType);
    console.log(`Тип документа изменён на ${newType}`);
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
    let command;
    if (this.document.type === "RichText") {
      command = new FormatCommand(this.document, start, length, style, value);
    } else if (this.document.type === "Markdown") {
      command = new MarkdownFormatCommand(
        this.document,
        start,
        length,
        style,
        value
      );
    }
    this.undoRedo.executeCommand(command);
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

  cutText(start, length) {
    if (!this.document || !this.editor) {
      console.log("Нет открытого документа");
      return;
    }
    const command = new CutCommand(this.editor, start, length);
    this.undoRedo.executeCommand(command);
    this.clipboard = command.cutText;
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
    const command = new PasteCommand(this.editor, position, pasteContent);
    this.undoRedo.executeCommand(command);
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

  getNotifications() {
    return this.notifications;
  }
}

module.exports = DocumentManager;
