fetch('productos.json')
    .then(res => res.json())
    .then(data => {
        const contenedor = document.querySelector(".productos");

        data.forEach(producto => {
            const article = document.createElement("article");
            article.classList.add("producto");

            article.dataset.id = producto.id;
            article.dataset.precio = producto.precio;

            article.innerHTML = `
                <img src="${producto.imagen}">
                <h3>${producto.nombre}</h3>
                <p>Precio: ${producto.precio}€</p>
                <button class="btn-detalles">Detalles</button>
                <button class="btn-añadir">Añadir</button>
            `;

            contenedor.appendChild(article);
        });
    });



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.querySelector(".productos");
const modalCarrito = document.getElementById("modalCarrito");
const contenidoCarrito = modalCarrito.querySelector(".modal-content");

contenedor.addEventListener("click", e => {
    const card = e.target.closest(".producto");
    if (!card) return;

    if (e.target.classList.contains("btn-detalles")) {
        modalDetalles(card);
    }

    if (e.target.classList.contains("btn-añadir")) {
        añadirProducto(card);
    }
});

function añadirProducto(card) {
    const id = card.dataset.id;
    const nombre = card.querySelector("h3").textContent;
    const precio = parseFloat(card.dataset.precio);
    const imagen = card.querySelector("img").src;

    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

function renderCarrito() {
    let total = 0;

    contenidoCarrito.innerHTML = `
        <span class="close">X</span>
        <h2>Carrito de compra</h2>
    `;

    carrito.forEach(p => {
        total += p.precio * p.cantidad;

        const item = document.createElement("p");
        item.textContent = `${p.nombre} — ${p.cantidad} ud(s) — ${p.precio * p.cantidad}€`;
        contenidoCarrito.appendChild(item);
    });

    const totalEl = document.createElement("p");
    totalEl.textContent = `Total: ${total}€`;
    contenidoCarrito.appendChild(totalEl);

    const btn = document.createElement("button");
    btn.textContent = "Finalizar compra";
    contenidoCarrito.appendChild(btn);

    contenidoCarrito.querySelector(".close").onclick = () => {
        modalCarrito.style.display = "none";
    };
}

document.getElementById("btnCarrito").onclick = () => {
    renderCarrito();
    modalCarrito.style.display = "flex";
};

function modalDetalles(card) {
    const nombre = card.querySelector("h3").textContent;
    const precio = card.querySelector("p").textContent;
    const img = card.querySelector("img").src;

    const modal = document.getElementById("modalDetalles");
    const content = modal.querySelector(".modal-content");

    content.innerHTML = `
        <span class="close">&times;</span>
        <img src="${img}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>${precio}</p>
        <button class="btn-añadir">Añadir al carrito</button>
    `;

    modal.style.display = "flex";

    content.querySelector(".close").onclick = () => {
        modal.style.display = "none";
    };

    content.querySelector(".btn-añadir").onclick = () => {
        añadirProducto(card);
        modal.style.display = "none";
    };
}

const btnUsuario = document.getElementById("btnUsuario");
const modalLogin = document.getElementById("modalLogin");

btnUsuario.onclick = () => {
    modalLogin.style.display = "flex";
};

modalLogin.querySelector(".close").onclick = () => {
    modalLogin.style.display = "none";
};

modalLogin.onclick = e => {
    if (e.target === modalLogin) {
        modalLogin.style.display = "none";
    }
};



const busqueda = document.getElementById("busqueda");

busqueda.addEventListener("input", () => {
    const texto = busqueda.value.toLowerCase();

    document.querySelectorAll(".producto").forEach(p => {
        const nombre = p.querySelector("h3").textContent.toLowerCase();
        p.style.display = nombre.includes(texto) ? "block" : "none";
    });
});




