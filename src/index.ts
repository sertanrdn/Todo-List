// Defining the Types
type Todo = {
    id: number;
    text: string;
    isComplete: boolean;
}

const storedNextId = localStorage.getItem("nextId");
let nextId = storedNextId ? parseInt(storedNextId) : 1;

const storedTodos = localStorage.getItem("todos");
let todos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

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

// List Container
const list = document.createElement("ul");
document.body.appendChild(list);

// Add Todos
function addTodo(text: string): void {
    const newTodo: Todo = {
        id: nextId++,
        text,
        isComplete: false
    }
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

// Save both todos and nextId to localStorage
function saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("nextId", nextId.toString());
}

// Rendering Todos
function renderTodos(todos: Todo[]) {
    list.innerHTML = ""; // clear current list
    todos.forEach((todo) => {
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

renderTodos(todos);