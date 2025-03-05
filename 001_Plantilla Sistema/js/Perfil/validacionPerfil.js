document.getElementById("btnGuardarCambios").addEventListener("click", function () {
    let campos = [
        { id: "txtNombre", errorId: "errorNombre", mensaje: "Por favor complete el nombre." },
        { id: "txtApellido", errorId: "errorApellido", mensaje: "Por favor complete el apellido." },
        { id: "txtTelefono", errorId: "errorTelefono", mensaje: "Por favor complete el teléfono." }
    ];

    let esValido = true;

    campos.forEach(campo => {
        let valor = document.getElementById(campo.id).value.trim();
        document.getElementById(campo.errorId).innerText = valor === "" ? campo.mensaje : "";
        if (valor === "") esValido = false;
    });

    if (esValido) actualizarDatos();
});