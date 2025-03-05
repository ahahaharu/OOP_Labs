const Shape = require("../Shape");

class Circle extends Shape {
  constructor(x, y, radius, fill) {
    super(x, y, fill);
    this.radius = radius;
  }

  // Отрисовка заполненного круга
  draw(canvas, canvasWidth, canvasHeight) {
    const xc = this.x; // Центр по X
    const yc = this.y; // Центр по Y
    const r = this.radius;

    // Проходим по прямоугольной области, охватывающей круг
    for (let i = yc - r; i <= yc + r && i < canvasHeight; i++) {
      for (let j = xc - r; j <= xc + r && j < canvasWidth; j++) {
        if (i >= 0 && j >= 0) {
          // Проверяем, попадает ли точка (j, i) внутрь круга
          const dx = j - xc;
          const dy = i - yc;
          if (dx * dx + dy * dy <= r * r) {
            // Уравнение круга: x² + y² ≤ r²
            canvas[i][j] = this.fill;
          }
        }
      }
    }
  }

  // Перемещение круга
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  // Стирание круга
  erase(canvas, canvasWidth, canvasHeight) {
    const xc = this.x;
    const yc = this.y;
    const r = this.radius;

    // Стираем ту же область, что и при рисовании
    for (let i = yc - r; i <= yc + r && i < canvasHeight; i++) {
      for (let j = xc - r; j <= xc + r && j < canvasWidth; j++) {
        if (i >= 0 && j >= 0) {
          const dx = j - xc;
          const dy = i - yc;
          if (dx * dx + dy * dy <= r * r) {
            canvas[i][j] = " ";
          }
        }
      }
    }
  }

  // Сериализация в JSON
  toJSON() {
    return {
      type: "Circle",
      x: this.x,
      y: this.y,
      radius: this.radius,
      fill: this.fill,
    };
  }

  // Строковое представление
  toString() {
    return `Круг с центром (${this.x}, ${this.y}), радиус: ${this.radius}, заливка: ${this.fill}`;
  }
}

module.exports = Circle;
