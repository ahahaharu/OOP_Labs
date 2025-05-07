const Command = require("./Command");
const StudentDTO = require("../../dto/StudentDTO");
const readline = require("readline-sync");

class EditStudentCommand extends Command {
  constructor(studentService, displayManager) {
    super("edit", "Edit a student");
    this.studentService = studentService;
    this.displayManager = displayManager;
  }

  execute() {
    this.displayManager.displayMessage("\n=== Edit a Student ===\n");

    const idInput = readline.question("Enter student ID: ");
    const id = parseInt(idInput);

    if (isNaN(id)) {
      this.displayManager.displayError("Invalid ID. Please enter a number.");
      return;
    }

    const student = this.studentService.getStudentById(id);

    if (!student) {
      this.displayManager.displayError(`Student with ID ${id} not found.`);
      return;
    }

    this.displayManager.displayMessage("\nCurrent student details:");
    this.displayManager.displayStudent(student);

    this.displayManager.displayMessage(
      "\nEnter new details (leave blank to keep current value):"
    );

    const nameInput = readline.question(`Enter new name (${student.name}): `);
    const gradeInput = readline.question(
      `Enter new grade (${student.grade}): `
    );

    const name = nameInput.trim() !== "" ? nameInput : student.name;
    const grade =
      gradeInput.trim() !== "" ? parseFloat(gradeInput) : student.grade;

    try {
      const studentDTO = new StudentDTO(name, grade);
      const updatedStudent = this.studentService.updateStudent(id, studentDTO);

      this.displayManager.displayMessage("\nStudent updated successfully!");
      this.displayManager.displayStudent(updatedStudent);
    } catch (error) {
      this.displayManager.displayError(
        `Failed to update student: ${error.message}`
      );
    }
  }
}

module.exports = EditStudentCommand;
