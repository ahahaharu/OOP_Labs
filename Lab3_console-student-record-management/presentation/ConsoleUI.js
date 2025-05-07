const readline = require("readline-sync");
const DisplayManager = require("./DisplayManager");
const AddStudentCommand = require("./commands/AddStudentCommand");
const ViewStudentsCommand = require("./commands/ViewStudentsCommand");
const EditStudentCommand = require("./commands/EditStudentCommand");
const ExitCommand = require("./commands/ExitCommand");

class ConsoleUI {
  constructor(studentService) {
    this.studentService = studentService;
    this.displayManager = new DisplayManager();
    this.commands = [];
    this.initializeCommands();
  }

  initializeCommands() {
    this.commands = [
      new AddStudentCommand(this.studentService, this.displayManager),
      new ViewStudentsCommand(this.studentService, this.displayManager),
      new EditStudentCommand(this.studentService, this.displayManager),
      new ExitCommand(),
    ];
  }

  async start() {
    this.displayManager.displayMessage(
      "Welcome to the Student Record Management System!"
    );

    while (true) {
      this.displayManager.displayMenu(this.commands);
      const input = readline.question("> ").trim().toLowerCase();

      const numInput = parseInt(input);
      let command;

      if (
        !isNaN(numInput) &&
        numInput > 0 &&
        numInput <= this.commands.length
      ) {
        command = this.commands[numInput - 1];
      } else {
        command = this.commands.find((cmd) => cmd.name === input);
      }

      if (command) {
        await command.execute();
      } else {
        this.displayManager.displayError("Invalid command. Please try again.");
      }
    }
  }
}

module.exports = ConsoleUI;
