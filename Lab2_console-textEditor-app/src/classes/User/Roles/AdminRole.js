const Role = require("./Role");

class AdminRole extends Role {
  canEdit() {
    return true;
  }
  canView() {
    return true;
  }
  canManageUsers() {
    return true;
  }
}

module.exports = AdminRole;
