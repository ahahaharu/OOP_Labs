class Role {
  canEdit() {
    throw new Error("Метод canEdit не реализован");
  }
  canView() {
    throw new Error("Метод canView не реализован");
  }
  canManageUsers() {
    return false;
  }
}

module.exports = Role;
