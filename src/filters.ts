import { Filter } from "./types";
import { updateCurrentFilter } from "./state";
import { renderTodos } from "./render";

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

export function setFilter(filter: Filter) {
    updateCurrentFilter(filter);
    localStorage.setItem("filter", filter);

    const filterToButton: Record<Filter, HTMLButtonElement> = {
        [Filter.All]: allBtn,
        [Filter.Active]: activeBtn,
        [Filter.Completed]: completedBtn
    };

    setActiveFilter(filterToButton[filter]);

    renderTodos();
}
