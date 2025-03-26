class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.observers = [];
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    const oldRole = this.role.constructor.name;
    this.role = role;
    this.notifyObservers(
      `Роль изменена с ${oldRole} на ${role.constructor.name} для ${this.name}`
    );
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(message) {
    this.observers.forEach((observer) => observer.update(message));
  }
}

module.exports = User;
