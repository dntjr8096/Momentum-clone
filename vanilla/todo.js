const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
const DELBTN_ID = "delBtn";
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const cleanTodos = toDos.filter(function (todo) {
        return todo.id !== parseInt(li.id);
    });
    cleanTodos.forEach(function (todo) {
        if (todo.id > parseInt(li.id)) {
            todo.id = todo.id - 1;
        }
    });
    toDoList.removeChild(li);
    toDos = cleanTodos;
    saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.id = DELBTN_ID;
    delBtn.addEventListener("click", deleteToDos);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newID;

    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newID
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (todo) {
            paintToDo(todo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();