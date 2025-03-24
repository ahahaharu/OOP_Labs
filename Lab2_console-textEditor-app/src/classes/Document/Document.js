class Document {
  constructor(type, content = "") {
    this.type = type;
    this.content = content;
    this.observers = [];
    this.history = [{ timestamp: Date.now(), content: "" }];
  }

  getType() {
    return this.type;
  }

  getContent() {
    return this.content;
  }

  setContent(content) {
    this.content = content;
    this.history.push({ timestamp: Date.now(), content });
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  getHistory() {
    return this.history;
  }
}

module.exports = { Document };
