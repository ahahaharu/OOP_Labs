const Command = require("./Command");

class ExitCommand extends Command {
  constructor() {
    super("exit", "Exit the application");
  }

  execute() {
    console.log(
      "\nThank you for using the Student Record Management System. Goodbye!"
    );
    process.exit(0);
  }
}

module.exports = ExitCommand;
