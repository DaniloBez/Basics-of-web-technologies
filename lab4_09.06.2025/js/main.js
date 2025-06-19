import {addTaskSubmitButton, exitButton, exitTaskExitButton, exitTaskSubmitButton, sortSelectInput, filterSelectInput} from "./dom.js";
import {startCreatingTask, exitFromEditTask, createTask, setMinDate} from "./handlers.js"

// --- Events ---
addTaskSubmitButton.addEventListener("click", startCreatingTask);
exitButton.addEventListener("click", exitFromEditTask);
exitTaskExitButton.addEventListener("click", exitFromEditTask);
exitTaskSubmitButton.addEventListener("click", createTask);
//sortSelectInput.addEventListener("select", );
//filterSelectInput.addEventListener("select", );

setMinDate();