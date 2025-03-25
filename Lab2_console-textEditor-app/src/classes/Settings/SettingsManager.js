const Settings = require("./Settings");

class SettingsManager {
  constructor() {
    this.settings = new Settings();
  }

  setTheme(theme) {
    this.settings.setTheme(theme);
    console.log(`Тема установлена: ${theme}`);
  }

  setFontSize(size) {
    this.settings.setFontSize(parseInt(size));
    console.log(`Размер шрифта установлен: ${size}`);
  }
}

module.exports = SettingsManager;
