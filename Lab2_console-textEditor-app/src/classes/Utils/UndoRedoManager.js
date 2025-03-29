class UndoRedoManager {
  constructor() {
    this.undoStack = [];
    this.redoStack = [];
  }
  executeCommand(command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
  }
  undo() {
    if (this.undoStack.length > 0) {
      const command = this.undoStack.pop();
      command.undo();
      this.redoStack.push(command);
    } else {
      console.log("Нечего отменять");
    }
  }
  redo() {
    if (this.redoStack.length > 0) {
      const command = this.redoStack.pop();
      command.execute();
      this.undoStack.push(command);
    } else {
      console.log("Нечего повторить");
    }
  }
}

module.exports = UndoRedoManager;
