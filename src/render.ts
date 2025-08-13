import { todos, currentFilter } from "./state.js";
import { Filter, type Todo } from "./types.js";
import { toggleTodo, deleteTodo, editTodo } from "./todos.js";
import { handleEdit } from "./handleEdit.js";
import { showDeleteModal } from "./modal.js";

// Rendering Todos
export function renderTodos(list: HTMLUListElement) {
    list.innerHTML = ""; // clear current list

    const filtered = todos.filter(todo => {
        if (currentFilter === Filter.Active) return !todo.isComplete;
        if (currentFilter === Filter.Completed) return todo.isComplete;
        return true; // Filter.All
    });

    filtered.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        const checkbox = document.createElement("input");
        checkbox.className = "todo-checkbox";
        checkbox.type = "checkbox";
        checkbox.checked = todo.isComplete;
        checkbox.addEventListener("change", () => toggleTodo(todo.id, list));

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        if (todo.isComplete) {
            span.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "todo-delete-btn";
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener("click", () => {
            showDeleteModal(() => deleteTodo(todo.id, list))
        });

        const editBtn = document.createElement("button");
        editBtn.className = "todo-edit-btn";
        editBtn.textContent = "EDIT";
        editBtn.addEventListener("click", () => handleEdit(todo, li, list));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
    });
}