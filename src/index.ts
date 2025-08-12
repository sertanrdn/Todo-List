import { Filter } from "./types.js";
import { currentFilter } from "./state.js";
import { addTodo } from "./todos.js";
import { setFilter, initFilters } from "./filters.js";
import { renderTodos } from "./render.js";

// -- DOM Elements --
// Title
const title = document.createElement("h1");
title.className = "app-title";
title.textContent = "To-Do List";

// Form
const form = document.createElement("form");
form.className = "todo-form";

const input = document.createElement("input");
input.className = "todo-input";
input.type = "text";
input.placeholder = "Enter a task";
input.required = true;

const button = document.createElement("button");
button.className = "add-btn";
button.textContent = "Add";
form.appendChild(input);
form.appendChild(button);

// Filter buttons
const filterContainer = document.createElement("div");
filterContainer.className = "filter-container";

const allBtn = document.createElement("button");
allBtn.className = "filter-button filter-all";
allBtn.textContent = "All";
allBtn.type = "button";
allBtn.addEventListener("click", () => setFilter(Filter.All, list));

const activeBtn = document.createElement("button");
activeBtn.className = "filter-button filter-active";
activeBtn.textContent = "Active";
activeBtn.type = "button";
activeBtn.addEventListener("click", () => setFilter(Filter.Active, list));

const completedBtn = document.createElement("button");
completedBtn.className = "filter-button filter-completed";
completedBtn.textContent = "Completed";
completedBtn.type = "button";
completedBtn.addEventListener("click", () => setFilter(Filter.Completed, list));

filterContainer.appendChild(allBtn);
filterContainer.appendChild(activeBtn);
filterContainer.appendChild(completedBtn);

// (Todo) list container
const list = document.createElement("ul");
list.className = "todo-list";

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