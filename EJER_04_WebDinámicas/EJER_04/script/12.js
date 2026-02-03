

const cursos = document.querySelectorAll("#lista-cursos .card");

const totalCursos = cursos.length;

if(totalCursos > 0){
document.querySelector("#header-principal .navegacion a:last-child").textContent = 
`Contacto (${totalCursos}) cursos`;
}