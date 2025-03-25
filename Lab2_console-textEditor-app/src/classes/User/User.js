class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  getRole() {
    return this.role;
  }
  setRole(role) {
    this.role = role;
    this.notifyObservers();
  }
}

module.exports = User;
