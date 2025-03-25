const DocumentManager = require("../Document/DocumentManager");
const SettingsManager = require("../Settings/SettingsManager");
const FileStorage = require("../Storage/FIleStorage");
const readline = require("readline");

class EditorUI {
  constructor() {
    this.documentManager = new DocumentManager(new FileStorage());
    this.settingsManager = new SettingsManager();
    this.user = null;
    this.users = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  start() {
    console.log("Добро пожаловать в консольный редактор документов!");
    this.showMenu();
  }

  clearConsole() {
    process.stdout.write("\x1Bc");
  }

  pauseAndShowMenu() {
    this.rl.question("Нажмите Enter, чтобы продолжить...", () => {
      this.showMenu();
    });
  }

  showMenu() {
    this.clearConsole();
    console.log("\n--- Меню ---");
    console.log("\n------- Документ -------");
    console.log("1. Создать новый документ");
    console.log("2. Открыть документ");
    console.log("3. Сохранить документ");
    console.log("4. Удалить документ");
    console.log("\n------- Редактирование -------");
    console.log("5. Редактировать текст");
    console.log("6. Применить форматирование");
    console.log("7. Undo");
    console.log("8. Redo");
    console.log("9. Установить пользователя");
    console.log("10. Установить хранение");
    console.log("11. Настройки");
    console.log("12. Просмотреть документ");
    console.log("13. Вырезать/Копировать/Вставить");
    console.log("14. Поиск текста");
    console.log("15. Просмотреть историю");
    console.log("16. Управление пользователями (только для Admin)");
    console.log("17. Выйти");
  }
}

module.exports = EditorUI;
