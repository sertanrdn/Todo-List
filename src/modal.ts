let onConfirmCallback: (() => void) | null = null;
let previouslyFocusedElement: HTMLElement | null = null;

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

// Show-Hide functions
export function showDeleteModal(onConfirm: () => void): void {
    onConfirmCallback = onConfirm;
    previouslyFocusedElement = document.activeElement as HTMLElement;
    modalContainer.classList.remove("hidden");
    confirmBtn.focus();
}

export function hideDeleteModal(): void {
    modalContainer.classList.add("hidden");
    onConfirmCallback = null;

    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
}

confirmBtn.addEventListener("click", () => {
    if (onConfirmCallback) {
        onConfirmCallback();
    }
    hideDeleteModal();
});

cancelBtn.addEventListener("click", hideDeleteModal);

modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) hideDeleteModal();
});

document.addEventListener("keydown", (e) => {
    if (!modalContainer.classList.contains("hidden") && e.key === "Escape") {
      hideDeleteModal();
    }
});