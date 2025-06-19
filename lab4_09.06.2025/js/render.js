import { Task} from "./model.js";
import { tasks } from "./state.js";
import { createElement, capitalize } from "./utils.js";

const tasksElement = document.querySelector("section.tasks");

export function renderAllTasks(){
    tasksElement.innerHTML = "";
    for (const task of tasks) {
        renderTask(task);
    }
}

/**
 * 
 * @param {Task} task 
 */
function renderTask(task){
    const taskElement = createElement("div", "task");
    taskElement.id = task.Id;

    const customCheckBox = createElement("label", "custom-checkbox");
    const checkBox = createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "checkbox";
    customCheckBox.appendChild(checkBox);

    const checkmark = createElement("span", "checkmark");
    customCheckBox.appendChild(checkmark)

    taskElement.appendChild(customCheckBox);

    const mainInfo = createElement("div", "main-info")
    const name = createElement("div", "name", task.name);
    mainInfo.appendChild(name);

    const priority = createElement("div", "priority " + task.priority, capitalize(task.priority));
    mainInfo.appendChild(priority);

    taskElement.appendChild(mainInfo);

    const date = createElement("div", "date", task.dateToString())
    taskElement.appendChild(date);

    tasksElement.appendChild(taskElement);
}