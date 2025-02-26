class ConsolePaint {
  constructor(width = 100, height = 30) {
    this.width = width;
    this.height = height;
    this.canvas = Array(height)
      .fill()
      .map(() => Array(width).fill(" "));

    this.history = [];
    this.redoStack = [];
    this.shapes = [];
  }

  display() {
    console.clear();
    this.canvas.forEach((row) => console.log(row.join("")));
  }

  saveState() {
    this.history.push(JSON.stringify(this.canvas));
    this.redoStack = [];
  }

  drawShape(shape) {
    this.saveState();
    shape.draw(this.canvas, this.width, this.height);
    this.shapes.push(shape);
    this.display();
  }

  moveShape(index, dx, dy) {
    if (index < 0 || index >= this.shapes.length) {
      console.log("Неверный индекс фигуры");
      return;
    }
    this.saveState();
    const shape = this.shapes[index];
    shape.erase(this.canvas, this.width, this.height);
    shape.move(dx, dy);
    shape.draw(this.canvas, this.width, this.height);
    this.display();
  }

  clearShape(index) {
    this.saveState();
    this.shapes[index].erase(this.canvas, this.width, this.height);
    this.shapes.splice(index, 1);
    this.display();
  }

  save(filename) {
    const fs = require("fs");
    fs.writeFileSync(filename, JSON.stringify(this.canvas));
    console.log(`Сохранено в ${filename}`);
  }

  load(filename) {
    const fs = require("fs");
    try {
      this.saveState();
      this.canvas = JSON.parse(fs.readFileSync(filename, "utf8"));
      this.shapes = [];
      this.display();
    } catch (e) {
      console.log("Ошибка при загрузке файла!");
    }
  }

  displayShapes() {
    if (this.shapes.length === 0) {
      console.log("На холсте нет фигур.");
      return;
    }
    console.log("Список фигур:");
    this.shapes.forEach((shape, index) => {
      console.log(`${index}: ${shape.toString()}`);
    });
  }

  undo() {
    if (this.history.length > 0) {
      this.redoStack.push(JSON.stringify(this.canvas));
      this.canvas = JSON.parse(this.history.pop());
      if (this.shapes.length > 0) {
        this.shapes.pop();
      }
      this.display();
    }
  }
}

module.exports = ConsolePaint;
