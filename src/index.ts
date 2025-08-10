// Defining the Types
type Todo = {
    id: number;
    text: string;
    isComplete: boolean;
}

const storedNextId = localStorage.getItem("nextId");
let nextId = storedNextId ? (parseInt(storedNextId) || 1) : 1;

const storedTodos = localStorage.getItem("todos");
let todos: Todo[];
if (storedTodos) {
    try {
        todos = JSON.parse(storedTodos);
    } catch(e) {
        todos = [];
    }
} else {
    todos = [];
}

let currentFilter = (localStorage.getItem("filter") as "all" | "active" | "completed") || "all";

// -- DOM Elements --
// Title
const title = document.createElement("h1");
title.textContent = "To-Do List";
document.body.appendChild(title);

// Form
const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter a task";
input.required = true;

const button = document.createElement("button");
button.textContent = "Add";

form.appendChild(input);
form.appendChild(button);
document.body.appendChild(form);

// Filter buttons
const filterContainer = document.createElement("div");

const allBtn = document.createElement("button");
allBtn.textContent = "All";
allBtn.type = "button";
allBtn.addEventListener("click", () => setFilter("all"));

const activeBtn = document.createElement("button");
activeBtn.textContent = "Active";
activeBtn.type = "button";
activeBtn.addEventListener("click", () => setFilter("active"));

const completedBtn = document.createElement("button");
completedBtn.textContent = "Completed";
completedBtn.type = "button";
completedBtn.addEventListener("click", () => setFilter("completed"));

filterContainer.appendChild(allBtn);
filterContainer.appendChild(activeBtn);
filterContainer.appendChild(completedBtn);
document.body.appendChild(filterContainer);

// List Container
const list = document.createElement("ul");
document.body.appendChild(list);

// Save both todos and nextId to localStorage
function saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("nextId", nextId.toString());
}

function setActiveFilter(button: HTMLButtonElement) {
    [allBtn, activeBtn, completedBtn].forEach(btn => btn.classList.remove("active-filter"));
    button.classList.add("active-filter");
}

function setFilter(filter: "all" | "active" | "completed") {
    currentFilter = filter;
    localStorage.setItem("filter", filter);

    if (filter === "all") setActiveFilter(allBtn);
    else if (filter === "active") setActiveFilter(activeBtn);
    else if (filter === "completed") setActiveFilter(completedBtn);

    renderTodos(todos);
}

// Add Todos
function addTodo(text: string): void {
    const newTodo: Todo = {
        id: nextId,
        text,
        isComplete: false
    }
    nextId++;
    todos.push(newTodo);
    saveToLocalStorage();
    renderTodos(todos);
}

// Toggle Todo
function toggleTodo(id: number): void {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    saveToLocalStorage();
    renderTodos(todos);
}

// Delete Todo
function deleteTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    renderTodos(todos);
}

// Edit Todo
function editTodo(id: number, newText: string): void {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
    );
    saveToLocalStorage();
    renderTodos(todos);
}

// Rendering Todos
function renderTodos(todos: Todo[]) {
    list.innerHTML = ""; // clear current list
    const filtered = todos.filter(todo => {
        if (currentFilter === "active") return !todo.isComplete;
        if (currentFilter === "completed") return todo.isComplete;
        return true;
    });

    filtered.forEach((todo) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isComplete;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));

        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.isComplete) {
            span.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        const editBtn = document.createElement("button");
        editBtn.textContent = "EDIT";
        editBtn.addEventListener("click", () => handleEdit(todo, li));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
    });
}

// Handling form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== "") {
        addTodo(taskText);
        input.value = "";
    }
});

// Handling Edit Mode (Helper func.)
function handleEdit(todo: Todo, li: HTMLLIElement): void {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "SAVE";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "CANCEL";
    cancelBtn.type = "button";

    while (li.firstChild) {
        li.removeChild(li.firstChild);
    }
    li.appendChild(editInput);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);

    saveBtn.addEventListener("click", () => {
        const newText = editInput.value.trim();
        if (newText !== "") {
            editTodo(todo.id, newText);
        }
    });

    cancelBtn.addEventListener("click", () => {
        renderTodos(todos);
    });
}

// Set the correct filter button as active on page load
if (currentFilter === "all") setActiveFilter(allBtn);
else if (currentFilter === "active") setActiveFilter(activeBtn);
else if (currentFilter === "completed") setActiveFilter(completedBtn);

renderTodos(todos);