const formMedico = document.getElementById("formMedico");
const medicoSelect = document.getElementById("medicoSelect");
const btnAgregarMedico = document.getElementById("btnAgregarMedico");

formMedico.addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (!validarFormularioMedico()) {
        mostrarNotificacion("Por favor, complete correctamente todos los campos", "error");
        return;
    }

    const nombres = document.getElementById("nombresMedico").value.trim();
    const apellidos = document.getElementById("apellidosMedico").value.trim();
    const especialidad = document.getElementById("especialidadMedico").value;
    const horarioInicio = document.getElementById("horarioInicio").value;
    const horarioFin = document.getElementById("horarioFin").value;
    const añosExperiencia = parseInt(document.getElementById("añosExperiencia").value);
    const bibliografia = document.getElementById("bibliografiaMedico").value.trim();

    // Obtener días seleccionados
    const checkboxesDias = document.querySelectorAll('#diasMedico input[name="dias"]:checked');
    const diasAtencion = Array.from(checkboxesDias).map(cb => parseInt(cb.value));

    try {
        const medico = gestionarMedicos.registrarMedico(
            nombres, 
            apellidos, 
            especialidad, 
            diasAtencion,
            horarioInicio,
            horarioFin,
            añosExperiencia, 
            bibliografia
        );

        const option = document.createElement("option");
        option.value = medico.id;
        option.textContent = `${medico.nombres} ${medico.apellidos} - ${medico.especialidad} (${medico.obtenerDiasTexto()})`;
        medicoSelect.appendChild(option);

        formMedico.reset();
        btnAgregarMedico.disabled = true;

        document.querySelectorAll('#formMedico .error').forEach(el => el.textContent = '');
        document.querySelectorAll('#formMedico .error-input').forEach(el => el.classList.remove('error-input'));

        mostrarNotificacion(`✅ Médico ${medico.nombres} ${medico.apellidos} registrado con éxito`);
    } catch (error) {
        mostrarNotificacion(` Error: ${error.message}`, "error");
    }
});