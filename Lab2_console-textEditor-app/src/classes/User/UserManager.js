const fs = require("fs");
const User = require("./User");
const ViewerRole = require("./Roles/ViewerRole");
const EditorRole = require("./Roles/EditorRole");
const AdminRole = require("./Roles/AdminRole");
const RoleChangeObserver = require("../Notifications/RoleChangeObserver");

class UserManager {
  constructor(filePath = "users.json") {
    this.filePath = filePath;
    this.users = this.loadUsers();
    this.notifications = []; // Хранилище уведомлений
    this.users.forEach((user) =>
      user.addObserver(new RoleChangeObserver(this.notifications))
    );
  }

  loadUsers() {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, "utf-8");
      const usersData = JSON.parse(data);
      return usersData.map((userData) => {
        let role;
        switch (userData.role) {
          case "ViewerRole":
            role = new ViewerRole();
            break;
          case "EditorRole":
            role = new EditorRole();
            break;
          case "AdminRole":
            role = new AdminRole();
            break;
          default:
            throw new Error("Неверная роль в JSON");
        }
        const user = new User(userData.name, role);
        return user;
      });
    }
    return [];
  }

  saveUsers() {
    const usersData = this.users.map((user) => ({
      name: user.name,
      role: user.getRole().constructor.name,
    }));
    fs.writeFileSync(this.filePath, JSON.stringify(usersData, null, 2));
  }

  getUser(name) {
    return this.users.find((u) => u.name === name);
  }

  addUser(user) {
    user.addObserver(new RoleChangeObserver(this.notifications));
    this.users.push(user);
    this.saveUsers();
  }

  getNotifications() {
    return this.notifications;
  }
}

module.exports = UserManager;
