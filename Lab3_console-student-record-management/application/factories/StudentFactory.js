const Student = require("../../domain/models/Student");

class StudentFactory {
  createStudent(studentDTO) {
    return new Student(null, studentDTO.name, studentDTO.grade);
  }
}

module.exports = StudentFactory;
