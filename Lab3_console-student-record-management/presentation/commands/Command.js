class Command {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  execute() {
    throw new Error("Method not implemented");
  }
}

module.exports = Command;
