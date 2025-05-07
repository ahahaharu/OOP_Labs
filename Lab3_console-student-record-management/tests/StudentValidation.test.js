const Student = require("../domain/models/Student");

describe("Student", () => {
  describe("validate", () => {
    it("should pass validation for valid student data", () => {
      const student = new Student(1, "Test Student", 8);

      expect(student.validate()).toBe(true);
    });

    it("should reject empty student name", () => {
      const studentEmptyName = new Student(1, "", 8);
      const studentNullName = new Student(1, null, 8);

      expect(() => studentEmptyName.validate()).toThrow(
        "Student name is required"
      );
      expect(() => studentNullName.validate()).toThrow(
        "Student name is required"
      );
    });

    it("should reject invalid grade values", () => {
      const studentLowGrade = new Student(1, "Test Student", -1);
      const studentHighGrade = new Student(1, "Test Student", 11);
      const studentNaNGrade = new Student(1, "Test Student", "not-a-number");

      expect(() => studentLowGrade.validate()).toThrow(
        "Grade must be a number between 0 and 10"
      );
      expect(() => studentHighGrade.validate()).toThrow(
        "Grade must be a number between 0 and 10"
      );
      expect(() => studentNaNGrade.validate()).toThrow(
        "Grade must be a number between 0 and 10"
      );
    });
  });
});
