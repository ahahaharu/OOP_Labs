const Notification = require("./Notification");

class RoleChangeObserver {
  constructor(notificationStore) {
    this.notificationStore = notificationStore;
  }

  update(message) {
    const notification = new Notification(`Роль пользователя: ${message}`);
    this.notificationStore.push(notification);
    console.log(notification.toString());
  }
}

module.exports = RoleChangeObserver;
