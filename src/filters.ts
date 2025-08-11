import { Filter } from "./types.js";
import { updateCurrentFilter } from "./state.js";
import { renderTodos } from "./render.js";

let allBtn: HTMLButtonElement;
let activeBtn: HTMLButtonElement;
let completedBtn: HTMLButtonElement;

export function initFilters(all: HTMLButtonElement, active: HTMLButtonElement, completed: HTMLButtonElement) {
    allBtn = all;
    activeBtn = active;
    completedBtn = completed;
}

export function setActiveFilter(button: HTMLButtonElement) {
    [allBtn, activeBtn, completedBtn].forEach(btn => btn.classList.remove("active-filter"));
    button.classList.add("active-filter");
}

export function setFilter(filter: Filter, list: HTMLUListElement) {
    updateCurrentFilter(filter);
    localStorage.setItem("filter", filter);

    const filterToButton: Record<Filter, HTMLButtonElement> = {
        [Filter.All]: allBtn,
        [Filter.Active]: activeBtn,
        [Filter.Completed]: completedBtn
    };

    setActiveFilter(filterToButton[filter]);

    renderTodos(list);
}
