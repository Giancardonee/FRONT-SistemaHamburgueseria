document.getElementById("btnCambiarClave").addEventListener("click", function() {
    let claveActual = document.getElementById("txtClaveActual");
    let claveNueva = document.getElementById("txtClaveNueva");
    let confirmarClave = document.getElementById("txtConfirmarClave");

    let errorMsgs = document.querySelectorAll(".error-msg");
    errorMsgs.forEach(msg => msg.textContent = ""); // Limpiar mensajes previos

    let valid = true;

    // Validación de los campos
    if (claveActual.value.trim() === "") {
        claveActual.parentElement.nextElementSibling.textContent = "Ingrese su contraseña actual.";
        valid = false;
    }

    if (claveNueva.value.trim() === "") {
        claveNueva.parentElement.nextElementSibling.textContent = "Ingrese la nueva contraseña.";
        valid = false;
    }

    if (confirmarClave.value.trim() === "") {
        confirmarClave.parentElement.nextElementSibling.textContent = "Confirme su nueva contraseña.";
        valid = false;
    } else if (claveNueva.value !== confirmarClave.value) {
        confirmarClave.parentElement.nextElementSibling.textContent = "Las contraseñas no coinciden.";
        valid = false;
    }

    if (valid) {
        const token = localStorage.getItem("token");
            
        // Si la validación es exitosa, actualizar la contraseña
        let email = document.getElementById("txtCorreo").value.trim();

        // Crear el objeto de datos para la actualización
        let data = {
            email: email,
            passActual: claveActual.value.trim(),
            passNuevo: claveNueva.value.trim()
        };

        // Enviar la solicitud fetch al servidor para actualizar la contraseña
        fetch("http://localhost:8080/usuario/perfil/actualizarPassword", {
            method: "PATCH", // Usamos PATCH para actualizaciones parciales
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                // Si el código de estado no es 2xx, extraemos el mensaje de error
                return response.json().then(errorData => {
                    throw new Error(errorData.message || "Error desconocido");
                });
            }
            return response.json(); // Si la respuesta es exitosa, la convertimos a JSON
        })
        .then(result => {
            alert("Se actualizo la contraseña correctamente.")
            document.getElementById("formCambiarClave").reset(); // Limpia el formulario después del cambio
        })
        .catch(error => {
            // Manejo de errores en la solicitud
            console.error("Error:", error);
            alert(`Hubo un error al actualizar la contraseña: ${error.message}`); // Mostrar el mensaje de error del backend
        });
    }
});
