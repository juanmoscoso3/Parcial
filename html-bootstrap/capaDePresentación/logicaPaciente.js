


const formPaciente = document.getElementById("formPaciente");
const pacienteSelect = document.getElementById("pacienteSelect");
const btnAgregarPaciente = document.getElementById("btnAgregarPaciente");


formPaciente.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (!validarFormularioPaciente()) {
        mostrarNotificacion("Por favor, complete correctamente todos los campos", "error");
        return;
    }

    const nombres = document.getElementById("nombresPaciente").value.trim();
    const apellidos = document.getElementById("apellidosPaciente").value.trim();

    try {
        const paciente = gestionarPacientes.registrarPaciente(nombres, apellidos);
        
        // Actualizar select de pacientes
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = `${paciente.nombres} ${paciente.apellidos}`;
        pacienteSelect.appendChild(option);

        formPaciente.reset();
        btnAgregarPaciente.disabled = true;

        // Limpiar errores
        document.querySelectorAll('#formPaciente .error').forEach(el => el.textContent = '');
        document.querySelectorAll('#formPaciente .error-input').forEach(el => el.classList.remove('error-input'));

        mostrarNotificacion(`Paciente ${paciente.nombres} ${paciente.apellidos} registrado con éxito`);
    } catch (error) {
        mostrarNotificacion(` Error: ${error.message}`, "error");
    }
});