import { Role } from "./Role";

class EditorRole extends Role {
  canEdit() {
    return true;
  }
  canView() {
    return true;
  }
}

module.exports = { EditorRole };
