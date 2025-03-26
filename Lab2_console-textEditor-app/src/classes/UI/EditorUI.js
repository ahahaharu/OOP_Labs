const DocumentManager = require("../Document/DocumentManager");
const SettingsManager = require("../Settings/SettingsManager");
const FileStorage = require("../Storage/FIleStorage");
const readline = require("readline");
const UserManager = require("../User/UserManager");
const ViewerRole = require("../User/Roles/ViewerRole");
const EditorRole = require("../User/Roles/EditorRole");
const AdminRole = require("../User/Roles/AdminRole");
const User = require("../User/User");
const TextEditorUI = require("./TextEditorUI");

class EditorUI {
  constructor(
    documentManager = new DocumentManager(new FileStorage()),
    settingsManager = new SettingsManager(),
    userManager = new UserManager()
  ) {
    this.documentManager = documentManager;
    this.settingsManager = settingsManager;
    this.userManager = userManager;
    this.user = null;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.textEditor = new TextEditorUI(this.documentManager, this.rl);
  }

  start() {
    console.log("Добро пожаловать в консольный редактор документов!");
    this.loginOrCreate();
  }

  clearConsole() {
    process.stdout.write("\x1Bc");
  }

  pauseAndShowMenu() {
    this.rl.question("Нажмите Enter, чтобы продолжить...", () => {
      this.showMenu();
    });
  }

  // Экран входа или создания профиля
  loginOrCreate() {
    this.clearConsole();
    console.log("\n--- Вход / Создание профиля ---");
    console.log("1. Войти в существующий профиль");
    console.log("2. Создать новый профиль");
    this.rl.question("Выберите действие: ", (answer) => {
      switch (answer) {
        case "1":
          this.login();
          break;
        case "2":
          this.createProfile();
          break;
        default:
          console.log("Неверный выбор");
          this.loginOrCreate();
      }
    });
  }

  // Логика входа
  login() {
    this.rl.question("Введите имя пользователя: ", (name) => {
      const user = this.userManager.getUser(name);
      if (user) {
        this.user = user;
        console.log(`Вход выполнен: ${name}`);
        this.showMenu();
      } else {
        console.log("Пользователь не найден");
        this.loginOrCreate();
      }
    });
  }

  // Логика создания профиля
  createProfile() {
    this.rl.question("Введите имя пользователя: ", (name) => {
      if (this.userManager.getUser(name)) {
        console.log("Пользователь с таким именем уже существует");
        this.loginOrCreate();
        return;
      }
      console.log("Выберите роль:");
      console.log("1. Viewer");
      console.log("2. Editor");
      console.log("3. Admin");
      this.rl.question("Введите номер: ", (role) => {
        let userRole;
        switch (role) {
          case "1":
            userRole = new ViewerRole();
            break;
          case "2":
            userRole = new EditorRole();
            break;
          case "3":
            userRole = new AdminRole();
            break;
          default:
            console.log("Неверная роль");
            this.loginOrCreate();
            return;
        }
        const user = new User(name, userRole);
        // user.addObserver(new RoleChangeObserver());
        this.userManager.addUser(user);
        this.user = user;
        console.log(`Профиль создан и вход выполнен: ${name} с ролью ${role}`);
        this.showMenu();
      });
    });
  }

