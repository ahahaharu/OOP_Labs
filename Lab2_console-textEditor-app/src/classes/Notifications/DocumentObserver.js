const Notification = require("./Notification");

class DocumentObserver {
  constructor(notificationStore) {
    this.notificationStore = notificationStore;
  }

  update(message) {
    const notification = new Notification(`Документ: ${message}`);
    this.notificationStore.push(notification);
  }
}

module.exports = DocumentObserver;
