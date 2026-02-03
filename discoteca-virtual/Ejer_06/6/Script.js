
const arrastrable = document.querySelector('.arrastrable');

let estaArrastrando = false;



arrastrable.addEventListener('mousedown', function(){

estaArrastrando = true;


})


document.addEventListener('mousemove', function(event){

    if( !estaArrastrando) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    arrastrable.style.left = mouseX + 'px'; 

    arrastrable.style.top = mouseY + 'px';

})


document.addEventListener('mouseup', function(){

    estaArrastrando = false;

})





