  // Основное меню
  showMenu() {
    this.clearConsole();
    console.log(`\n--- Меню (Пользователь: ${this.user.name}) ---`);

    console.log("\n------- Документ -------");
    console.log("1. Открыть документ");
    console.log("2. Просмотреть документ");
    console.log("3. Поиск текста");

    if (this.user.getRole().canEdit()) {
      console.log("\n------- Редактирование -------");
      console.log("4. Создать новый документ");
      console.log("5. Сохранить документ");
      console.log("6. Удалить документ");
      console.log("7. Редактировать текст");
      console.log("8. Применить форматирование");
      console.log("9. Undo");
      console.log("10. Redo");
      console.log("11. Вырезать/Копировать/Вставить");
      console.log("12. Изменить тип документа");
    }

    if (this.user.getRole().canManageUsers()) {
      console.log("\n------- Администрирование -------");
      console.log("13. Управление пользователями");
    }

    console.log("\n------- Настройки -------");
    console.log("14. Настройки");
    console.log("15. Выйти из профиля");
    console.log("16. Выйти из приложения");

    this.rl.question("Выберите действие: ", (answer) => {
      switch (answer) {
        case "1":
          this.openDocument();
          break;
        case "2":
          this.viewDocument();
          break;
        case "3":
          this.searchText();
          break;
        case "4":
          if (this.user.getRole().canEdit()) {
            this.createDocument();
          } else {
            console.log("Нет прав на создание документа");
            this.pauseAndShowMenu();
          }
          break;
        case "5":
          if (this.user.getRole().canEdit()) {
            this.saveDocument();
          } else {
            console.log("Нет прав на сохранение");
            this.pauseAndShowMenu();
          }
          break;
        case "6":
          if (this.user.getRole().canEdit()) {
            this.deleteDocument();
          } else {
            console.log("Нет прав на удаление");
            this.pauseAndShowMenu();
          }
          break;
        case "7":
          if (this.user.getRole().canEdit()) {
            this.editDocument();
          } else {
            console.log("Нет прав на редактирование");
            this.pauseAndShowMenu();
          }
          break;
        case "8":
          if (this.user.getRole().canEdit()) {
            this.formatDocument();
          } else {
            console.log("Нет прав на форматирование");
            this.pauseAndShowMenu();
          }
          break;
        case "9":
          if (this.user.getRole().canEdit()) {
            this.undo();
          } else {
            console.log("Нет прав на undo");
            this.pauseAndShowMenu();
          }
          break;
        case "10":
          if (this.user.getRole().canEdit()) {
            this.redo();
          } else {
            console.log("Нет прав на redo");
            this.pauseAndShowMenu();
          }
          break;
        case "11":
          if (this.user.getRole().canEdit()) {
            this.cutCopyPaste();
          } else {
            console.log("Нет прав на вырезку/копирование/вставку");
            this.pauseAndShowMenu();
          }
          break;
        case "12":
          if (this.user.getRole().canEdit()) {
            this.changeDocumentType();
          } else {
            console.log("Нет прав на изменение типа документа");
            this.pauseAndShowMenu();
          }
          break;
        case "13":
          if (this.user.getRole().canManageUsers()) {
            this.manageUsers();
          } else {
            console.log("Нет прав на управление пользователями");
            this.pauseAndShowMenu();
          }
          break;
        case "14":
          this.settingsMenu();
          break;
        case "15":
          this.logout();
          break;
        case "16":
          this.clearConsole();
          console.log("До свидания!");
          this.rl.close();
          return;
        default:
          console.log("Неверный выбор");
          this.pauseAndShowMenu();
      }
    });
  }

  changeDocumentType() {
    console.log("\nВыберите новый тип документа:");
    console.log("1. PlainText");
    console.log("2. Markdown");
    console.log("3. RichText");
    this.rl.question("Введите номер типа: ", (typeChoice) => {
      const types = { 1: "PlainText", 2: "Markdown", 3: "RichText" };
      const newType = types[typeChoice];
      if (!newType) {
        console.log("Неверный выбор типа");
        this.pauseAndShowMenu();
        return;
      }
      this.documentManager.changeDocumentType(newType);
      this.pauseAndShowMenu();
    });
  }

  logout() {
    this.user = null;
    console.log("Вы вышли из профиля");
    this.loginOrCreate();
  }

  createDocument() {
    console.log("Введите тип документа");
    console.log("1. PlainText");
    console.log("2. Markdown");
    console.log("3. RichText");
    this.rl.question("Введите номер: ", (answer) => {
      switch (answer) {
        case "1":
          try {
            this.documentManager.createDocument("PlainText");
          } catch (error) {
            console.log(error.message);
          }
          this.pauseAndShowMenu();
          break;
        case "2":
          try {
            this.documentManager.createDocument("Markdown");
          } catch (error) {
            console.log(error.message);
          }
          this.pauseAndShowMenu();
          break;
        case "3":
          try {
            this.documentManager.createDocument("RichText");
          } catch (error) {
            console.log(error.message);
          }
          this.pauseAndShowMenu();
          break;
        default:
          console.log("Неверный выбор");
          this.pauseAndShowMenu();
      }
    });
  }

