const ConsolePaint = require("./classes/ConsolePaint");
const Rectangle = require("./classes/shapes/Rectangle");

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
4. Переместить конкретную фигуру
5. Очистить конкретную фигуру
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

async function mainLoop(paint) {
  while (true) {
    paint.display();
    console.log(menu);
    const choice = await promptInput("Введите номер команды: ");

    switch (choice) {
      case "1": {
        const x = parseInt(await promptInput("Введите x: "));
        const y = parseInt(await promptInput("Введите y: "));
        const w = parseInt(await promptInput("Введите ширину: "));
        const h = parseInt(await promptInput("Введите высоту: "));

        const fill =
          (await promptInput("Введите символ заливки (по умолчанию *): ")) ||
          "*";
        paint.drawShape(new Rectangle(x, y, w, h, fill));
        break;
      }
      case "3": {
        break;
      }
      case "4": {
        break;
      }
      case "5": {
        paint.displayShapes();
        const index = parseInt(
          await promptInput("Введите индекс фигуры для очистки: ")
        );
        paint.clearShape(index);
        break;
      }
      case "6": {
        break;
      }
    }
  }
}

const paint = new ConsolePaint();
mainLoop(paint);
