const radios = document.querySelectorAll('input[type="radio"][name="tamaño"]');
const checkboxes = document.querySelectorAll('input[type="checkbox"][name="ingrediente"]');
const precio = document.getElementById('Precio');
const select = document.querySelector('select')

radios.forEach(radio => {

    radio.addEventListener('change', actualizarPrecio);

})



checkboxes.forEach(check => {

check.addEventListener('change', actualizarPrecio);

})


select.addEventListener('change', actualizarPrecio);


function actualizarPrecio(){
let total = 0;

  const radioSeleccionado = document.querySelector('input[name="tamaño"]:checked');
    if(radioSeleccionado){
        total += parseFloat(radioSeleccionado.value);
    }


checkboxes.forEach(check => {

    if(check.checked){
        total += parseFloat(check.value);
    }
})

const opcionSeleccionada = select.options[select.selectedIndex];

total += parseFloat(opcionSeleccionada.value);

precio.textContent = `El precio total es: ${total}`;


}

actualizarPrecio();









