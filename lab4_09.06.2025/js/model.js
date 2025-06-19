/**
 * Клас, що представляє задачу у списку завдань.
 * @class
 */
export class Task {

    /**
     * 
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

    dateToString() {
        return this.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
}