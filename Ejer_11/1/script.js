<<<<<<< HEAD
// ===============================
// Obtener datos de un archivo JSON
// ===============================
var xhr = new XMLHttpRequest();
xhr.open("GET", "user_data.json", true);

xhr.onload = function() {
    if (xhr.status === 200) {
        var datos = JSON.parse(xhr.responseText);
        console.log("Datos cargados:", datos);

        const perfilDiv = document.getElementById('user-profile');

        // Generamos los inputs con los datos del JSON
        perfilDiv.innerHTML = `
          <h2>Información Personal</h2>
          <label>Nombre:
            <input type="text" id="firstName" value="${datos.personalInfo.firstName}" disabled>
          </label><br>
          <label>Apellidos:
            <input type="text" id="lastName" value="${datos.personalInfo.lastName}" disabled>
          </label><br>
          <label>Email:
            <input type="email" id="email" value="${datos.personalInfo.email}" disabled>
          </label><br>
          <label>Teléfono:
            <input type="text" id="phone" value="${datos.personalInfo.phone}" disabled>
          </label>

          <h3>Dirección</h3>
          <label>Calle:
            <input type="text" id="street" value="${datos.address.street}" disabled>
          </label><br>
          <label>Ciudad:
            <input type="text" id="city" value="${datos.address.city}" disabled>
          </label><br>
          <label>Código Postal:
            <input type="text" id="zipCode" value="${datos.address.zipCode}" disabled>
          </label><br>
          <label>País:
            <input type="text" id="country" value="${datos.address.country}" disabled>
          </label>

          <h3>Preferencias</h3>
          <label>Tema:
            <select id="theme" disabled>
              <option value="light" ${datos.preferences.theme === "light" ? "selected" : ""}>Claro</option>
              <option value="dark" ${datos.preferences.theme === "dark" ? "selected" : ""}>Oscuro</option>
            </select>
          </label><br>
          <label>Notificaciones:
            <input type="checkbox" id="notifications" ${datos.preferences.notifications ? "checked" : ""} disabled>
          </label><br>
          <label>Idioma:
            <input type="text" id="language" value="${datos.preferences.language}" disabled>
          </label>

          <h3>Hobbies</h3>
          <ul id="hobbies-list">
            ${datos.hobbies.map((hobby, index) => `
              <li>
                <input type="text" id="hobby-${index}" value="${hobby}" disabled>
              </li>
            `).join('')}
          </ul>
        `;

        // ===============================
        // Configuramos botón editar/guardar
        // ===============================
        const editar = document.getElementById('editar');
        const inputs = document.querySelectorAll('#user-profile input, #user-profile select');

        editar.addEventListener('click', function() {
            if (editar.textContent === "Editar") {
                // Activar edición
                editar.textContent = "Guardar cambios";
                inputs.forEach(input => input.disabled = false);
            } else {
                // Guardar cambios: crear objeto con los valores actuales
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;

                const street = document.getElementById('street').value;
                const city = document.getElementById('city').value;
                const zipCode = document.getElementById('zipCode').value;
                const country = document.getElementById('country').value;

                const theme = document.getElementById('theme').value;
                const notifications = document.getElementById('notifications').checked;
                const language = document.getElementById('language').value;

                const hobbiesList = Array.from(document.querySelectorAll('#hobbies-list input'))
                                         .map(input => input.value);

                const datosActualizados = {
                    personalInfo: { firstName, lastName, email, phone },
                    address: { street, city, zipCode, country },
                    preferences: { theme, notifications, language },
                    hobbies: hobbiesList
                };

                // ===============================
                // Enviar POST con XMLHttpRequest
                // ===============================
                editar.disabled = true; // deshabilitar botón mientras se hace el POST

                var xhrPost = new XMLHttpRequest();
                xhrPost.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/TU-ID", true);
                xhrPost.setRequestHeader("Content-Type", "application/json");

                xhrPost.onload = function() {
                    if (xhrPost.status >= 200 && xhrPost.status < 300) {
                        console.log("Éxito en respuesta POST");

                        // Volver a deshabilitar inputs y cambiar texto del botón
                        inputs.forEach(input => input.disabled = true);
                        editar.textContent = "Editar";
                        editar.disabled = false;
                        alert("Cambios guardados correctamente!");
                    } else {
                        console.error("Error en respuesta POST");
                        editar.disabled = false;
                        alert("Error al guardar cambios.");
                    }
                };

                xhrPost.onerror = function() {
                    console.error("Error de red en POST");
                    editar.disabled = false;
                    alert("Error de red al guardar cambios.");
                };

                xhrPost.send(JSON.stringify(datosActualizados));
            }
        });

    } else {
        console.error("Error al cargar el archivo JSON:", xhr.status);
        alert("No se pudo cargar el JSON");
    }
};

xhr.onerror = function() {
    console.error("Error de red al cargar JSON");
    alert("No se pudo cargar el JSON (error de red)");
};

