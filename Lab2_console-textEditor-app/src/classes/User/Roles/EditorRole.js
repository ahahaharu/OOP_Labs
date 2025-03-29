const Role = require("./Role");

class EditorRole extends Role {
  canEdit() {
    return true;
  }
  canView() {
    return true;
  }
}

module.exports = EditorRole;
