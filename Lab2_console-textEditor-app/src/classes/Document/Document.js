const DocumentFormatter = require("./DocumentFormatter");

class Document {
  constructor(type, content = "") {
    this.type = type;
    this.content = type === "RichText" ? [] : content;
    this.observers = [];
    this.history = [{ timestamp: Date.now(), content: this.getContent() }];
    if (type === "RichText" && content) {
      this.content = [
        {
          text: content,
          bold: false,
          italic: false,
          underline: false,
          color: null,
        },
      ];
    }
  }

  getType() {
    return this.type;
  }

  getContent() {
    return this.type === "RichText"
      ? this.content.map((segment) => segment.text).join("")
      : this.content;
  }

  setContent(content) {
    if (this.type === "RichText") {
      this.content = [
        {
          text: content,
          bold: false,
          italic: false,
          underline: false,
          color: null,
        },
      ];
    } else {
      this.content = content;
    }
    this.history.push({ timestamp: Date.now(), content: this.getContent() });
  }

  setType(type) {
    if (this.type === type) return;
    if (type === "RichText") {
      this.content = [
        {
          text: this.getContent(),
          bold: false,
          italic: false,
          underline: false,
          color: null,
        },
      ];
    } else {
      this.content = this.getContent(); // Преобразуем RichText обратно в строку
    }
    this.type = type;
    // this.notifyObservers();
  }

  getFormattedContent() {
    if (this.type === "PlainText") return this.content;
    if (this.type === "Markdown")
      return DocumentFormatter.formatMarkdown(this.content);
    if (this.type === "RichText")
      return DocumentFormatter.formatRichText(this.content);
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  getHistory() {
    return this.history;
  }

  applyFormatting(start, length, style, value = true) {
    if (this.type !== "RichText") return;
    const fullText = this.getContent();
    const before = fullText.slice(0, start);
    const formatted = fullText.slice(start, start + length);
    const after = fullText.slice(start + length);

    this.content = [
      ...(before
        ? [
            {
              text: before,
              bold: false,
              italic: false,
              underline: false,
              color: null,
            },
          ]
        : []),
      {
        text: formatted,
        bold: style === "bold" ? value : false,
        italic: style === "italic" ? value : false,
        underline: style === "underline" ? value : false,
        color: style === "color" ? value : null,
      },
      ...(after
        ? [
            {
              text: after,
              bold: false,
              italic: false,
              underline: false,
              color: null,
            },
          ]
        : []),
    ].filter((segment) => segment.text.length > 0);
  }

  applyColor(start, length, color) {
    if (this.type !== "Markdown") return;
    const fullText = this.content;
    const before = fullText.slice(0, start);
    const colored = fullText.slice(start, start + length);
    const after = fullText.slice(start + length);
    this.content = `${before}[${color}]${colored}[/${color}]${after}`;
  }
}

module.exports = Document;
