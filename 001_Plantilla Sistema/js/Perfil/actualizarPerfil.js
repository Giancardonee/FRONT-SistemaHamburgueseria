function mostrarModal(mensaje) {
    document.getElementById("mensajeModal").innerText = mensaje;
    document.getElementById("modalMensaje").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalMensaje").style.display = "none";
}

function actualizarDatos() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No se encontró el token en localStorage");
        mostrarModal("Error de autenticación. Vuelve a iniciar sesión.");
        return;
    }

    let usuario = {
        nombre: document.getElementById("txtNombre").value,
        apellido: document.getElementById("txtApellido").value,
        email: document.getElementById("txtCorreo").value,
        telefono: document.getElementById("txtTelefono").value,
    };

    fetch("http://localhost:8080/usuario/perfil/actualizarDatosPersonales", {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error al actualizar los datos.");
        return response.json();
    })
    .then(data => {
        alert("Datos actualizados correctamente.");
        console.log("Respuesta del servidor:", data);
    })
    .catch(error => {
        console.error("Hubo un error:", error);
        alert("Error al actualizar los datos.");
    });
}
