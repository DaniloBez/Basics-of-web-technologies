/**
 * Клас, що представляє задачу у списку завдань.
 * @class
 */
export class Task {

    /**
     * Ініціалізує завдання з заданими параметрами і згенерованим ID.
     * @param {String} name 
     * @param {Date} date 
     * @param {String} priority 
     * @param {Boolean} isDone 
     * @param {String} id - необов'язковий. Якщо не вказано — генерується автоматично.
     */
    constructor(name, date, priority, isDone, id = crypto.randomUUID()) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.priority = priority;
        this.isDone = isDone;
    }

    /**
     * Перетворює дату у зручний формат.
     * @returns Дату у форматі: місяць число, рік.
     */
    dateToString() {
        return this.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
}