  openDocument() {
    this.rl.question(
      "Введите название документа (например file.txt): ",
      (path) => {
        this.documentManager.openDocument(path);
        this.pauseAndShowMenu();
      }
    );
  }

  saveDocument() {
    this.rl.question("Введите путь для сохранения: ", (path) => {
      console.log("\nВыберите формат сохранения:");
      console.log("1. TXT");
      console.log("2. JSON");
      console.log("3. XML");
      this.rl.question("Введите номер формата: ", (formatChoice) => {
        const formats = { 1: "TXT", 2: "JSON", 3: "XML" };
        const format = formats[formatChoice];
        if (!format) {
          console.log("Неверный выбор формата");
          this.saveDocument();
          return;
        }
        this.documentManager.saveDocument(path, format);
        this.pauseAndShowMenu();
      });
    });
  }

  deleteDocument() {
    this.rl.question("Введите название документа для удаления: ", (path) => {
      this.documentManager.deleteDocument(path);
      this.pauseAndShowMenu();
    });
  }

  async editDocument() {
    await this.textEditor.edit();
    this.pauseAndShowMenu();
  }

  formatDocument() {
    console.log("\nВыберите стиль форматирования:");
    console.log("1. Bold");
    console.log("2. Italic");
    console.log("3. Underline");
    if (
      this.documentManager.document &&
      this.documentManager.document.type === "Markdown"
    ) {
      console.log("4. Color");
    }
    this.rl.question("Введите номер стиля: ", (styleChoice) => {
      let style, value;
      switch (styleChoice) {
        case "1":
          style = "bold";
          break;
        case "2":
          style = "italic";
          break;
        case "3":
          style = "underline";
          break;
        case "4":
          if (this.documentManager.document.type === "Markdown") {
            style = "color";
          } else {
            console.log("Неверный выбор стиля");
            this.pauseAndShowMenu();
            return;
          }
          break;
        default:
          console.log("Неверный выбор стиля");
          this.pauseAndShowMenu();
          return;
      }
      this.rl.question("Введите начальную позицию: ", (start) => {
        this.rl.question("Введите длину текста: ", (length) => {
          if (style === "color") {
            this.rl.question("Введите цвет (red, green, blue): ", (color) => {
              this.documentManager.formatDocument(
                style,
                parseInt(start),
                parseInt(length),
                color
              );
              this.pauseAndShowMenu();
            });
          } else {
            this.documentManager.formatDocument(
              style,
              parseInt(start),
              parseInt(length)
            );
            this.pauseAndShowMenu();
          }
        });
      });
    });
  }

  undo() {
    this.documentManager.undo();
    this.pauseAndShowMenu();
  }

  redo() {
    this.documentManager.redo();
    this.pauseAndShowMenu();
  }

  setUser() {
    this.rl.question("Введите имя пользователя: ", (name) => {
      console.log("Выберите роль:");
      console.log("1. Viewer");
      console.log("2. Editor");
      console.log("3. Admin");
      this.rl.question("Введите номер: ", (role) => {
        let userRole;

        switch (role) {
          case "1":
            userRole = new ViewerRole();
            break;
          case "2":
            userRole = new EditorRole();
            break;
          case "3":
            userRole = new AdminRole();
            break;
          default:
            console.log("Неверная роль");
            this.pauseAndShowMenu();
            return;
        }
        const user = new User(name, userRole);
        // user.addObserver(new RoleChangeObserver());
        this.userManager.addUser(user);
        this.user = user;
        console.log(`Установлен пользователь: ${name} с ролью ${role}`);
        this.pauseAndShowMenu();
      });
    });
  }

  setStorage() {
    this.rl.question("Введите тип хранения (file, cloud): ", (type) => {
      this.documentManager.storage =
        type === "cloud" ? new CloudStorage() : new FileStorage();
      console.log(`Установлено хранение: ${type}`);
      this.pauseAndShowMenu();
    });
  }

  settingsMenu() {
    this.clearConsole();
    console.log("\n--- Настройки ---");
    console.log("1. Установить тему");
    console.log("2. Установить размер шрифта");
    console.log("3. Назад");

    this.rl.question("Выберите действие: ", (answer) => {
      switch (answer) {
        case "1":
          this.rl.question("Введите тему (light, dark): ", (theme) => {
            this.settingsManager.setTheme(theme);
            this.pauseAndSettingsMenu();
          });
          break;
        case "2":
          this.rl.question("Введите размер шрифта: ", (size) => {
            this.settingsManager.setFontSize(size);
            this.pauseAndSettingsMenu();
          });
          break;
        case "3":
          this.showMenu();
          break;
        default:
          console.log("Неверный выбор");
          this.pauseAndSettingsMenu();
      }
    });
  }

