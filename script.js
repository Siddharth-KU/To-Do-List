const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filters=document.querySelectorAll(".filters span");
const clearButton=document.querySelector(".clear-btn")

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}



function showTask(filter) {
    let tasks = localStorage.getItem("data");
    if (tasks) {
        listContainer.innerHTML = tasks;
        applyFilter(filter);
        removeInitialTasks();
    }
}

function applyFilter(filter) {
    const taskItems = listContainer.querySelectorAll("li");
    taskItems.forEach(task => {
        const isCompleted = task.classList.contains("checked");
        if (filter === "all" ||
            (filter === "pending" && !isCompleted) ||
            (filter === "completed" && isCompleted)) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }
    });
}

function removeInitialTasks() {
    const initialTasks = ["Task 1", "Task 2", "Task 3"];
    initialTasks.forEach(taskText => {
        const taskElement = Array.from(listContainer.children).find(
            child => child.tagName === "LI" && child.textContent.includes(taskText)
        );
        if (taskElement) {
            taskElement.remove();
        }
    });
}

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filters span.active").classList.remove("active");
        btn.classList.add("active");
        showTask(btn.id);
    });
});

clearButton.addEventListener("click", () => {
    listContainer.innerHTML = "";
    saveData();
});

function displayDate(){
    let date=new Date()
    date=date.toString().split(" ")
    document.querySelector("#date").innerHTML=date[1]+" "+date[2]+" "+date[3]
}
window.onload=function()
{
    displayDate()
}

showTask("all");