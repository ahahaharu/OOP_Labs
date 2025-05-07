class Student {
  constructor(id, name, grade) {
    this.id = id;
    this.name = name;
    this.grade = grade;
  }

  validate() {
    if (
      !this.name ||
      typeof this.name !== "string" ||
      this.name.trim() === ""
    ) {
      throw new Error(
        "Student name is required and must be a non-empty string"
      );
    }

    if (isNaN(this.grade) || this.grade < 0 || this.grade > 10) {
      throw new Error("Grade must be a number between 0 and 10");
    }

    return true;
  }
}

module.exports = Student;
