const UndoRedoManager = require("../src/classes/Utils/UndoRedoManager");
const InsertTextCommand = require("../src/classes/Commands/InsertTextCommand");
const TextEditor = require("../src/classes/Commands/TextEditor");
const Document = require("../src/classes/Document/Document");

describe("UndoRedoManager", () => {
  let manager, editor, doc;

  beforeEach(() => {
    manager = new UndoRedoManager();
    doc = new Document("PlainText", "");
    editor = new TextEditor(doc);
  });

  test("should execute command and undo it", () => {
    const command = new InsertTextCommand(editor, 0, "Test");
    manager.executeCommand(command);
    expect(doc.getContent()).toBe("Test");
    manager.undo();
    expect(doc.getContent()).toBe("");
  });

  test("should redo an undone command", () => {
    const command = new InsertTextCommand(editor, 0, "Test");
    manager.executeCommand(command);
    manager.undo();
    manager.redo();
    expect(doc.getContent()).toBe("Test");
  });

  test("should clear redo stack after new command", () => {
    const command1 = new InsertTextCommand(editor, 0, "First");
    const command2 = new InsertTextCommand(editor, 5, "Second");
    manager.executeCommand(command1);
    manager.undo();
    manager.executeCommand(command2);
    manager.redo(); // Redo should not work
    expect(doc.getContent()).toBe("Second");
  });
});
