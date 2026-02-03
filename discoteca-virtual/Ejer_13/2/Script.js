const API_URL = "https://crudcrud.com/api/3a5bef0bb25f44b189979a50d5f0771e/users";

function validateForm(data) {
    let valid = true;

    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    if (data.firstName.trim() === "") {
        document.getElementById("error-firstName").textContent = "El nombre es obligatorio";
        valid = false;
    }
    if (data.lastName.trim() === "") {
        document.getElementById("error-lastName").textContent = "El apellido es obligatorio";
        valid = false;
    }
    if (!data.email.includes("@")) {
        document.getElementById("error-email").textContent = "Email inválido";
        valid = false;
    }
    try {
        new URL(data.picture);
        
    } catch {
        document.getElementById("error-picture").textContent = "URL inválida";
        valid = false;
    }

    return valid;
}


function setLoading(state) {
    document.getElementById("loading").style.display = state ? "block" : "none";
    document.getElementById("submitBtn").disabled = state;
}

function showMessage(msg) {
    const m = document.getElementById("message");
    m.textContent = msg;
    setTimeout(() => m.textContent = "", 2000);
}




async function displayUsers() {
    setLoading(true);
    try {
        const res = await fetch(API_URL);
        const users = await res.json();
        renderUsers(users);
    } catch {
        showMessage("Error al obtener usuarios");
    }
    setLoading(false);
}


function renderUsers(users) {
    const filter = document.getElementById("searchInput").value.toLowerCase();
    const filtered = users.filter(u =>
        u.firstName.toLowerCase().includes(filter) ||
        u.lastName.toLowerCase().includes(filter)
    );

    const tbody = document.getElementById("userList");
    tbody.innerHTML = "";

    filtered.forEach(user => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td><img src="${user.picture}" width="50"></td>
            <td>
                <button onclick="editUser('${user._id}')">Editar</button>
                <button onclick="deleteUser('${user._id}')">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}



async function addUser(userData) {
    if (!validateForm(userData)) return;


    const tempUser = { ...userData, _id: "temp-" + Date.now() };
    renderUsers([tempUser]);  

    setLoading(true);
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        showMessage("Usuario añadido");
        displayUsers();
    } catch {
        showMessage("Error al añadir usuario");
    }
    setLoading(false);
}


async function deleteUser(id) {
    const row = document.querySelector(`button[onclick="deleteUser('${id}')"]`).parentNode.parentNode;
    const backupRow = row.cloneNode(true);
    row.remove();

    setLoading(true);
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        showMessage("Usuario eliminado");
    } catch {
        showMessage("Error al eliminar");
        document.getElementById("userList").appendChild(backupRow);
    }
    setLoading(false);
}




let editingUserId = null;

function editUser(id) {
    editingUserId = id;

    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById("firstName").value = user.firstName;
            document.getElementById("lastName").value = user.lastName;
            document.getElementById("email").value = user.email;
            document.getElementById("picture").value = user.picture;
        });
}

async function updateUser(data) {
    if (!validateForm(data)) return;

    setLoading(true);
    try {
        await fetch(`${API_URL}/${editingUserId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        showMessage("Usuario actualizado");
        displayUsers();
    } catch {
        showMessage("Error al actualizar");
    }
    setLoading(false);
    editingUserId = null;
}



document.getElementById("userForm").addEventListener("submit", e => {
    e.preventDefault();

    
    const data = {
    
    
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        picture: picture.value
    
    
    };



    if (editingUserId) updateUser(data);
    else addUser(data);


});

document.getElementById("searchInput").addEventListener("input", displayUsers);


displayUsers();
