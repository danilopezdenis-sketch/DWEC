const estudiantes =[]
estudiantes.push({nombre : "Daniel", apellidos : "López", calificacion : 10,
    aprobado : true},{nombre : "Juan", apellidos : "Martínez", calificacion : 7,
    aprobado : true},{nombre : "Pepe", apellidos : "Juarez", calificacion : 4,
    aprobado : true})



const estudiantesId = estudiantes.map((estudiante, index) => { 

return {
    ...estudiante,
    id: index + 1

}

})

console.log(estudiantesId)


const estudiantesAprobados = estudiantes.filter(estudiantes => 
    estudiantes.calificacion >= 5)


estudiantesAprobados.forEach(estudiantes => {

    console.log(`¡Felicidades ${estudiantes.nombre}
        , has aprobado con ${estudiantes}!`)

}
)

estudiantes.forEach(estudiantes =>{

    const aprobadoReal = estudiantes.calificacion >=5

    if(estudiantes.aprobado != aprobadoReal){

    console.warn(`⚠️ Incoherencia en el registro de 
        ${estudiantes.nombre}: calificación = ${calificacion}, aprobado = ${estudiantes.aprobado}`)
    }



}

)


