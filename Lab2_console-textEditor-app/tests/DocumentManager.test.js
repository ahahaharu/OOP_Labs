const DocumentManager = require("../src/classes/Document/DocumentManager");
const DocumentFactory = require("../src/classes/Document/DocumentFactory");
const FileStorage = require("../src/classes/Storage/FileStorage");
const fs = require("fs");

jest.mock("fs");

describe("DocumentManager", () => {
  let manager;

  beforeEach(() => {
    manager = new DocumentManager(new FileStorage());
    fs.writeFileSync.mockClear();
    fs.readFileSync.mockClear();
  });

  test("should create a new document", () => {
    manager.createDocument("PlainText");
    expect(manager.document.getType()).toBe("PlainText");
    expect(manager.document.getContent()).toBe("");
  });

  test("should save a document to local storage", () => {
    manager.createDocument("PlainText");
    manager.document.setContent("Test Content");
    fs.writeFileSync.mockImplementation(() => {});
    manager.saveDocument("test", "TXT");
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "docs/test.txt",
      "Test Content"
    );
  });

  test("should edit document content", () => {
    manager.createDocument("PlainText");
    manager.editDocument(0, "Inserted");
    expect(manager.document.getContent()).toBe("Inserted");
    manager.undo();
    expect(manager.document.getContent()).toBe("");
  });
});
