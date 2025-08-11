import { Filter } from "./types";
import { currentFilter } from "./state";
import { addTodo } from "./todos";
import { setFilter, initFilters } from "./filters";
import { renderTodos } from "./render";

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
allBtn.addEventListener("click", () => setFilter(Filter.All));

const activeBtn = document.createElement("button");
activeBtn.textContent = "Active";
activeBtn.type = "button";
activeBtn.addEventListener("click", () => setFilter(Filter.Active));

const completedBtn = document.createElement("button");
completedBtn.textContent = "Completed";
completedBtn.type = "button";
completedBtn.addEventListener("click", () => setFilter(Filter.Completed));

filterContainer.appendChild(allBtn);
filterContainer.appendChild(activeBtn);
filterContainer.appendChild(completedBtn);
document.body.appendChild(filterContainer);

initFilters(allBtn, activeBtn, completedBtn);

// Handling form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== "") {
        addTodo(taskText);
        input.value = "";
    }
});

setFilter(currentFilter);
renderTodos();