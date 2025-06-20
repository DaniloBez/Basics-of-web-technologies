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
     */
    constructor(name, date, priority, isDone) {
        this.Id = crypto.randomUUID();
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