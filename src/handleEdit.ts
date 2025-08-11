import { type Todo } from "./types.js";
import { editTodo } from "./todos.js";
import { renderTodos } from "./render.js";

// Handling Edit Mode (Helper func.)
export function handleEdit(todo: Todo, li: HTMLLIElement, list: HTMLUListElement): void {
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
            editTodo(todo.id, newText, list);
        }
    });

    cancelBtn.addEventListener("click", () => {
        renderTodos(list);
    });
}