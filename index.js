const ConsolePaint = require("./classes/ConsolePaint");
const Rectangle = require("./classes/shapes/Rectangle");
const Circle = require("./classes/shapes/Circle");
const Line = require("./classes/shapes/Line");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = `
==========================
Выберите действие:
1. Нарисовать прямоугольник
2. Нарисовать линию
3. Нарисовать круг
4. Переместить фигуру
5. Очистить фигуру
6. Очистить холст
7. Отменить действие
8. Повторить отменённое действие
9. Сохранить в файл
10. Загрузить из файла
11. Показать список фигур
12. Выход
`;

function promptInput(question) {
  return new Promise((resolve) => readline.question(question, resolve));
}

async function tapToContinue() {
  await promptInput("Нажмите Enter, чтобы продолжить...");
}

async function mainLoop(paint) {
  while (true) {
    paint.display();
    console.log(menu);
    const choice = await promptInput("Введите номер команды: ");

    switch (choice) {
      case "1": {
        const x = parseInt(await promptInput("Введите x: "));
        if (isNaN(x)) {
          console.log("Ошибка: x должен быть числом!");
          await tapToContinue();
          break;
        }
        const y = parseInt(await promptInput("Введите y: "));
        if (isNaN(y)) {
          console.log("Ошибка: y должен быть числом!");
          await tapToContinue();
          break;
        }
        const w = parseInt(await promptInput("Введите ширину: "));
        if (isNaN(w) || w <= 0) {
          console.log("Ошибка: ширина должна быть положительным числом!");
          await tapToContinue();
          break;
        }
        const h = parseInt(await promptInput("Введите высоту: "));
        if (isNaN(h) || h <= 0) {
          console.log("Ошибка: высота должна быть положительным числом!");
          await tapToContinue();
          break;
        }
        const fill =
          (await promptInput("Введите символ заливки (по умолчанию *): ")) ||
          "*";
        if (fill.length !== 1) {
          console.log("Ошибка: символ заливки должен быть одним символом!");
          await tapToContinue();
          break;
        }
        paint.drawShape(new Rectangle(x, y, w, h, fill));
        break;
      }
      case "2": {
        const x1 = parseInt(await promptInput("Введите x1: "));
        if (isNaN(x1)) {
          console.log("Ошибка: x1 должен быть числом!");
          await tapToContinue();
          break;
        }
        const y1 = parseInt(await promptInput("Введите y1: "));
        if (isNaN(y1)) {
          console.log("Ошибка: y1 должен быть числом!");
          await tapToContinue();
          break;
        }
        const x2 = parseInt(await promptInput("Введите x2: "));
        if (isNaN(x2)) {
          console.log("Ошибка: x2 должен быть числом!");
          await tapToContinue();
          break;
        }
        const y2 = parseInt(await promptInput("Введите y2: "));
        if (isNaN(y2)) {
          console.log("Ошибка: y2 должен быть числом!");
          await tapToContinue();
          break;
        }
        const fill =
          (await promptInput("Введите символ заливки (по умолчанию *): ")) ||
          "*";
        if (fill.length !== 1) {
          console.log("Ошибка: символ заливки должен быть одним символом!");
          await tapToContinue();
          break;
        }
        paint.drawShape(new Line(x1, y1, x2, y2, fill));
        break;
      }
      case "3": {
        const x = parseInt(await promptInput("Введите x центра: "));
        if (isNaN(x)) {
          console.log("Ошибка: x должен быть числом!");
          await tapToContinue();
          break;
        }
        const y = parseInt(await promptInput("Введите y центра: "));
        if (isNaN(y)) {
          console.log("Ошибка: y должен быть числом!");
          await tapToContinue();
          break;
        }
        const r = parseInt(await promptInput("Введите радиус: "));
        if (isNaN(r) || r <= 0) {
          console.log("Ошибка: радиус должен быть положительным числом!");
          await tapToContinue();
          break;
        }
        const fill =
          (await promptInput("Введите символ заливки (по умолчанию *): ")) ||
          "*";
        if (fill.length !== 1) {
          console.log("Ошибка: символ заливки должен быть одним символом!");
          await tapToContinue();
          break;
        }
        paint.drawShape(new Circle(x, y, r, fill));
        break;
      }
      case "4": {
        paint.displayShapes();
        const index = parseInt(
          await promptInput("Введите индекс фигуры для перемещения: ")
        );
        if (isNaN(index) || index < 0 || index >= paint.shapes.length) {
          console.log(
            "Ошибка: индекс должен быть числом в пределах списка фигур!"
          );
          await tapToContinue();
          break;
        }
        const dx = parseInt(await promptInput("Сдвиг по горизонтали (dx): "));
        if (isNaN(dx)) {
          console.log("Ошибка: сдвиг по горизонтали должен быть числом!");
          await tapToContinue();
          break;
        }
        const dy = parseInt(await promptInput("Сдвиг по вертикали (dy): "));
        if (isNaN(dy)) {
          console.log("Ошибка: сдвиг по вертикали должен быть числом!");
          await tapToContinue();
          break;
        }
        paint.moveShape(index, dx, dy);
        break;
      }
      case "5": {
        paint.displayShapes();
        const index = parseInt(
          await promptInput("Введите индекс фигуры для очистки: ")
        );
        if (isNaN(index) || index < 0 || index >= paint.shapes.length) {
          console.log(
            "Ошибка: индекс должен быть числом в пределах списка фигур!"
          );
          await tapToContinue();
          break;
        }
        paint.clearShape(index);
        break;
      }
      case "6": {
        paint.clear();
        break;
      }
      case "7": {
        paint.undo();
        break;
      }
      case "8": {
        paint.redo();
        break;
      }
      case "9": {
        let filename =
          (await promptInput("Введите имя файла (по умолчанию canvas): ")) ||
          "canvas";

        if (!filename) {
          console.log("Ошибка: имя файла не может быть пустым!");
          await tapToContinue();
          break;
        }

        paint.save(filename);
        break;
      }
      case "10": {
        let filename = await promptInput("Введите имя файла: ");
        if (!filename) {
          console.log("Ошибка: имя файла не может быть пустым!");
          await tapToContinue();
          break;
        }

        paint.load(filename);
        break;
      }
      case "11": {
        paint.displayShapes();
        await tapToContinue();
        break;
      }
      case "12": {
        console.log("Программа завершена!");
        readline.close();
        return;
      }
      default:
        console.log("Неверный выбор! Введите число от 1 до 12.");
        await tapToContinue();
    }
  }
}

const paint = new ConsolePaint();
mainLoop(paint);
