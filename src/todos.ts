import { type Todo } from "./types.js";
import { todos, nextId, updateTodos, updateNextId } from "./state.js";
import { saveToLocalStorage } from "./storage.js";
import { renderTodos } from "./render.js";

// Add Todos
export function addTodo(text: string, list: HTMLUListElement): void {
    const newTodo: Todo = {
        id: nextId,
        text,
        isComplete: false
    }
    updateNextId(nextId + 1);
    updateTodos([...todos, newTodo]);
    saveToLocalStorage();
    renderTodos(list);
}

// Toggle Todo
export function toggleTodo(id: number, list: HTMLUListElement): void {
    updateTodos(todos.map(todo => 
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    ));
    saveToLocalStorage();
    renderTodos(list);
}

// Delete Todo
export function deleteTodo(id: number, list: HTMLUListElement): void {
    updateTodos(todos.filter(todo => todo.id !== id));
    saveToLocalStorage();
    renderTodos(list);
}

// Edit Todo
export function editTodo(id: number, newText: string, list: HTMLUListElement): void {
    updateTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
    ));
    saveToLocalStorage();
    renderTodos(list);
}