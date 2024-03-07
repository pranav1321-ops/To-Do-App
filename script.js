const inputBox = document.getElementById('taskInput');
const listContainer = document.getElementById('list-container');
const button = document.getElementById("addIcon");
const completedButton = document.getElementById("showCompleted");
const incompleteButton = document.getElementById("showIncomplete");
const clearAllButton = document.getElementById('clearAll');
const tagLine =document.querySelector(".tagline");
function addTask(){
    if(inputBox.value === ""){
        alert("Let's start by adding your task.")
    }
    else{
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = inputBox.value;
        taskText.classList.add("task");
        listContainer.appendChild(li);
        li.appendChild(taskText);

        let icon = document.createElement('i');
        icon.className = "fa-solid fa-trash";
        li.appendChild(icon); 
    }
    inputBox.value = '';
    saveData();
} 

// fuctnion to show simulate typing effect

function typeEffect(element, text, speed){
    let i = 0;
    const typeWriter = setInterval( () => {
        if (i < text.length){
            element.textContent += text.charAt(i);
            i++;
        } else{
            clearInterval(typeWriter)
        }
    },speed);
}

//Running the typing effect to run once the page reloads
window.onload = function(){
    const originalText = tagLine.textContent;
    tagLine.textContent = '';
    typeEffect(tagLine, originalText, 100);
}

//Adding feature so that user just needs to press enter upon post entering the task.

inputBox.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        addTask();
    }
})

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
         e.target.querySelector('.task').classList.toggle("completed");
        saveData();
    }else if(e.target.tagName === "I"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function showTasks(completed) {
    const tasks = listContainer.querySelectorAll("li");

    tasks.forEach(function(task) {
        const taskText = task.querySelector('.task');
        if (!taskText) {
            console.error("Task text element not found in:", task);
            return;
        }
        const isCompleted = taskText.classList.contains("completed");
        if (completed && isCompleted) {
            task.style.display = "flex"; // Show completed tasks
        } else if (!completed && !isCompleted)  {
            task.style.display = "flex"; // Show incomplete tasks
        } else {
            task.style.display = "none"; // Hide other tasks
        }
    });
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();

button.addEventListener("click", addTask);
completedButton.addEventListener("click", () => showTasks(true)); 
incompleteButton.addEventListener("click", () => showTasks(false)); 

clearAllButton.addEventListener("click", () => {
    listContainer.innerHTML = '';
    localStorage.removeItem("data");
});