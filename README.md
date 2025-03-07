# Console Paint App on JavaScript

### Богданович Андрей 353504


#### UML диаграмма классов:
![image](https://github.com/user-attachments/assets/eade197b-744a-4665-8ade-cc199d2360a9)


## Функциональные требования (в виде Use Сases)

#### Общее описание участников и случаев использования:
 - **Акторы:** Пользователь (человек, взаимодействующий с консольным приложением
 - **Система:** ConsolePaint 
 - **Описание:** Консольное приложение для создания, редактирования и управления графическими фигурами на виртуальном холсте.

#### Случаи использования
  1. Нарисовать прямоугольник
  2. Нарисовать линию
  3. Нарисовать круг
  4. Переместить фигуру
  5. Удалить фигуру
  6. Очистить холст
  7. Отменить действие
  8. Повторить отменённое действие
  9. Сохранить в файл
  10. Загрузить из файла
  11. Показать список фигур
  12. Завершить программу

#### Описание Use Cases

##### Use Case 1: Нарисовать прямоугольник
  - **Цель:** Добавить прямоугольник на холст
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена, отображается меню
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `1. Нарисовать прямоугольник`.
      2. Система запрашивает координату `x` верхнего левого угла.
      3. Пользователь вводит целое число `x`.
      4. Система запрашивает координату `y` верхнего левого угла.
      5. Пользователь вводит целое число `y`.
      6. Система запрашивает ширину прямоугольника (`width`).
      7. Пользователь вводит положительное целое число.
      8. Система запрашивает высоту прямоугольника (`height`).
      9. Пользователь вводит положительное целое число.
      10. Система запрашивает символ заливки (по умолчанию `*`).
      11. Пользователь вводит один символ или оставляет поле пустым.
      12. Система добавляет прямоугольник на холст и отображает обновлённый холст.
  - **Исключения:**
      - Если `x`, `y` не являются целыми числами, система выводит сообщение об ошибке и просит повторить ввод.
      - Если `width`, `height` не являются целыми числами или `width`/`height` ≤ 0, система выводит сообщение об ошибке и возвращается в меню.
      - Если символ заливки не является одним символом, система выводит сообщение об ошибке и возвращается к меню.

##### Use Case 2: Нарисовать линию
  - **Цель:** Добавить линию на холст
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена, отображается меню
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `2. Нарисовать линию`.
      2. Система запрашивает координату `x1` начальной точки.
      3. Пользователь вводит целое число `x1`.
      4. Система запрашивает координату `y1` начальной точки.
      5. Пользователь вводит целое число `y1`.
      6. Система запрашивает координату `x2` конечной точки.
      7. Пользователь вводит целое число `x2`.
      8. Система запрашивает координату `y2` конечной точки.
      9. Пользователь вводит целое число `y2`.
      10. Система запрашивает символ заливки (по умолчанию `*`).
      11. Пользователь вводит один символ или оставляет поле пустым.
      12. Система добавляет линию на холст и отображает обновлённый холст.
  - **Исключения:**
      - Если любая из координат не является целым числом, система выводит сообщение об ошибке и просит повторить ввод.
      - Если символ заливки не является одним символом, система выводит сообщение об ошибке и возвращается к меню.
   
##### Use Case 3: Нарисовать круг
  - **Цель:** Добавить круг на холст
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена, отображается меню
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `3. Нарисовать круг`.
      2. Система запрашивает координату  центра `x`.
      3. Пользователь вводит целое число `x`.
      4. Система запрашивает координату центра `y`.
      5. Пользователь вводит целое число `y`.
      6. Система запрашивает радиус (`radius`).
      7. Пользователь вводит положительное целое число.
      8. Система запрашивает символ заливки (по умолчанию `*`).
      9. Пользователь вводит один символ или оставляет поле пустым.
      10. Система добавляет круг на холст и отображает обновлённый холст.
  - **Исключения:**
      - Если `x`, `y` не являются целыми числами, система выводит сообщение об ошибке и просит повторить ввод.
      - Если `radius` не является целым числом или `radius` ≤ 0, система выводит сообщение об ошибке и возвращается к меню.
      - Если символ заливки не является одним символом, система выводит сообщение об ошибке и возвращается к меню.

##### Use Case 4: Переместить фигуру
  - **Цель:** Переместить существующую фигуру на новые координаты
  - **Акторы:** Пользователь
  - **Предусловие:** На холсте есть хотя бы одна фигура, программа запущена
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `4. Переместить фигуру`.
      2. Система отображает список фигур с их индексами
      3. Система запраишвает индекс фигуры для перемещения.
      4. Пользователь вводит целое число (индекс).
      5. Система запрашивает сдвиг по горизонтали (`dx`).
      6. Пользователь вводит целое число `dx`.
      7. Система запрашивает сдвиг по вертикали (`dy`).
      8. Пользователь вводит целое число `dy`.
      9. Система перемещает фигуру и отображает обновлённый холст.
  - **Исключения:**
      - Если индекс не является целым числом или находится вне диапазона списка фигур, система выводит сообщение об ошибке и просит повторить ввод.
      - Если `dx` или `dy` не являются целыми числами, система выводит сообщение об ошибке и просит повторить ввод.
   
##### Use Case 5: Удалить фигуру
  - **Цель:** Удалить фигуру с холста
  - **Акторы:** Пользователь
  - **Предусловие:** На холсте есть хотя бы одна фигура, программа запущена
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `5. Удалить фигуру`.
      2. Система отображает список фигур с их индексами
      3. Система запраишвает индекс фигуры для удаления.
      4. Пользователь вводит целое число (индекс).
      5. Система удаляет фигуру и отображает обновлённый холст.
  - **Исключения:**
      - Если индекс не является целым числом или находится вне диапазона списка фигур, система выводит сообщение об ошибке и возвращается к меню.

##### Use Case 6: Очистить холст
  - **Цель:** Удалить все фигуры и очистить холст
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `6. Очистить холст`.
      2. Система очищает холст, удаляет все фигуры и отображает пустой холст
  - **Исключения:** Отсутствуют

##### Use Case 7: Отменить действие
  - **Цель:** Вернуть холст к предыдущему состоянию
  - **Акторы:** Пользователь
  - **Предусловие:** В истории есть хотя бы одно предыдущее состояние
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `7. Отменить действия`.
      2. Система восстанавливает предыдущее состояние холста и фигур.
      3. Система отображает обновлённый холст.
  - **Исключения:**
      - Если история пуста, система не выполняет никаких действий.
   
##### Use Case 8: Повторить отменённое действие
  - **Цель:** Восстановить отменённое состояние холста
  - **Акторы:** Пользователь
  - **Предусловие:** Есть хотя бы одно отмённое действие в стеке повтора.
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `8. Повторить отменённое действие`.
      2. Система восстанавливает предыдущее состояние из стека повтора.
      3. Система отображает обновлённый холст.
  - **Исключения:**
      - Если стек повтора пуст, система не выполняет никаких действий.

##### Use Case 9: Сохранить в файл
  - **Цель:** Сохранить текущее состояние холста в файл
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена.
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `9. Сохранить в файл`.
      2. Система запрашивает имя файла (по умолчанию `canvas`).
      3. Пользователь вводит имя файла.
      4. Система сохранет данные фигур в JSON-файл.
  - **Исключения:**
      -  Если имя файла пустое, система выводит сообщение об ошибке и возвращается в меню.
      -  Если сохранение не удалось (например из-за ошибок файловой системы), система выводит сообщение об ошибке.
   
##### Use Case 10: Загрузить из файла
  - **Цель:** Загрузить состояние холста из файла
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена.
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `10. Загрузить из файла`.
      2. Система запрашивает имя файла.
      3. Пользователь вводит имя файла.
      4. Сисетма загружает данные из JSON-файла, восстанавливает фигуры на холсте и отображает обновлённый холст.
  - **Исключения:**
      -  Если имя файла пустое, система выводит сообщение об ошибке и возвращается в меню.
      -  Если файл не существует или данные в файле некорректны, система выводит сообщение об ошибке и возвращается к меню.

##### Use Case 11: Показать список фигур
  - **Цель:** Отобразить список всех фигур на холсте.
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена.
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `11. Показать список фигур`.
      2. Система отображаает пронумерованный список фигур с их характеристиками (тип, координаты, размер, символ заливки).
      3. Система ожидает нажатия Enter для возврата к меню.
  - **Исключения:**
      -  Если на холсте нет фигур, система выводит сообщение "На холсте нет фигур."

##### Use Case 12: Завершить программу
  - **Цель:** Завершить работу программы.
  - **Акторы:** Пользователь
  - **Предусловие:** Программа запущена.
  - **Основной сценарий:**
      1. Пользователь выбирает пункт меню `12. Выход`.
      2. Система выводит сообщение "Программа завершена!" и завершает работу.
  - **Исключения:** Отсутсвуют

#### Примечания
  - Все Use Case начинаются с отображения меню, и после выполнения действия система возращается к меню если не указано иное.
  - Вводимые данные проверяются на корректность.
  - Программа работает в бесконечном цикле до явного завершения пользователем.
  - Все изменения на холсте отображаются немедленно после выполнения команды.
