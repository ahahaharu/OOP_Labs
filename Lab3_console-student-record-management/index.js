const StudentRepository = require("./infrastructure/repositories/StudentRepository");
const QuoteApiAdapter = require("./infrastructure/adapters/QuoteApiAdapter");
const StudentService = require("./application/services/StudentService");
const QuoteService = require("./application/services/QuoteService");
const ConsoleUI = require("./presentation/ConsoleUI");

const studentRepository = new StudentRepository();
const quoteApiAdapter = new QuoteApiAdapter();
const quoteService = new QuoteService(quoteApiAdapter);
const studentService = new StudentService(studentRepository, quoteService);

const consoleUI = new ConsoleUI(studentService);

consoleUI.start().catch((error) => {
  console.error("Application error:", error);
  process.exit(1);
});
