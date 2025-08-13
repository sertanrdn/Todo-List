let deleteTargetId: string | null = null;
let listRef: HTMLUListElement | null = null;

// Create Modal DOM Elements
const modalContainer = document.createElement("div");
modalContainer.className = "modal-container hidden";

const modal = document.createElement("div");
modal.className = "modal";

const message = document.createElement("p");
message.textContent = "Are you sure you want to delete this task?";

const actions = document.createElement("div");
actions.className = "modal-actions";

const confirmBtn = document.createElement("button");
confirmBtn.className = "confirm-btn";
confirmBtn.textContent = "Delete";

const cancelBtn = document.createElement("button");
cancelBtn.className = "cancel-btn";
cancelBtn.textContent = "Cancel";

actions.appendChild(confirmBtn);
actions.appendChild(cancelBtn);
modal.appendChild(message);
modal.appendChild(actions);
modalContainer.appendChild(modal);
document.body.appendChild(modalContainer);

