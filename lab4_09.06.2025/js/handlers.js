import { Task} from "./model.js";
import { allTasks, displayedTasks } from "./state.js";
import { editTaskWindow, sortSelectInput, filterSelectInput } from "./dom.js";
import { renderAllTasks } from "./render.js";

/**
 * Відкриває діалогове вікно для створення нової задачі.
 * Очищує поля.
 */
export function startCreatingTask(){
    const nameField = document.getElementById("task-name-input");
    nameField.value = "";

    const dateInput = document.getElementById("task-date-input");
    dateInput.value = "";

    const priorityHigh = document.getElementById("priority-high");
    priorityHigh.checked = true;
    priorityHigh.checked = false;

    editTaskWindow.showModal();
}

/**
 * Закриває діалогове вікно для редагування/створенян завдання.
 */
export function exitFromEditTask(){
    editTaskWindow.close();
}

/**
 * Задає мінімальну дату (сьогоднішню) до task-date-input.
 */
export function setMinDate(){
    const input = document.getElementById("task-date-input");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    input.min = `${yyyy}-${mm}-${dd}`;
}

/**
 * Створює нове завдання з введених даних.
 * @returns alarm - Якщо введено неправильні дані.
 */
export function createTask(){
    const name = document.getElementById("task-name-input").value.trim();
    if(!name){
        alert("Enter name!");
        return;
    }

    const dateInput = document.getElementById("task-date-input");
    if(!dateInput.value.trim()){
        alert("Enter date!");
        return;
    }

    const [y, m, d] = dateInput.value.trim().split("-").map(Number);
    const enteredDate = new Date(y, m - 1, d);

    const [minY, minM, minD] = dateInput.min.split("-").map(Number);
    const minDate = new Date(minY, minM - 1, minD);

    if(enteredDate < minDate){
        alert("Дата має бути не пізніше сьогоднішнього дня!");
        return;
    }

    const selectedRadio = document.querySelector('input[name="priority-input"]:checked');
    let priority;
    if(selectedRadio){
        priority = selectedRadio.value;
    }
    else{
        alert("Enter priority!");
        return;
    }

    const task = new Task(name, enteredDate, priority, false);
    allTasks.push(task);
    
    renderAllTasks();

    editTaskWindow.close();
}

/**
 * Змінює значення завдання.
 * @param {MouseEvent} event 
 */
export function checkTask(event){
    const task = getTaskFromEvent(event);
    if(task == null)
        return;

    task.isDone = event.target.checked;
    
    renderAllTasks();
}

/**
 * Видаляє задачу, якщо вона вже виконана.
 * @param {MouseEvent} event 
 */
export function deleteTask(event){
    const task = getTaskFromEvent(event);
    if(task == null)
        return;

    const taskIndex = allTasks.findIndex((t) => t.id == task.id);
    if(taskIndex !== -1) allTasks.splice(taskIndex, 1);

    renderAllTasks();
}

/**
 * Повертає задачу, з яким взаємодіють.
 * @param {MouseEvent | FocusEvent} event - Подія взаємодії з задачею 
 * @returns Задача, на який натиснули
 */
function getTaskFromEvent(event) {
    const id = event.target.closest('.task')?.id;
    return allTasks.find(task => task.id == id);
}

/**
 * Сотрує масив за вказаним сортуванням.
 */
export function applySort(){
    const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
    };

    switch (sortSelectInput.value) {
        case "dateAsc":
            displayedTasks.sort((a, b) => a.date - b.date);
            break;
        case "dateDesc":
            displayedTasks.sort((a, b) => b.date - a.date);
            break;
        case "priorityAsc":
            displayedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            break;
        case "priorityDesc":
            displayedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
            break;
        default:
            break;
    }

    displayedTasks.sort((a, b) => a.isDone - b.isDone);
}

/**
 * Фільтрує данні за вибраним фільтром.
 */
export function applyFilter(){
    let filteredTasks = [...allTasks];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekFromToday = new Date(today);
    weekFromToday.setDate(today.getDate() + 7);

    switch (filterSelectInput.value) {
        case "today":
            filteredTasks = allTasks.filter((task) => {
                const taskDate = new Date(task.date);
                taskDate.setHours(0, 0, 0, 0);
                return taskDate.getTime() === today.getTime();
            });
            break;
        case "week":
            filteredTasks = allTasks.filter((task) => {
                const taskDate = new Date(task.date);
                return taskDate >= today && taskDate <= weekFromToday;
            });
            break;
        case "past":
            filteredTasks = allTasks.filter((task) => {
                const taskDate = new Date(task.date);
                return taskDate < today;
            });
            break;
        case "upcoming":
            filteredTasks = allTasks.filter((task) => {
                const taskDate = new Date(task.date);
                return taskDate > today;
            });
            break;
        default:
            break;
    }

    displayedTasks.splice(0, displayedTasks.length, ...filteredTasks);
}

/**
 * Завантажує данні з Json
 */
export async function loadDataFromJson(){
    const response = await fetch("../data/data.json");
    const data = await response.json();

    allTasks.splice(0, allTasks.length, ...data.map(task => new Task(
        task.name,
        new Date(task.date),
        task.priority,
        task.isDone,
        task.id
    )));
}