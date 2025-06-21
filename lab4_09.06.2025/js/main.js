import {addTaskSubmitButton, exitButton, exitTaskExitButton, editTaskSubmitButton, sortSelectInput, filterSelectInput, filterTaskByNameInput} from "./dom.js";
import {startCreatingTask, exitFromEditTask, saveTask, setMinDate, loadDataFromJson} from "./handlers.js"
import { renderAllTasks } from "./render.js";

// --- Events ---
addTaskSubmitButton.addEventListener("click", startCreatingTask);
exitButton.addEventListener("click", exitFromEditTask);
exitTaskExitButton.addEventListener("click", exitFromEditTask);
editTaskSubmitButton.addEventListener("click", saveTask);
sortSelectInput.addEventListener("change", renderAllTasks);
filterSelectInput.addEventListener("change", renderAllTasks);
filterTaskByNameInput.addEventListener("input", renderAllTasks);


// --- init ---
setMinDate();

window.addEventListener("DOMContentLoaded", async () => {
  await loadDataFromJson();
  renderAllTasks();
});