xhr.send();
=======
// ===============================
// Obtener datos de un archivo JSON
// ===============================
var xhr = new XMLHttpRequest();
xhr.open("GET", "user_data.json", true);

xhr.onload = function() {
    if (xhr.status === 200) {
        var datos = JSON.parse(xhr.responseText);
        console.log("Datos cargados:", datos);

        const perfilDiv = document.getElementById('user-profile');

        // Generamos los inputs con los datos del JSON
        perfilDiv.innerHTML = `
          <h2>Información Personal</h2>
          <label>Nombre:
            <input type="text" id="firstName" value="${datos.personalInfo.firstName}" disabled>
          </label><br>
          <label>Apellidos:
            <input type="text" id="lastName" value="${datos.personalInfo.lastName}" disabled>
          </label><br>
          <label>Email:
            <input type="email" id="email" value="${datos.personalInfo.email}" disabled>
          </label><br>
          <label>Teléfono:
            <input type="text" id="phone" value="${datos.personalInfo.phone}" disabled>
          </label>

          <h3>Dirección</h3>
          <label>Calle:
            <input type="text" id="street" value="${datos.address.street}" disabled>
          </label><br>
          <label>Ciudad:
            <input type="text" id="city" value="${datos.address.city}" disabled>
          </label><br>
          <label>Código Postal:
            <input type="text" id="zipCode" value="${datos.address.zipCode}" disabled>
          </label><br>
          <label>País:
            <input type="text" id="country" value="${datos.address.country}" disabled>
          </label>

          <h3>Preferencias</h3>
          <label>Tema:
            <select id="theme" disabled>
              <option value="light" ${datos.preferences.theme === "light" ? "selected" : ""}>Claro</option>
              <option value="dark" ${datos.preferences.theme === "dark" ? "selected" : ""}>Oscuro</option>
            </select>
          </label><br>
          <label>Notificaciones:
            <input type="checkbox" id="notifications" ${datos.preferences.notifications ? "checked" : ""} disabled>
          </label><br>
          <label>Idioma:
            <input type="text" id="language" value="${datos.preferences.language}" disabled>
          </label>

          <h3>Hobbies</h3>
          <ul id="hobbies-list">
            ${datos.hobbies.map((hobby, index) => `
              <li>
                <input type="text" id="hobby-${index}" value="${hobby}" disabled>
              </li>
            `).join('')}
          </ul>
        `;

        // ===============================
        // Configuramos botón editar/guardar
        // ===============================
        const editar = document.getElementById('editar');
        const inputs = document.querySelectorAll('#user-profile input, #user-profile select');

        editar.addEventListener('click', function() {
            if (editar.textContent === "Editar") {
                // Activar edición
                editar.textContent = "Guardar cambios";
                inputs.forEach(input => input.disabled = false);
            } else {
                // Guardar cambios: crear objeto con los valores actuales
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;

                const street = document.getElementById('street').value;
                const city = document.getElementById('city').value;
                const zipCode = document.getElementById('zipCode').value;
                const country = document.getElementById('country').value;

                const theme = document.getElementById('theme').value;
                const notifications = document.getElementById('notifications').checked;
                const language = document.getElementById('language').value;

                const hobbiesList = Array.from(document.querySelectorAll('#hobbies-list input'))
                                         .map(input => input.value);

                const datosActualizados = {
                    personalInfo: { firstName, lastName, email, phone },
                    address: { street, city, zipCode, country },
                    preferences: { theme, notifications, language },
                    hobbies: hobbiesList
                };

                // ===============================
                // Enviar POST con XMLHttpRequest
                // ===============================
                editar.disabled = true; // deshabilitar botón mientras se hace el POST

                var xhrPost = new XMLHttpRequest();
                xhrPost.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/TU-ID", true);
                xhrPost.setRequestHeader("Content-Type", "application/json");

                xhrPost.onload = function() {
                    if (xhrPost.status >= 200 && xhrPost.status < 300) {
                        console.log("Éxito en respuesta POST");

                        // Volver a deshabilitar inputs y cambiar texto del botón
                        inputs.forEach(input => input.disabled = true);
                        editar.textContent = "Editar";
                        editar.disabled = false;
                        alert("Cambios guardados correctamente!");
                    } else {
                        console.error("Error en respuesta POST");
                        editar.disabled = false;
                        alert("Error al guardar cambios.");
                    }
                };

                xhrPost.onerror = function() {
                    console.error("Error de red en POST");
                    editar.disabled = false;
                    alert("Error de red al guardar cambios.");
                };

                xhrPost.send(JSON.stringify(datosActualizados));
            }
        });

    } else {
        console.error("Error al cargar el archivo JSON:", xhr.status);
        alert("No se pudo cargar el JSON");
    }
};

xhr.onerror = function() {
    console.error("Error de red al cargar JSON");
    alert("No se pudo cargar el JSON (error de red)");
};

xhr.send();
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
