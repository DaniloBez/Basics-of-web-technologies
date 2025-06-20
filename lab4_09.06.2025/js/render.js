import { Task} from "./model.js";
import { displayedTasks } from "./state.js";
import { createElement, capitalize } from "./utils.js";
import { applySort, applyFilter, checkTask, deleteTask } from "./handlers.js";

/**@type {HTMLElement} */
const tasksElement = document.querySelector("section.tasks");

/**
 * Перемальовує усі завдання
 */
export function renderAllTasks(){
    tasksElement.innerHTML = "";

    applyFilter();
    applySort();

    for (const task of displayedTasks) {
        renderTask(task);
    }
}

/**
 * Перемальовує завдання відповідно до її значень
 * @param {Task} task 
 */
function renderTask(task){
    const taskElement = createElement("div", "task");
    taskElement.id = task.id;

    const customCheckBox = createElement("label", "custom-checkbox");
    const checkBox = createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "checkbox";
    checkBox.checked = task.isDone;
    checkBox.addEventListener("click", checkTask);
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

    const buttons = createElement("div", "buttons");

    if(task.isDone){
        const deleteButton = createElement("i", "fas fa-trash");
        deleteButton.addEventListener("click", deleteTask);
        buttons.appendChild(deleteButton);
    }

    taskElement.appendChild(buttons);

    tasksElement.appendChild(taskElement);
}