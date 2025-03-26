const TextEditor = require("../src/classes/Commands/TextEditor");
const Document = require("../src/classes/Document/Document");

describe("TextEditor", () => {
  let editor, doc;

  beforeEach(() => {
    doc = new Document("PlainText", "Hello World");
    editor = new TextEditor(doc);
  });

  test("should insert text at position", () => {
    editor.insertText(5, ",");
    expect(doc.getContent()).toBe("Hello, World");
  });

  test("should delete text from position", () => {
    editor.deleteText(5, 1);
    expect(doc.getContent()).toBe("HelloWorld");
  });

  test("should cut text and return it", () => {
    const cutText = editor.cutText(0, 5);
    expect(cutText).toBe("Hello");
    expect(doc.getContent()).toBe(" World");
  });

  test("should copy text without modifying document", () => {
    const copiedText = editor.copyText(0, 5);
    expect(copiedText).toBe("Hello");
    expect(doc.getContent()).toBe("Hello World");
  });

  test("should paste text at position", () => {
    editor.pasteText(5, ",");
    expect(doc.getContent()).toBe("Hello, World");
  });

  test("should search text and return position", () => {
    const position = editor.searchText("World");
    expect(position).toBe(6);
    expect(editor.searchText("NotFound")).toBeNull();
  });
});
