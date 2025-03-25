class Settings {
  constructor() {
    if (Settings.instance) return Settings.instance;
    this.configPath =
      "C:\\Users\\andre\\AppData\\Local\\Packages\\Microsoft.WindowsTerminal_8wekyb3d8bbwe\\LocalState\\settings.json";
    this.theme = "dark";
    this.fontSize = 12;
    Settings.instance = this;
  }

  setTheme(theme) {
    fs.readFile(this.configPath, "utf8", (err, data) => {
      if (err) {
        console.error("Ошибка при чтении конфигурационного файла:", err);
        return;
      }

      const config = JSON.parse(data);

      if (theme === "dark") {
        config.profiles.defaults.background = "#000000";
        config.profiles.defaults.foreground = "#ffffff";
      } else {
        config.profiles.defaults.background = "#ffffff";
        config.profiles.defaults.foreground = "#000000";
      }

      fs.writeFile(
        this.configPath,
        JSON.stringify(config, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка при записи в файл:", err);
          } else {
            console.log("Конфигурация успешно обновлена!");
          }
        }
      );
    });
  }

  setFontSize(size) {
    fs.readFile(this.configPath, "utf8", (err, data) => {
      if (err) {
        console.error("Ошибка при чтении конфигурационного файла:", err);
        return;
      }

      const config = JSON.parse(data);

      config.profiles.defaults.fontSize = size;

      fs.writeFile(
        this.configPath,
        JSON.stringify(config, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка при записи в файл:", err);
          } else {
            console.log("Конфигурация успешно обновлена!");
          }
        }
      );
    });
  }
}
