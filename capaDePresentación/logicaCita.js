const formCitas = document.getElementById("formCitas");
const tablaCitas = document.getElementById("tablaCitas");
const btnAgregarCita = document.getElementById("btnAgregarCita");

formCitas.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (!validarFormularioCita()) {
        mostrarNotificacion("Por favor, complete correctamente todos los campos", "error");
        return;
    }

    const fecha = document.getElementById("fecha").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const horaFin = document.getElementById("horaFin").value;
    const medicoId = parseInt(document.getElementById("medicoSelect").value);
    const pacienteId = parseInt(document.getElementById("pacienteSelect").value);

    try {
        const medico = gestionarMedicos.buscarMedico(medicoId);
        if (!medico) {
            throw new Error("Médico no encontrado");
        }

        // Validar que el médico atienda ese día
        const fechaObj = new Date(fecha + 'T00:00:00');
        const diaSemana = fechaObj.getDay(); // 0 = Domingo, 1 = Lunes, ...
        
        if (!medico.atiendeDia(diaSemana)) {
            const diasTexto = medico.obtenerDiasTexto();
            mostrarNotificacion(
                ` El médico no atiende ese día. Atiende: ${diasTexto}`,
                "error",
                5000
            );
            return;
        }

        // Validar que la cita esté dentro del horario del médico
        if (horaInicio < medico.horarioInicio || horaFin > medico.horarioFin) {
            mostrarNotificacion(
                ` El médico atiende de ${medico.horarioInicio} a ${medico.horarioFin}`,
                "error",
                5000
            );
            return;
        }

        const cita = gestionarCitas.registrarCita(fecha, horaInicio, horaFin, medicoId, pacienteId);
        
        const filaVacia = document.getElementById("filaVacia");
        if (filaVacia) filaVacia.remove();

        const fila = document.createElement("tr");
        const numCita = tablaCitas.children.length + 1;
        fila.innerHTML = `
            <td>${numCita}</td>
            <td>${cita.fecha}</td>
            <td>${cita.horaInicio}</td>
            <td>${cita.horaFin}</td>
            <td>${cita.medico.nombres} ${cita.medico.apellidos}</td>
            <td>${cita.medico.especialidad}</td>
            <td>${cita.paciente.nombres} ${cita.paciente.apellidos}</td>
        `;
        tablaCitas.appendChild(fila);

        formCitas.reset();
        btnAgregarCita.disabled = true;

        document.querySelectorAll('#formCitas .error').forEach(el => el.textContent = '');
        document.querySelectorAll('#formCitas .error-input').forEach(el => el.classList.remove('error-input'));

        mostrarNotificacion("✅ Cita registrada con éxito");
    } catch (error) {
        mostrarNotificacion(` Error: ${error.message}`, "error");
    }
});