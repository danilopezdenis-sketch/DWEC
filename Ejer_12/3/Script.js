<<<<<<< HEAD
const form = document.getElementById("formProducto");
const btnGuardar = document.getElementById("btnGuardar");
const skuInput = form.elements["sku"];

let skuDisponible = false;

skuInput.addEventListener("blur", async () => {
    const sku = skuInput.value.trim();
    const status = document.getElementById("sku-status");
    const errSku = document.getElementById("err-sku");

    errSku.textContent = "";
    status.textContent = "";

    if (sku.length < 5) {
        errSku.textContent = "El SKU debe tener al menos 5 caracteres.";
        skuDisponible = false;
        validarFormulario();
        return;
    }

    status.textContent = "Comprobando disponibilidad...";

    const response = await fetch("/data/data/productos.json");
    const productos = await response.json();

    const existe = productos.some(p => p.sku === sku);

    if (existe) {
        errSku.textContent = "El SKU ya existe";
        skuDisponible = false;
    } else {
        status.textContent = "SKU disponible";
        skuDisponible = true;
    }

    validarFormulario();
});


form.addEventListener("input", validarFormulario);

function validarFormulario() {
    const datos = Object.fromEntries(new FormData(form));
    let valido = true;

    document.getElementById("err-nombre").textContent =
        datos.nombre.trim() ? "" : "El nombre es obligatorio";
    if (!datos.nombre.trim()) valido = false;

    document.getElementById("err-precio").textContent =
        datos.precio > 0 ? "" : "El precio debe ser mayor a 0";
    if (!(datos.precio > 0)) valido = false;

    document.getElementById("err-stock").textContent =
        datos.stock >= 0 ? "" : "El stock debe ser 0 o mayor";
    if (!(datos.stock >= 0)) valido = false;

    document.getElementById("err-categoria").textContent =
        datos.categoria.trim() ? "" : "La categoría es obligatoria";
    if (!datos.categoria.trim()) valido = false;

    if (datos.sku.length < 5) valido = false;
    if (!skuDisponible) valido = false;

    btnGuardar.disabled = !valido;
}
=======
const form = document.getElementById("formProducto");
const btnGuardar = document.getElementById("btnGuardar");
const skuInput = form.elements["sku"];

let skuDisponible = false;

skuInput.addEventListener("blur", async () => {
    const sku = skuInput.value.trim();
    const status = document.getElementById("sku-status");
    const errSku = document.getElementById("err-sku");

    errSku.textContent = "";
    status.textContent = "";

    if (sku.length < 5) {
        errSku.textContent = "El SKU debe tener al menos 5 caracteres.";
        skuDisponible = false;
        validarFormulario();
        return;
    }

    status.textContent = "Comprobando disponibilidad...";

    const response = await fetch("/data/data/productos.json");
    const productos = await response.json();

    const existe = productos.some(p => p.sku === sku);

    if (existe) {
        errSku.textContent = "El SKU ya existe";
        skuDisponible = false;
    } else {
        status.textContent = "SKU disponible";
        skuDisponible = true;
    }

    validarFormulario();
});


form.addEventListener("input", validarFormulario);

function validarFormulario() {
    const datos = Object.fromEntries(new FormData(form));
    let valido = true;

    document.getElementById("err-nombre").textContent =
        datos.nombre.trim() ? "" : "El nombre es obligatorio";
    if (!datos.nombre.trim()) valido = false;

    document.getElementById("err-precio").textContent =
        datos.precio > 0 ? "" : "El precio debe ser mayor a 0";
    if (!(datos.precio > 0)) valido = false;

    document.getElementById("err-stock").textContent =
        datos.stock >= 0 ? "" : "El stock debe ser 0 o mayor";
    if (!(datos.stock >= 0)) valido = false;

    document.getElementById("err-categoria").textContent =
        datos.categoria.trim() ? "" : "La categoría es obligatoria";
    if (!datos.categoria.trim()) valido = false;

    if (datos.sku.length < 5) valido = false;
    if (!skuDisponible) valido = false;

    btnGuardar.disabled = !valido;
}
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
