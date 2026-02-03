<<<<<<< HEAD
const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".column");

const placeholder = document.createElement("div");
placeholder.className = "placeholder";


cards.forEach(card => {
    card.addEventListener("dragstart", e => {
        card.classList.add("dragging");

        const data = {
            id: card.id,
            status: card.parentElement.dataset.status
        };

        e.dataTransfer.setData("application/json", JSON.stringify(data));
    });

    card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        placeholder.remove();
    });
});


columns.forEach(column => {

    column.addEventListener("dragover", e => {
        e.preventDefault();
        column.classList.add("drag-over");

        const dragging = document.querySelector(".dragging");
        const afterElement = getDragAfterElement(column, e.clientY);

        if (!afterElement) {
            column.appendChild(placeholder);
        } else {
            column.insertBefore(placeholder, afterElement);
        }
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("drag-over");
    });

    column.addEventListener("drop", e => {
        e.preventDefault();
        column.classList.remove("drag-over");

        const dragging = document.querySelector(".dragging");
        const data = JSON.parse(e.dataTransfer.getData("application/json"));

        dragging.dataset.status = column.dataset.status;

        if (placeholder.parentElement === column) {
            column.insertBefore(dragging, placeholder);
        } else {
            column.appendChild(dragging);
        }

        placeholder.remove();
    });
});


function getDragAfterElement(column, mouseY) {
    const cards = [...column.querySelectorAll(".card:not(.dragging)")];

    return cards.reduce((closest, card) => {
        const box = card.getBoundingClientRect();
        const offset = mouseY - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: card };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
=======
const cards = document.querySelectorAll(".card");
const columns = document.querySelectorAll(".column");

const placeholder = document.createElement("div");
placeholder.className = "placeholder";


cards.forEach(card => {
    card.addEventListener("dragstart", e => {
        card.classList.add("dragging");

        const data = {
            id: card.id,
            status: card.parentElement.dataset.status
        };

        e.dataTransfer.setData("application/json", JSON.stringify(data));
    });

    card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
        placeholder.remove();
    });
});


columns.forEach(column => {

    column.addEventListener("dragover", e => {
        e.preventDefault();
        column.classList.add("drag-over");

        const dragging = document.querySelector(".dragging");
        const afterElement = getDragAfterElement(column, e.clientY);

        if (!afterElement) {
            column.appendChild(placeholder);
        } else {
            column.insertBefore(placeholder, afterElement);
        }
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("drag-over");
    });

    column.addEventListener("drop", e => {
        e.preventDefault();
        column.classList.remove("drag-over");

        const dragging = document.querySelector(".dragging");
        const data = JSON.parse(e.dataTransfer.getData("application/json"));

        dragging.dataset.status = column.dataset.status;

        if (placeholder.parentElement === column) {
            column.insertBefore(dragging, placeholder);
        } else {
            column.appendChild(dragging);
        }

        placeholder.remove();
    });
});


function getDragAfterElement(column, mouseY) {
    const cards = [...column.querySelectorAll(".card:not(.dragging)")];

    return cards.reduce((closest, card) => {
        const box = card.getBoundingClientRect();
        const offset = mouseY - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: card };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
