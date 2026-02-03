<<<<<<< HEAD
const API_URL = "https://crudcrud.com/api/3a5bef0bb25f44b189979a50d5f0771e/users";

   
document.getElementById("btnIniciales").addEventListener("click", uploadInitialUsers);

function uploadInitialUsers() {
  fetch("usuarios.json")
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {

        fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        })
        .then(() => displayUsers())
        .catch(err => console.error("Error en POST inicial:", err));
      });
    })
    .catch(err => console.error("Error leyendo usuarios.json:", err));
}


function displayUsers() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("userList");
      tbody.innerHTML = "";

      data.forEach(user => {
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
    })
    .catch(err => console.error("Error en GET:", err));
}

displayUsers();

  
document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const newUser = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    picture: picture.value
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })
  .then(() => {
    displayUsers();
    e.target.reset();
  })
  .catch(err => console.error("Error en POST:", err));
});


function deleteUser(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => displayUsers())
    .catch(err => console.error("Error en DELETE:", err));
}

let userEditingId = null;

function editUser(id) {
  userEditingId = id;

  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(user => {
      firstName.value = user.firstName;
      lastName.value = user.lastName;
      email.value = user.email;
      picture.value = user.picture;
    })
    .catch(err => console.error("Error obteniendo usuario:", err));
}


document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    picture: picture.value
  };

  if (userEditingId) {
    fetch(`${API_URL}/${userEditingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    .then(() => {
      userEditingId = null;
      displayUsers();
      e.target.reset();
    })
    .catch(err => console.error("Error en PUT:", err));

  }   else {


    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    .then(() => {
      displayUsers();
      e.target.reset();
    })
    .catch(err => console.error("Error en POST:", err));
  }
});


=======
const API_URL = "https://crudcrud.com/api/3a5bef0bb25f44b189979a50d5f0771e/users";

   
document.getElementById("btnIniciales").addEventListener("click", uploadInitialUsers);

function uploadInitialUsers() {
  fetch("usuarios.json")
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {

        fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        })
        .then(() => displayUsers())
        .catch(err => console.error("Error en POST inicial:", err));
      });
    })
    .catch(err => console.error("Error leyendo usuarios.json:", err));
}


function displayUsers() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("userList");
      tbody.innerHTML = "";

      data.forEach(user => {
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
    })
    .catch(err => console.error("Error en GET:", err));
}

displayUsers();

  
document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const newUser = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    picture: picture.value
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })
  .then(() => {
    displayUsers();
    e.target.reset();
  })
  .catch(err => console.error("Error en POST:", err));
});


function deleteUser(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => displayUsers())
    .catch(err => console.error("Error en DELETE:", err));
}

let userEditingId = null;

function editUser(id) {
  userEditingId = id;

  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(user => {
      firstName.value = user.firstName;
      lastName.value = user.lastName;
      email.value = user.email;
      picture.value = user.picture;
    })
    .catch(err => console.error("Error obteniendo usuario:", err));
}


document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    picture: picture.value
  };

  if (userEditingId) {
    fetch(`${API_URL}/${userEditingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    .then(() => {
      userEditingId = null;
      displayUsers();
      e.target.reset();
    })
    .catch(err => console.error("Error en PUT:", err));

  }   else {


    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    .then(() => {
      displayUsers();
      e.target.reset();
    })
    .catch(err => console.error("Error en POST:", err));
  }
});


>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
