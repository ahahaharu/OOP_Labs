const fs = require("fs");
const path = require("path");
const Student = require("../../domain/models/Student");

class StudentRepository {
  constructor() {
    this.filePath = path.join(__dirname, "../../data/students.json");
    this.ensureFileExists();
  }

  ensureFileExists() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  getAllStudents() {
    const data = fs.readFileSync(this.filePath, "utf8");
    const students = JSON.parse(data);
    return students.map((s) => new Student(s.id, s.name, s.grade));
  }

  getStudentById(id) {
    const students = this.getAllStudents();
    const student = students.find((s) => s.id === id);
    return student || null;
  }

  addStudent(student) {
    const students = this.getAllStudents();
    student.id = this.generateId(students);
    students.push(student);
    fs.writeFileSync(this.filePath, JSON.stringify(students, null, 2));
    return student;
  }

  updateStudent(id, updatedStudent) {
    const students = this.getAllStudents();
    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
      return null;
    }

    updatedStudent.id = id;
    students[index] = updatedStudent;
    fs.writeFileSync(this.filePath, JSON.stringify(students, null, 2));
    return updatedStudent;
  }

  generateId(students) {
    if (students.length === 0) {
      return 1;
    }
    const maxId = Math.max(...students.map((s) => s.id));
    return maxId + 1;
  }
}

module.exports = StudentRepository;
