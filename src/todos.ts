import { type Todo } from "./types";
import { todos, nextId, updateTodos, updateNextId } from "./state";
import { saveToLocalStorage } from "./storage";
import { renderTodos } from "./render";

// Add Todos
export function addTodo(text: string): void {
    const newTodo: Todo = {
        id: nextId,
        text,
        isComplete: false
    }
    updateNextId(nextId + 1);
    updateTodos([...todos, newTodo]);
    saveToLocalStorage();
    renderTodos();
}

// Toggle Todo
export function toggleTodo(id: number): void {
    updateTodos(todos.map(todo => 
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    ));
    saveToLocalStorage();
    renderTodos();
}

// Delete Todo
export function deleteTodo(id: number): void {
    updateTodos(todos.filter(todo => todo.id !== id));
    saveToLocalStorage();
    renderTodos();
}

// Edit Todo
export function editTodo(id: number, newText: string): void {
    updateTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
    ));
    saveToLocalStorage();
    renderTodos();
}