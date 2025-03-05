document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que el formulario se recargue

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const requestBody = {
        email: email,
        contrasena: password
    };

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            if (response.status === 401) throw new Error("Credenciales incorrectas, intenta nuevamente.");
            if (response.status === 403) throw new Error("Acceso denegado. Verifica tu cuenta.");
            throw new Error("Error en el inicio de sesión.");
        }

        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error("Error al procesar la respuesta del servidor.");
        }

        if (data.token) {
            localStorage.setItem("token", data.token); // Guardar token en localStorage
            window.location.href = "Index.html"; // Redirige al usuario
        } else {
            throw new Error("Token no recibido, error en la autenticación.");
        }

    } catch (error) {
        document.getElementById("error-message").innerText = error.message;
        document.getElementById("error-message").style.display = "block";
        console.error("Error:", error.message);
    }
});
