import { type Todo, Filter, isValidFilter } from "./types";

const storedNextId = localStorage.getItem("nextId");
export let nextId = storedNextId ? (parseInt(storedNextId) || 1) : 1;

const storedTodos = localStorage.getItem("todos");
export let todos: Todo[];
if (storedTodos) {
    try {
        todos = JSON.parse(storedTodos);
    } catch(e) {
        todos = [];
    }
} else {
    todos = [];
}

const storedFilter = localStorage.getItem("filter");
export let currentFilter: Filter = storedFilter && isValidFilter(storedFilter) 
    ? storedFilter 
    : Filter.All;


export function updateTodos(newTodos: Todo[]) {
    todos = newTodos;
}

export function updateNextId(newId: number) {
    nextId = newId;
}

export function updateCurrentFilter(newFilter: Filter) {
    currentFilter = newFilter;
}