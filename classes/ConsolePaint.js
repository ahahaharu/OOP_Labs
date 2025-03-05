const Rectangle = require("./shapes/Rectangle");

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

  drawAll() {
    this.canvas = Array(this.height)
      .fill()
      .map(() => Array(this.width).fill(" "));
    for (const shape of this.shapes) {
      shape.draw(this.canvas, this.width, this.height);
    }
    this.display();
  }

  saveState() {
    // Сохраняем текущее состояние холста и фигур
    this.history.push({
      canvas: JSON.stringify(this.canvas),
      shapes: [...this.shapes], // Копируем массив фигур
    });
    this.redoStack = []; // Очищаем redo-стек при новом действии
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
    // shape.erase(this.canvas, this.width, this.height);
    shape.move(dx, dy);
    this.drawAll();
    // shape.draw(this.canvas, this.width, this.height);
    // this.display();
  }

  clearShape(index) {
    if (index < 0 || index >= this.shapes.length) {
      console.log("Неверный индекс фигуры");
      return;
    }
    this.saveState();
    this.shapes.splice(index, 1);
    this.drawAll();
  }

  clear() {
    this.saveState();
    this.canvas = Array(this.height)
      .fill()
      .map(() => Array(this.width).fill(" "));
    this.shapes = [];
    this.display();
  }

  save(filename) {
    const fs = require("fs");
    const shapesData = this.shapes.map((shape) => shape.toJSON());
    fs.writeFileSync(filename, JSON.stringify(shapesData));
    console.log(`Сохранено в ${filename}`);
  }

  load(filename) {
    const fs = require("fs");
    const Rectangle = require("./shapes/Rectangle"); // Подключаем Rectangle
    const Circle = require("./shapes/Circle"); // Подключаем Circle
    try {
      this.saveState();
      const shapesData = JSON.parse(fs.readFileSync(filename, "utf8"));
      this.shapes = shapesData.map((data) => {
        if (data.type === "Rectangle") {
          return new Rectangle(
            data.x,
            data.y,
            data.width,
            data.height,
            data.fill
          );
        } else if (data.type === "Circle") {
          return new Circle(data.x, data.y, data.radius, data.fill);
        }
        throw new Error("Неизвестный тип фигуры");
      });
      this.drawAll();
    } catch (e) {
      console.log("Ошибка при загрузке файла: " + e.message);
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
      // Сохраняем текущее состояние в redo-стек
      this.redoStack.push({
        canvas: JSON.stringify(this.canvas),
        shapes: [...this.shapes],
      });
      // Восстанавливаем предыдущее состояние
      const previousState = this.history.pop();
      this.canvas = JSON.parse(previousState.canvas);
      this.shapes = [...previousState.shapes]; // Восстанавливаем массив фигур
      this.display();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      // Сохраняем текущее состояние в историю
      this.history.push({
        canvas: JSON.stringify(this.canvas),
        shapes: [...this.shapes],
      });
      // Восстанавливаем следующее состояние
      const nextState = this.redoStack.pop();
      this.canvas = JSON.parse(nextState.canvas);
      this.shapes = [...nextState.shapes]; // Восстанавливаем массив фигур
      this.display();
    }
  }
}

module.exports = ConsolePaint;
