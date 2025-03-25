class TextEditor {
  constructor(document) {
    this.document = document;
  }

  insertText(position, text) {
    const current = this.document.getContent();
    this.document.setContent(
      current.slice(0, position) + text + current.slice(position)
    );
  }

  deleteText(position, length) {
    const current = this.document.getContent();
    this.document.setContent(
      current.slice(0, position) + current.slice(position + length)
    );
  }

  cutText(position, length) {
    const current = this.document.getContent();
    const cut = current.slice(position, position + length);
    this.document.setContent(
      current.slice(0, position) + current.slice(position + length)
    );
    return cut;
  }

  copyText(position, length) {
    return this.document.getContent().slice(position, position + length);
  }

  pasteText(position, text) {
    this.insertText(position, text);
  }

  searchText(query) {
    const content = this.document.getContent();
    const index = content.indexOf(query);
    return index !== -1 ? index : null;
  }
}

module.exports = { TextEditor };
