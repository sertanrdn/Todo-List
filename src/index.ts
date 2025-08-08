// Defining the Types
type Todo = {
    id: number;
    text: string;
    isComplete: boolean;
}

let todos: Todo[] = [];

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

let nextId = 1;

// Handling form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== "") {
        // Creating new todo object
        const newTodo: Todo = {
            id: nextId++,
            text: taskText,
            isComplete: false,
        }

        todos.push(newTodo);
        renderTodos(todos);
        input.value = "";
    }
});

// Rendering Todos
function renderTodos(todos: Todo[]) {
    list.innerHTML = ""; // clear current list
    todos.forEach((todo) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isComplete;
        checkbox.addEventListener("change", () => {
            todo.isComplete = checkbox.checked;
            renderTodos(todos); // Re-render after state change
        });

        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.isComplete) {
            span.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== todo.id);
            renderTodos(todos);
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}