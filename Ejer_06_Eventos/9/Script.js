const grid = document.getElementById('cuadricula');

let isDrawing = false;


for( let i = 0; i < 130*120; i++){

    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);

}


grid.addEventListener('mousedown', () => {

    isDrawing = true;

})



grid.addEventListener('mousemove', (event) =>{

    if( !isDrawing ) return;

    if( event.target.classList.contains('cell')){

        event.target.classList.add('relleno');
    }


})


grid.addEventListener('mouseup', () =>{

    isDrawing = false;

})




