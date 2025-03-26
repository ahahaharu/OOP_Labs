const UserManager = require("../src/classes/User/UserManager");
const User = require("../src/classes/User/User");
const ViewerRole = require("../src/classes/User/Roles/ViewerRole");
const fs = require("fs");

jest.mock("fs");

describe("UserManager", () => {
  let manager;

  beforeEach(() => {
    fs.readFileSync.mockReturnValue("[]");
    fs.writeFileSync.mockImplementation(() => {});
    manager = new UserManager();
  });

  test("should add a new user", () => {
    const user = new User("testUser", new ViewerRole());
    manager.addUser(user);
    expect(manager.getUser("testUser")).toBe(user);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test("should return null for non-existent user", () => {
    expect(manager.getUser("nonExistent")).toBeUndefined();
  });
});
