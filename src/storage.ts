import { todos, nextId } from "./state.js";

// Save both todos and nextId to localStorage
export function saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("nextId", nextId.toString());
}