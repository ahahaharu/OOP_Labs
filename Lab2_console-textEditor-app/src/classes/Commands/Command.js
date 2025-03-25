class Command {
  execute() {
    throw new Error("Метод execute не реализован");
  }
  undo() {
    throw new Error("Метод undo не реализован");
  }
}

module.exports = { Command };