  pauseAndSettingsMenu() {
    this.rl.question("Нажмите Enter, чтобы продолжить...", () => {
      this.settingsMenu();
    });
  }

  viewDocument() {
    this.documentManager.viewDocument();
    this.pauseAndShowMenu();
  }

  cutCopyPaste() {
    console.log("\nВыберите действие:");
    console.log("1. Вырезать");
    console.log("2. Копировать");
    console.log("3. Вставить");
    this.rl.question("Введите номер действия: ", (action) => {
      if (action === "1" || action === "2") {
        this.rl.question("Введите начальную позицию: ", (start) => {
          this.rl.question("Введите длину текста: ", (length) => {
            const startPos = parseInt(start);
            const len = parseInt(length);
            if (action === "1") {
              this.documentManager.cutText(startPos, len);
            } else {
              this.documentManager.copyText(startPos, len);
            }
            this.pauseAndShowMenu();
          });
        });
      } else if (action === "3") {
        this.rl.question("Введите позицию для вставки: ", (pos) => {
          const position = parseInt(pos);
          console.log("\nВыберите источник текста:");
          console.log("1. Вставить текст из буфера обмена программы");
          console.log("2. Ввести свой текст");
          this.rl.question("Введите номер: ", (choice) => {
            if (choice === "1") {
              this.documentManager.pasteText(position);
              this.pauseAndShowMenu();
            } else if (choice === "2") {
              this.rl.question("Введите текст для вставки: ", (customText) => {
                this.documentManager.pasteText(position, customText);
                this.pauseAndShowMenu();
              });
            } else {
              console.log("Неверный выбор");
              this.pauseAndShowMenu();
            }
          });
        });
      } else {
        console.log("Неверный выбор");
        this.pauseAndShowMenu();
      }
    });
  }

  searchText() {
    this.rl.question("Введите текст для поиска: ", (query) => {
      this.documentManager.searchText(query);
      this.pauseAndShowMenu();
    });
  }

  viewHistory() {
    this.documentManager.viewHistory();
    this.pauseAndShowMenu();
  }

  manageUsers() {
    this.clearConsole();
    console.log("\n--- Управление пользователями ---");
    console.log("1. Просмотреть список пользователей");
    console.log("2. Изменить роль пользователя");
    console.log("3. Назад");

    this.rl.question("Выберите действие: ", (answer) => {
      switch (answer) {
        case "1":
          console.log("Список пользователей:");
          this.userManager.users.forEach((u, index) => {
            console.log(
              `${index + 1}. ${u.name} - ${u.getRole().constructor.name}`
            );
          });
          this.pauseAndManageUsers();
          break;
        case "2":
          this.rl.question(
            "Введите имя пользователя для изменения роли: ",
            (name) => {
              const user = this.userManager.getUser(name);
              if (!user) {
                console.log("Пользователь не найден");
                this.pauseAndManageUsers();
                return;
              }
              this.rl.question(
                "Введите новую роль (Viewer, Editor, Admin): ",
                (role) => {
                  let newRole;
                  switch (role) {
                    case "Viewer":
                      newRole = new ViewerRole();
                      break;
                    case "Editor":
                      newRole = new EditorRole();
                      break;
                    case "Admin":
                      newRole = new AdminRole();
                      break;
                    default:
                      console.log("Неверная роль");
                      this.pauseAndManageUsers();
                      return;
                  }
                  user.setRole(newRole);
                  this.userManager.saveUsers();
                  this.pauseAndManageUsers();
                }
              );
            }
          );
          break;
        case "3":
          this.showMenu();
          break;
        default:
          console.log("Неверный выбор");
          this.pauseAndManageUsers();
      }
    });
  }

  pauseAndManageUsers() {
    this.rl.question("Нажмите Enter, чтобы продолжить...", () => {
      this.manageUsers();
    });
  }
}

module.exports = EditorUI;
