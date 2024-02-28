const inputBox = document.getElementById('taskInput');
const listContainer = document.getElementById('list-container');
const button = document.getElementById("addIcon");

function addTask(){
    if(inputBox.value === ""){
        alert("Let's start by adding your task.")
    }
    else{
        const li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        let icon = document.createElement('i');
        icon.className = "fa-solid fa-trash";
        // icon.style.zIndex = 100;
        li.appendChild(icon); 
    }
    inputBox.value = '';
    saveData();
} 

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("tasks");
        saveData();
    }else if(e.target.tagName === "I"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showData();

button.addEventListener("click", addTask);
