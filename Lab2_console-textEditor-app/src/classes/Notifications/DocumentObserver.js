const Notification = require("./Notification");

class DocumentObserver {
  constructor(notificationStore) {
    this.notificationStore = notificationStore; // Хранилище уведомлений
  }

  update(message) {
    const notification = new Notification(`Документ: ${message}`);
    this.notificationStore.push(notification);
    console.log(notification.toString()); // Вывод в консоль для отладки
  }
}

module.exports = DocumentObserver;
