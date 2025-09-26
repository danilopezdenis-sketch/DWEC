const libros = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", paginas: 417 },
  { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", paginas: 863 },
  { id: 3, titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", paginas: 565 },
  { id: 4, titulo: "1984", autor: "George Orwell", paginas: 328 },
  { id: 5, titulo: "El principito", autor: "Antoine de Saint-Exupéry", paginas: 96 },
  { id: 6, titulo: "El alquimista", autor: "Paulo Coelho", paginas: 208 },
  { id: 7, titulo: "Crónica de una muerte anunciada", autor: "Gabriel García Márquez", paginas: 122 },
  { id: 8, titulo: "Ficciones", autor: "Jorge Luis Borges", paginas: 224 },
  { id: 9, titulo: "El nombre de la rosa", autor: "Umberto Eco", paginas: 512 },
  { id: 10, titulo: "La ciudad y los perros", autor: "Mario Vargas Llosa", paginas: 385 }
];



function agregarLibro(nuevoLibro){
    libros.push(nuevoLibro)
}

function obtenerLibros(){
    return libros
}

function buscarLibroPorId(id){

    libros.find(libro => libro.id === id)

}

function eliminarLibro(id){

    const index = libros.findeIndex(libro => libro.id === id)
    if(index !== -1){
        libros.splice(index, 1)
    }

}

function ordenarPorPaginas(){

    libros.sort((a,b) => a.paginas - b.paginas)

}


function hayLibrosLargos(limitePaginas){

    libros.some(libro => libro.paginas > limitePaginas)

}

function todosSonLibrosCortos(limitePaginas){

    libros.every(libro => libro.paginas < limitePaginas)

}


export {agregarLibro, obtenerLibros, buscarLibroPorId, 
    eliminarLibro, ordenarPorPaginas}












