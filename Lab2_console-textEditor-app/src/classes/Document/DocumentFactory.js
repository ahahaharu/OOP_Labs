class DocumentFactory {
  static createDocument(type) {
    switch (type) {
      case "PlainText":
        return new Document("PlainText");
      case "Markdown":
        return new Document("Markdown");
      case "RichText":
        return new Document("RichText");
      default:
        throw new Error("Неподдерживаемый тип документа");
    }
  }
}
