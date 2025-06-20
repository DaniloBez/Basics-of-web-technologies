import {addTaskSubmitButton, exitButton, exitTaskExitButton, exitTaskSubmitButton, sortSelectInput, filterSelectInput} from "./dom.js";
import {startCreatingTask, exitFromEditTask, saveTask, setMinDate, loadDataFromJson} from "./handlers.js"
import { renderAllTasks } from "./render.js";

// --- Events ---
addTaskSubmitButton.addEventListener("click", startCreatingTask);
exitButton.addEventListener("click", exitFromEditTask);
exitTaskExitButton.addEventListener("click", exitFromEditTask);
exitTaskSubmitButton.addEventListener("click", saveTask);
sortSelectInput.addEventListener("change", renderAllTasks);
filterSelectInput.addEventListener("change", renderAllTasks);

// --- init ---
setMinDate();

window.addEventListener("DOMContentLoaded", async () => {
  await loadDataFromJson();
  renderAllTasks();
});