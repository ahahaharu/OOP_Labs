const StudentService = require("../application/services/StudentService");
const QuoteService = require("../application/services/QuoteService");
const StudentDTO = require("../dto/StudentDTO");
const Student = require("../domain/models/Student");
const Quote = require("../domain/models/Quote");
const StudentRepository = require("../infrastructure/repositories/StudentRepository");

jest.mock("../infrastructure/repositories/StudentRepository");
jest.mock("../application/services/QuoteService");

describe("StudentService", () => {
  let studentService;
  let mockStudentRepository;
  let mockQuoteService;

  beforeEach(() => {
    jest.clearAllMocks();

    mockStudentRepository = new StudentRepository();
    mockQuoteService = new QuoteService();

    studentService = new StudentService(
      mockStudentRepository,
      mockQuoteService
    );
  });

  describe("addStudent", () => {
    it("should add a valid student and return a quote", async () => {
      const studentDTO = new StudentDTO("Test Student", 8);
      const savedStudent = new Student(1, "Test Student", 8);
      const mockQuote = new Quote("Test quote content", "Test Author");

      mockStudentRepository.addStudent.mockReturnValue(savedStudent);
      mockQuoteService.getRandomQuote.mockResolvedValue(mockQuote);

      // Act
      const result = await studentService.addStudent(studentDTO);

      expect(result.student).toBe(savedStudent);
      expect(result.quote).toBe(mockQuote);
      expect(mockStudentRepository.addStudent).toHaveBeenCalledTimes(1);
      expect(mockQuoteService.getRandomQuote).toHaveBeenCalledTimes(1);
    });
  });
});
