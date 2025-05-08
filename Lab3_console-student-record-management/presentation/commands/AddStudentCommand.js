const Command = require("./Command");
const StudentDTO = require("../../dto/StudentDTO");
const readline = require("readline-sync");

class AddStudentCommand extends Command {
  constructor(studentService, displayManager) {
    super("add", "Add a new student");
    this.studentService = studentService;
    this.displayManager = displayManager;
  }

  async execute() {
    this.displayManager.displayMessage("\n=== Add a New Student ===\n");

    const name = readline.question("Enter student name: ");
    const gradeInput = readline.question("Enter student grade (0-10): ");
    const grade = parseFloat(gradeInput);

    try {
      const studentDTO = new StudentDTO(name, grade);
      const result = await this.studentService.addStudent(studentDTO);

      this.displayManager.displayMessage("\nStudent added successfully!");
      this.displayManager.displayStudent(result.student);

      this.displayManager.displayMessage("\nMotivational Quote:");
      this.displayManager.displayQuote(result.quote);
    } catch (error) {
      this.displayManager.displayError(
        `Failed to add student: ${error.message}`
      );
    }
  }
}

module.exports = AddStudentCommand;
