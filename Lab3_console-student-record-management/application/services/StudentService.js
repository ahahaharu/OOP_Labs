const StudentFactory = require("../factories/StudentFactory");

class StudentService {
  constructor(studentRepository, quoteService) {
    this.studentRepository = studentRepository;
    this.quoteService = quoteService;
    this.studentFactory = new StudentFactory();
  }

  getAllStudents() {
    return this.studentRepository.getAllStudents();
  }

  getStudentById(id) {
    return this.studentRepository.getStudentById(id);
  }

  async addStudent(studentDTO) {
    const student = this.studentFactory.createStudent(studentDTO);

    try {
      student.validate();
      const savedStudent = this.studentRepository.addStudent(student);

      const quote = await this.quoteService.getRandomQuote();

      return {
        student: savedStudent,
        quote: quote,
      };
    } catch (error) {
      throw error;
    }
  }

  updateStudent(id, studentDTO) {
    const student = this.studentFactory.createStudent(studentDTO);
    student.validate();
    return this.studentRepository.updateStudent(id, student);
  }
}

module.exports = StudentService;
