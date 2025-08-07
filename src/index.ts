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

// Handling form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== "") {
        const listEl = document.createElement("li");
        listEl.textContent = taskText;
        list.appendChild(listEl);
        input.value = "";
    }
});