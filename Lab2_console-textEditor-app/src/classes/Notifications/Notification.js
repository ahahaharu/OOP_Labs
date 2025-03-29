class Notification {
  constructor(message, timestamp = Date.now()) {
    this.message = message;
    this.timestamp = timestamp;
  }

  toString() {
    return `[${new Date(this.timestamp).toLocaleString()}] ${this.message}`;
  }
}

module.exports = Notification;
