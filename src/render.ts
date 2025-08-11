import { todos, currentFilter } from "./state";
import { Filter, type Todo } from "./types";
import { toggleTodo, deleteTodo, editTodo } from "./todos";

// List Container
const list = document.createElement("ul");
document.body.appendChild(list);

// Rendering Todos
export function renderTodos() {
    list.innerHTML = ""; // clear current list
    const filtered = todos.filter(todo => {
        if (currentFilter === Filter.Active) return !todo.isComplete;
        if (currentFilter === Filter.Completed) return todo.isComplete;
        return true; // Filter.All
    });

    filtered.forEach((todo) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.isComplete;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));

        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.isComplete) {
            span.style.textDecoration = "line-through";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        const editBtn = document.createElement("button");
        editBtn.textContent = "EDIT";
        editBtn.addEventListener("click", () => handleEdit(todo, li));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
    });
}

// Handling Edit Mode (Helper func.)
function handleEdit(todo: Todo, li: HTMLLIElement): void {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todo.text;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "SAVE";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "CANCEL";
    cancelBtn.type = "button";

    while (li.firstChild) {
        li.removeChild(li.firstChild);
    }
    li.appendChild(editInput);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);

    saveBtn.addEventListener("click", () => {
        const newText = editInput.value.trim();
        if (newText !== "") {
            editTodo(todo.id, newText);
        }
    });

    cancelBtn.addEventListener("click", () => {
        renderTodos();
    });
}