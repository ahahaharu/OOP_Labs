const Command = require("./Command");

class ViewStudentsCommand extends Command {
  constructor(studentService, displayManager) {
    super("view", "View all students");
    this.studentService = studentService;
    this.displayManager = displayManager;
  }

  execute() {
    const students = this.studentService.getAllStudents();

    if (students.length === 0) {
      this.displayManager.displayMessage(
        "\nNo students found in the system.\n"
      );
      return;
    }

    this.displayManager.displayMessage("\n=== All Students ===\n");
    students.forEach((student) => {
      this.displayManager.displayStudent(student);
    });
  }
}

module.exports = ViewStudentsCommand;
