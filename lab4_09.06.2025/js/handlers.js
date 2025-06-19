import { Task} from "./model.js";
import { tasks } from "./state.js";
import { editTaskWindow } from "./dom.js";
import { renderAllTasks } from "./render.js";

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

export function exitFromEditTask(){
    editTaskWindow.close();
}

export function setMinDate(){
    const input = document.getElementById("task-date-input");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    input.min = `${yyyy}-${mm}-${dd}`;
}

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
    tasks.push(task);
    
    renderAllTasks();

    editTaskWindow.close();
}