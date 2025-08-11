import { Filter } from "./types.js";
import { currentFilter } from "./state.js";
import { addTodo } from "./todos.js";
import { setFilter, initFilters } from "./filters.js";
import { renderTodos } from "./render.js";

// -- DOM Elements --
// Title
const title = document.createElement("h1");
title.textContent = "To-Do List";

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

// Filter buttons
const filterContainer = document.createElement("div");

const allBtn = document.createElement("button");
allBtn.textContent = "All";
allBtn.type = "button";
allBtn.addEventListener("click", () => setFilter(Filter.All, list));

const activeBtn = document.createElement("button");
activeBtn.textContent = "Active";
activeBtn.type = "button";
activeBtn.addEventListener("click", () => setFilter(Filter.Active, list));

const completedBtn = document.createElement("button");
completedBtn.textContent = "Completed";
completedBtn.type = "button";
completedBtn.addEventListener("click", () => setFilter(Filter.Completed, list));

filterContainer.appendChild(allBtn);
filterContainer.appendChild(activeBtn);
filterContainer.appendChild(completedBtn);

// (Todo) list container
const list = document.createElement("ul");

document.body.appendChild(title);
document.body.appendChild(form);
document.body.appendChild(filterContainer);
document.body.appendChild(list);

initFilters(allBtn, activeBtn, completedBtn);

// Handling form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== "") {
        addTodo(taskText, list);
        input.value = "";
    }
});

setFilter(currentFilter, list);
renderTodos(list);