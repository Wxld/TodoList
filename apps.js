const todoDiv = document.querySelector(".todo-div");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".input-field");
const todoBtn = document.querySelector(".input-button");
const filterOption = document.querySelector(".filter-list")

//Event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoBtn.addEventListener("click",newTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);


//funtions
function newTodo(e){
    e.preventDefault();
    
    if(todoInput.value==""){
        alert("Task cannot be empty like your head!");
    }else{

        const newDiv = document.createElement("div");
        const newLi = document.createElement("li");
        const completeBtn = document.createElement("button");
        const trashBtn = document.createElement("button");

        newDiv.classList.add("new-todo-div");
        newLi.classList.add("new-todo");
        trashBtn.classList.add("trash-Btn");
        completeBtn.classList.add("complete-Btn");

        newLi.innerText = todoInput.value;
        saveLocalTodo(todoInput.value);
        todoInput.value = "";
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        completeBtn.innerHTML = '<i class="far fa-check-circle"></i>';

        newDiv.appendChild(newLi);
        newDiv.appendChild(completeBtn);
        newDiv.appendChild(trashBtn);
        todoList.insertBefore(newDiv,todoList.firstChild);
    }
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList.contains("trash-Btn")){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodo(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }else if(item.classList.contains("complete-Btn")){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":{
                todo.style.display="flex";
                break;
            }
            case "completed":{
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            }
            case "uncompleted":{
                if(todo.classList.contains("completed")){
                    todo.style.display="none";
                }else{
                    todo.style.display="flex";
                }
                break;
            }
        }
    });
}

function saveLocalTodo(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function removeLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(todo.children[0].innerText),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const newDiv = document.createElement("div");
        const newLi = document.createElement("li");
        const completeBtn = document.createElement("button");
        const trashBtn = document.createElement("button");

        newDiv.classList.add("new-todo-div");
        newLi.classList.add("new-todo");
        trashBtn.classList.add("trash-Btn");
        completeBtn.classList.add("complete-Btn");

        newLi.innerText = todo;
        todoInput.value = "";
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        completeBtn.innerHTML = '<i class="far fa-check-circle"></i>';

        newDiv.appendChild(newLi);
        newDiv.appendChild(completeBtn);
        newDiv.appendChild(trashBtn);
        todoList.insertBefore(newDiv, todoList.firstChild);
    });
}
//localStorage.clear();