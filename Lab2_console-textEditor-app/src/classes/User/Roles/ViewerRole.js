const Role = require("./Role");

class ViewerRole extends Role {
  canEdit() {
    return false;
  }
  canView() {
    return true;
  }
}

module.exports = ViewerRole;
