<<<<<<< HEAD
const boton = document.querySelector("button");


boton.addEventListener("click", (e) =>{
    e.preventDefault();
    const email = document.querySelector("input").value;

    buscarUsuarioJSON(email);



})


async function buscarUsuarioJSON(email) {
    const div = document.getElementById("resultados");
    div.innerHTML = "";


    try{

        const response = await fetch("/data/data/usuarios.json");
        const data = await response.json();
        const usuario = data.find(u => u.email === email);
        if(!usuario){ 
            alert("Usuario no encontrado");
            return;
        } else{

            const responsePedidos = await fetch("/data/data/pedidos.json");
            const dataPedidos = await responsePedidos.json();
            const pedidosUsuario = dataPedidos.filter(p => p.usuarioId 
                === usuario.id); 
             
             if (pedidosUsuario.length > 0) {

            div.innerHTML = `
                <h3>Pedidos del usuario ${usuario.email}</h3>
                <ul>
                    ${pedidosUsuario.map(p => `
                        <li>
                            <strong>ID:</strong> ${p.id} <br>
                            <strong>Fecha:</strong> ${p.fecha} <br>
                            <strong>Estado:</strong> ${p.estado}
                        </li>
                    `).join("")}
                </ul>
            `;
        } else{
                    div.innerHTML = `<p>El usuario ${usuario.email} no
                    tiene pedidos</p>`
                };
        }

    }


    catch(error){
        console.error("Error cargando JSON:", error);
    }  
}
=======
const boton = document.querySelector("button");


boton.addEventListener("click", (e) =>{
    e.preventDefault();
    const email = document.querySelector("input").value;

    buscarUsuarioJSON(email);



})


async function buscarUsuarioJSON(email) {
    const div = document.getElementById("resultados");
    div.innerHTML = "";


    try{

        const response = await fetch("/data/data/usuarios.json");
        const data = await response.json();
        const usuario = data.find(u => u.email === email);
        if(!usuario){ 
            alert("Usuario no encontrado");
            return;
        } else{

            const responsePedidos = await fetch("/data/data/pedidos.json");
            const dataPedidos = await responsePedidos.json();
            const pedidosUsuario = dataPedidos.filter(p => p.usuarioId 
                === usuario.id); 
             
             if (pedidosUsuario.length > 0) {

            div.innerHTML = `
                <h3>Pedidos del usuario ${usuario.email}</h3>
                <ul>
                    ${pedidosUsuario.map(p => `
                        <li>
                            <strong>ID:</strong> ${p.id} <br>
                            <strong>Fecha:</strong> ${p.fecha} <br>
                            <strong>Estado:</strong> ${p.estado}
                        </li>
                    `).join("")}
                </ul>
            `;
        } else{
                    div.innerHTML = `<p>El usuario ${usuario.email} no
                    tiene pedidos</p>`
                };
        }

    }


    catch(error){
        console.error("Error cargando JSON:", error);
    }  
}
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
