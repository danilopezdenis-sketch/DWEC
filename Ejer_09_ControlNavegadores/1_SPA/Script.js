 const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};


const contenido = document.getElementById('contenido')
const enlaces = document.querySelectorAll('nav a');

history.replaceState({ page: "inicio" }, "", "/inicio");
contenido.innerHTML = pages.inicio;


enlaces.forEach(n =>{

n.addEventListener('click', (event) =>{

event.preventDefault();

const page = event.target.dataset.page;


contenido.innerHTML = pages[page];


history.pushState({page }, "", `/${page}`);


});


});



window.addEventListener('popstate', (event) =>{

  if(event.state && event.state.page){

    content.innerHTML = pages[event.state.page];
  } else{

    content.innerHTML = pages.inicio;
  }

})















