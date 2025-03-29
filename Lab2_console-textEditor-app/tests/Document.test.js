const Document = require("../src/classes/Document/Document");

describe("Document", () => {
  test("should create a PlainText document and set content", () => {
    const doc = new Document("PlainText", "Hello");
    expect(doc.getType()).toBe("PlainText");
    expect(doc.getContent()).toBe("Hello");

    doc.setContent("World");
    expect(doc.getContent()).toBe("World");
    expect(doc.getHistory().length).toBe(2);
  });

  test("should create a RichText document and apply formatting", () => {
    const doc = new Document("RichText", "Test");
    doc.applyFormatting(0, 4, "bold", true);
    expect(doc.getContent()).toBe("Test");
    expect(doc.content[0]).toEqual({
      text: "Test",
      bold: true,
      italic: false,
      underline: false,
      color: null,
    });
  });

  test("should create a Markdown document and apply color", () => {
    const doc = new Document("Markdown", "Hello");
    doc.applyColor(0, 5, "red");
    expect(doc.getContent()).toBe("[red]Hello[/red]");
  });

  test("should notify observers on content change", () => {
    const doc = new Document("PlainText", "Initial");
    const observer = { update: jest.fn() };
    doc.addObserver(observer);
    doc.setContent("Changed");
    expect(observer.update).toHaveBeenCalledWith(
      'Содержимое изменено на: "Changed"'
    );
  });
});
