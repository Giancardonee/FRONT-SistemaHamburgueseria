document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No se encontró el token en localStorage");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/usuario/perfil", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Enviar el token
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("No se pudo cargar el perfil del usuario");
        }

        const data = await response.json();
        console.log("Perfil del usuario:", data);

        // Actualizar los elementos de la página con los datos obtenidos
        document.getElementById("userName").textContent = data.nombre + " " + data.apellido;
        document.getElementById("txtNombre").value = data.nombre;
        document.getElementById("txtApellido").value = data.apellido;
        document.getElementById("txtCorreo").value = data.email;
        document.getElementById("txtTelefono").value = data.telefono;
        document.getElementById("txtRol").value = data.rol;

    } catch (error) {
        console.error("Error al obtener el perfil:", error.message);
    }
    });