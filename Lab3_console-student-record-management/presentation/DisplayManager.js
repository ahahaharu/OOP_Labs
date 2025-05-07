class DisplayManager {
  displayMessage(message) {
    console.log(message);
  }

  displayError(message) {
    console.log(`\x1b[31mError: ${message}\x1b[0m`);
  }

  displayStudent(student) {
    console.log(`\nID: ${student.id}`);
    console.log(`Name: ${student.name}`);
    console.log(`Grade: ${student.grade}`);
    console.log("--------------------------");
  }

  displayQuote(quote) {
    console.log(`\n"${quote.content}"`);
    console.log(`- ${quote.author}`);
    console.log("--------------------------");
  }

  displayMenu(commands) {
    console.log("\n=== Student Record Management System ===\n");
    console.log("Available commands:");

    commands.forEach((command, index) => {
      console.log(`${index + 1}. ${command.description}`);
    });

    console.log("\nEnter a command number or name:");
  }
}

module.exports = DisplayManager;
