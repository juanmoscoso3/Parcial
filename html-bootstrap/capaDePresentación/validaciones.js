


// FUNCIONES REUTILIZABLES DE VALIDACIÓN

function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('error-input');
    return true;
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    const valor = campo.value.trim();
    if (valor.length < min || valor.length > max) {
        errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('error-input');
    return true;
}

function validarSelect(campo, errorElement, mensaje) {
    if (campo.value === '' || campo.value === null) {
        errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('error-input');
    return true;
}

function validarNumero(campo, errorElement, min, max, mensaje) {
    const valor = parseInt(campo.value);
    if (isNaN(valor) || valor < min || valor > max) {
        errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('error-input');
    return true;
}

function validarHoras(horaInicio, horaFin, errorElement, mensaje) {
    if (horaInicio.value && horaFin.value) {
        if (horaFin.value <= horaInicio.value) {
            errorElement.textContent = mensaje;
            horaFin.classList.add('error-input');
            return false;
        }
        errorElement.textContent = '';
        horaFin.classList.remove('error-input');
        return true;
    }
    return true;
}

//  Validar que solo contenga letras y espacios
function validarSoloLetras(campo, errorElement, mensaje) {
    const valor = campo.value.trim();
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (valor !== '' && !regex.test(valor)) {
        errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    }
    if (valor === '') {
        errorElement.textContent = '';
        campo.classList.remove('error-input');
        return true;
    }
    errorElement.textContent = '';
    campo.classList.remove('error-input');
    return true;
}

//  Validar que la fecha no sea anterior a hoy
function validarFechaFutura(campo, errorElement, mensaje) {
    if (!campo.value) return true;
    
    const fechaSeleccionada = new Date(campo.value + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
        errorElement.textContent = mensaje;
        campo.classList.add('error-input');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('error-input');
    return true;
}

//  Validar que la cita esté dentro del horario del médico
function validarHorarioMedico(horaInicio, horaFin, medicoId, errorElement, mensaje) {
    if (!horaInicio.value || !horaFin.value || !medicoId) return true;
    
    const medico = gestionarMedicos.buscarMedico(parseInt(medicoId));
    if (!medico) return true;
    
    if (horaInicio.value < medico.horarioInicio || horaFin.value > medico.horarioFin) {
        errorElement.textContent = `${mensaje} (${medico.horarioInicio} - ${medico.horarioFin})`;
        errorElement.classList.add('error-input');
        return false;
    }
    errorElement.textContent = '';
    errorElement.classList.remove('error-input');
    return true;
}


// VALIDACIÓN COMPLETA DE FORMULARIOS 


function validarFormularioMedico() {
    const nombres = document.getElementById('nombresMedico');
    const apellidos = document.getElementById('apellidosMedico');
    const especialidad = document.getElementById('especialidadMedico');
    const horarioInicio = document.getElementById('horarioInicio');
    const horarioFin = document.getElementById('horarioFin');
    const experiencia = document.getElementById('añosExperiencia');
    const bibliografia = document.getElementById('bibliografiaMedico');

    const errorNombres = document.getElementById('errorNombresMedico');
    const errorApellidos = document.getElementById('errorApellidosMedico');
    const errorEspecialidad = document.getElementById('errorEspecialidadMedico');
    const errorDias = document.getElementById('errorDiasMedico');
    const errorHorarioInicio = document.getElementById('errorHorarioInicio');
    const errorHorarioFin = document.getElementById('errorHorarioFin');
    const errorExperiencia = document.getElementById('errorAñosExperiencia');
    const errorBibliografia = document.getElementById('errorBibliografiaMedico');

    const nombresValidos = validarLongitud(nombres, errorNombres, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres') 
                         && validarSoloLetras(nombres, errorNombres, 'Los nombres solo pueden contener letras');
    const apellidosValidos = validarLongitud(apellidos, errorApellidos, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres')
                           && validarSoloLetras(apellidos, errorApellidos, 'Los apellidos solo pueden contener letras');
    const especialidadValida = validarSelect(especialidad, errorEspecialidad, 'La especialidad es obligatoria');

    // Validar días
    const diasSeleccionados = document.querySelectorAll('#diasMedico input[name="dias"]:checked');
    let diasValidos = true;
    if (diasSeleccionados.length === 0) {
        errorDias.textContent = 'Debe seleccionar al menos un día de atención';
        diasValidos = false;
    } else {
        errorDias.textContent = '';
    }

    const horarioInicioValido = validarCampoObligatorio(horarioInicio, errorHorarioInicio, 'La hora de inicio del horario es obligatoria');
    const horarioFinValido = validarCampoObligatorio(horarioFin, errorHorarioFin, 'La hora de fin del horario es obligatoria');
    const experienciaValida = validarNumero(experiencia, errorExperiencia, 0, 60, 'Los años de experiencia deben ser entre 0 y 60');
    const bibliografiaValida = validarLongitud(bibliografia, errorBibliografia, 0, 500, 'La bibliografía no puede exceder 500 caracteres');

    let horarioCoherente = true;
    if (horarioInicio.value && horarioFin.value && horarioFin.value <= horarioInicio.value) {
        errorHorarioFin.textContent = 'La hora de fin debe ser mayor a la hora de inicio';
        horarioFin.classList.add('error-input');
        horarioCoherente = false;
    }

    return nombresValidos && apellidosValidos && especialidadValida && diasValidos &&
           horarioInicioValido && horarioFinValido && horarioCoherente &&
           experienciaValida && bibliografiaValida;
}

function validarFormularioPaciente() {
    const nombres = document.getElementById('nombresPaciente');
    const apellidos = document.getElementById('apellidosPaciente');
    const errorNombres = document.getElementById('errorNombresPaciente');
    const errorApellidos = document.getElementById('errorApellidosPaciente');

    const nombresValidos = validarLongitud(nombres, errorNombres, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres')
                         && validarSoloLetras(nombres, errorNombres, 'Los nombres solo pueden contener letras');
    const apellidosValidos = validarLongitud(apellidos, errorApellidos, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres')
                           && validarSoloLetras(apellidos, errorApellidos, 'Los apellidos solo pueden contener letras');

    return nombresValidos && apellidosValidos;
}

function validarFormularioCita() {
    const medicoSelect = document.getElementById('medicoSelect');
    const pacienteSelect = document.getElementById('pacienteSelect');
    const horaInicio = document.getElementById('horaInicio');
    const horaFin = document.getElementById('horaFin');
    const fecha = document.getElementById('fecha');

    const errorMedico = document.getElementById('errorMedicoSelect');
    const errorPaciente = document.getElementById('errorPacienteSelect');
    const errorHoras = document.getElementById('errorHoras');
    const errorFecha = document.getElementById('errorFecha');
    const errorHoraInicio = document.getElementById('errorHoraInicio');
    const errorHoraFin = document.getElementById('errorHoraFin');

    const medicoValido = validarSelect(medicoSelect, errorMedico, 'Debe seleccionar un médico');
    const pacienteValido = validarSelect(pacienteSelect, errorPaciente, 'Debe seleccionar un paciente');
    const fechaValida = validarCampoObligatorio(fecha, errorFecha, 'La fecha es obligatoria')
                     && validarFechaFutura(fecha, errorFecha, 'La fecha no puede ser anterior a hoy');
    const horaInicioValida = validarCampoObligatorio(horaInicio, errorHoraInicio, 'La hora de inicio es obligatoria');
    const horaFinValida = validarCampoObligatorio(horaFin, errorHoraFin, 'La hora de fin es obligatoria');

    let horasValidas = true;
    if (horaInicioValida && horaFinValida) {
        horasValidas = validarHoras(horaInicio, horaFin, errorHoras, 'La hora de fin debe ser mayor a la hora de inicio');
    }

    // Validar horario y día del médico
    let citaValidaConMedico = true;
    if (medicoValido && fechaValida && horaInicioValida && horaFinValida) {
        citaValidaConMedico = validarCitaConMedico(
            fecha, horaInicio, horaFin, medicoSelect.value, errorHoras
        );
    }

    return medicoValido && pacienteValido && fechaValida && 
           horaInicioValida && horaFinValida && horasValidas && citaValidaConMedico;
}
// Valida que el día y la hora de la cita coincidan con el médico
function validarCitaConMedico(fecha, horaInicio, horaFin, medicoId, errorElement) {
    if (!fecha.value || !horaInicio.value || !horaFin.value || !medicoId) return true;
    
    const medico = gestionarMedicos.buscarMedico(parseInt(medicoId));
    if (!medico) return true;

    // Validar día
    const fechaObj = new Date(fecha.value + 'T00:00:00');
    const diaSemana = fechaObj.getDay();
    
    if (!medico.atiendeDia(diaSemana)) {
        errorElement.textContent = `El médico no atiende ese día. Atiende: ${medico.obtenerDiasTexto()}`;
        errorElement.classList.add('error-input');
        return false;
    }

    // Validar horario
    if (horaInicio.value < medico.horarioInicio || horaFin.value > medico.horarioFin) {
        errorElement.textContent = `La cita debe estar dentro del horario del médico (${medico.horarioInicio} - ${medico.horarioFin})`;
        errorElement.classList.add('error-input');
        return false;
    }

    errorElement.textContent = '';
    errorElement.classList.remove('error-input');
    return true;
}

// VALIDACIÓN SILENCIOSA 

function esFormularioMedicoValido() {
    const nombres = document.getElementById('nombresMedico').value.trim();
    const apellidos = document.getElementById('apellidosMedico').value.trim();
    const especialidad = document.getElementById('especialidadMedico').value;
    const horarioInicio = document.getElementById('horarioInicio').value;
    const horarioFin = document.getElementById('horarioFin').value;
    const experiencia = document.getElementById('añosExperiencia').value;
    const bibliografia = document.getElementById('bibliografiaMedico').value.trim();

    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

    if (nombres.length < 2 || nombres.length > 50) return false;
    if (!regexLetras.test(nombres)) return false;
    if (apellidos.length < 2 || apellidos.length > 50) return false;
    if (!regexLetras.test(apellidos)) return false;
    if (especialidad === '') return false;

    // Validar al menos un día seleccionado
    const diasSeleccionados = document.querySelectorAll('#diasMedico input[name="dias"]:checked');
    if (diasSeleccionados.length === 0) return false;

    if (horarioInicio === '' || horarioFin === '') return false;
    if (horarioFin <= horarioInicio) return false;
    const expNum = parseInt(experiencia);
    if (isNaN(expNum) || expNum < 0 || expNum > 60) return false;
    if (bibliografia.length > 500) return false;

    return true;
}

function esFormularioPacienteValido() {
    const nombres = document.getElementById('nombresPaciente').value.trim();
    const apellidos = document.getElementById('apellidosPaciente').value.trim();
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

    if (nombres.length < 2 || nombres.length > 50) return false;
    if (!regexLetras.test(nombres)) return false;
    if (apellidos.length < 2 || apellidos.length > 50) return false;
    if (!regexLetras.test(apellidos)) return false;

    return true;
}

function esFormularioCitaValido() {
    const fecha = document.getElementById('fecha').value;
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;
    const medico = document.getElementById('medicoSelect').value;
    const paciente = document.getElementById('pacienteSelect').value;

    if (fecha === '') return false;
    
    const fechaSel = new Date(fecha + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaSel < hoy) return false;

    if (horaInicio === '' || horaFin === '') return false;
    if (horaFin <= horaInicio) return false;
    if (medico === '') return false;
    if (paciente === '') return false;

    const medicoObj = gestionarMedicos.buscarMedico(parseInt(medico));
    if (medicoObj) {
        // Validar día
        const diaSemana = fechaSel.getDay();
        if (!medicoObj.atiendeDia(diaSemana)) return false;
        
        // Validar horario
        if (horaInicio < medicoObj.horarioInicio || horaFin > medicoObj.horarioFin) return false;
    }

    return true;
}


//  ACTUALIZACIÓN DE BOTONES

function actualizarBotonMedico() {
    const btn = document.getElementById('btnAgregarMedico');
    if (btn) btn.disabled = !esFormularioMedicoValido();
}

function actualizarBotonPaciente() {
    const btn = document.getElementById('btnAgregarPaciente');
    if (btn) btn.disabled = !esFormularioPacienteValido();
}

function actualizarBotonCita() {
    const btn = document.getElementById('btnAgregarCita');
    if (btn) btn.disabled = !esFormularioCitaValido();
}


//  SISTEMA DE "CAMPOS TOCADOS"


const camposTocados = {};

function marcarComoTocado(idCampo) {
    camposTocados[idCampo] = true;
}

function fueTocado(idCampo) {
    return camposTocados[idCampo] === true;
}


// CONFIGURACIÓN DE VALIDACIONES EN TIEMPO REAL


function configurarValidacionPorFoco() {

    // MEDICO
    const nombresMedico = document.getElementById('nombresMedico');
    const apellidosMedico = document.getElementById('apellidosMedico');
    const especialidadMedico = document.getElementById('especialidadMedico');
    const horarioInicio = document.getElementById('horarioInicio');
    const horarioFin = document.getElementById('horarioFin');
    const añosExperiencia = document.getElementById('añosExperiencia');
    const bibliografiaMedico = document.getElementById('bibliografiaMedico');

    const errorNombresMedico = document.getElementById('errorNombresMedico');
    const errorApellidosMedico = document.getElementById('errorApellidosMedico');
    const errorEspecialidadMedico = document.getElementById('errorEspecialidadMedico');
    const errorHorarioInicio = document.getElementById('errorHorarioInicio');
    const errorHorarioFin = document.getElementById('errorHorarioFin');
    const errorAñosExperiencia = document.getElementById('errorAñosExperiencia');
    const errorBibliografiaMedico = document.getElementById('errorBibliografiaMedico');
// Checkboxes de días
const checkboxesDias = document.querySelectorAll('#diasMedico input[name="dias"]');
const errorDiasMedico = document.getElementById('errorDiasMedico');

checkboxesDias.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const seleccionados = document.querySelectorAll('#diasMedico input[name="dias"]:checked');
        if (seleccionados.length === 0) {
            errorDiasMedico.textContent = 'Debe seleccionar al menos un día de atención';
        } else {
            errorDiasMedico.textContent = '';
        }
        actualizarBotonMedico();
    });
});
    // Nombres Médico
    if (nombresMedico) {
        nombresMedico.addEventListener('blur', function() {
            marcarComoTocado('nombresMedico');
            const ok = validarLongitud(nombresMedico, errorNombresMedico, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres');
            if (ok) validarSoloLetras(nombresMedico, errorNombresMedico, 'Los nombres solo pueden contener letras');
        });
        nombresMedico.addEventListener('input', function() {
            if (fueTocado('nombresMedico')) {
                const ok = validarLongitud(nombresMedico, errorNombresMedico, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres');
                if (ok) validarSoloLetras(nombresMedico, errorNombresMedico, 'Los nombres solo pueden contener letras');
            }
            actualizarBotonMedico();
        });
    }

    // Apellidos Médico
    if (apellidosMedico) {
        apellidosMedico.addEventListener('blur', function() {
            marcarComoTocado('apellidosMedico');
            const ok = validarLongitud(apellidosMedico, errorApellidosMedico, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres');
            if (ok) validarSoloLetras(apellidosMedico, errorApellidosMedico, 'Los apellidos solo pueden contener letras');
        });
        apellidosMedico.addEventListener('input', function() {
            if (fueTocado('apellidosMedico')) {
                const ok = validarLongitud(apellidosMedico, errorApellidosMedico, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres');
                if (ok) validarSoloLetras(apellidosMedico, errorApellidosMedico, 'Los apellidos solo pueden contener letras');
            }
            actualizarBotonMedico();
        });
    }

    // Especialidad
    if (especialidadMedico) {
        especialidadMedico.addEventListener('blur', function() {
            marcarComoTocado('especialidadMedico');
            validarSelect(especialidadMedico, errorEspecialidadMedico, 'La especialidad es obligatoria');
        });
        especialidadMedico.addEventListener('change', function() {
            marcarComoTocado('especialidadMedico');
            validarSelect(especialidadMedico, errorEspecialidadMedico, 'La especialidad es obligatoria');
            actualizarBotonMedico();
        });
    }

    // Horario Inicio
    if (horarioInicio) {
        horarioInicio.addEventListener('blur', function() {
            marcarComoTocado('horarioInicio');
            validarCampoObligatorio(horarioInicio, errorHorarioInicio, 'La hora de inicio del horario es obligatoria');
        });
        horarioInicio.addEventListener('change', function() {
            marcarComoTocado('horarioInicio');
            validarCampoObligatorio(horarioInicio, errorHorarioInicio, 'La hora de inicio del horario es obligatoria');
            actualizarBotonMedico();
        });
    }

    // Horario Fin
    if (horarioFin) {
        horarioFin.addEventListener('blur', function() {
            marcarComoTocado('horarioFin');
            validarCampoObligatorio(horarioFin, errorHorarioFin, 'La hora de fin del horario es obligatoria');
            if (horarioInicio.value && horarioFin.value && horarioFin.value <= horarioInicio.value) {
                errorHorarioFin.textContent = 'La hora de fin debe ser mayor a la hora de inicio';
                horarioFin.classList.add('error-input');
            }
        });
        horarioFin.addEventListener('change', function() {
            marcarComoTocado('horarioFin');
            validarCampoObligatorio(horarioFin, errorHorarioFin, 'La hora de fin del horario es obligatoria');
            if (horarioInicio.value && horarioFin.value && horarioFin.value <= horarioInicio.value) {
                errorHorarioFin.textContent = 'La hora de fin debe ser mayor a la hora de inicio';
                horarioFin.classList.add('error-input');
            }
            actualizarBotonMedico();
        });
    }

    // Años de experiencia
    if (añosExperiencia) {
        añosExperiencia.addEventListener('blur', function() {
            marcarComoTocado('añosExperiencia');
            validarNumero(añosExperiencia, errorAñosExperiencia, 0, 60, 'Los años de experiencia deben ser entre 0 y 60');
        });
        añosExperiencia.addEventListener('input', function() {
            if (fueTocado('añosExperiencia')) {
                validarNumero(añosExperiencia, errorAñosExperiencia, 0, 60, 'Los años de experiencia deben ser entre 0 y 60');
            }
            actualizarBotonMedico();
        });
    }

    // Bibliografía
    if (bibliografiaMedico) {
        bibliografiaMedico.addEventListener('blur', function() {
            marcarComoTocado('bibliografiaMedico');
            validarLongitud(bibliografiaMedico, errorBibliografiaMedico, 0, 500, 'La bibliografía no puede exceder 500 caracteres');
        });
        bibliografiaMedico.addEventListener('input', function() {
            if (fueTocado('bibliografiaMedico')) {
                validarLongitud(bibliografiaMedico, errorBibliografiaMedico, 0, 500, 'La bibliografía no puede exceder 500 caracteres');
            }
            actualizarBotonMedico();
        });
    }

    // PACIENTE
    const nombresPaciente = document.getElementById('nombresPaciente');
    const apellidosPaciente = document.getElementById('apellidosPaciente');
    const errorNombresPaciente = document.getElementById('errorNombresPaciente');
    const errorApellidosPaciente = document.getElementById('errorApellidosPaciente');

    if (nombresPaciente) {
        nombresPaciente.addEventListener('blur', function() {
            marcarComoTocado('nombresPaciente');
            const ok = validarLongitud(nombresPaciente, errorNombresPaciente, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres');
            if (ok) validarSoloLetras(nombresPaciente, errorNombresPaciente, 'Los nombres solo pueden contener letras');
        });
        nombresPaciente.addEventListener('input', function() {
            if (fueTocado('nombresPaciente')) {
                const ok = validarLongitud(nombresPaciente, errorNombresPaciente, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres');
                if (ok) validarSoloLetras(nombresPaciente, errorNombresPaciente, 'Los nombres solo pueden contener letras');
            }
            actualizarBotonPaciente();
        });
    }

    if (apellidosPaciente) {
        apellidosPaciente.addEventListener('blur', function() {
            marcarComoTocado('apellidosPaciente');
            const ok = validarLongitud(apellidosPaciente, errorApellidosPaciente, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres');
            if (ok) validarSoloLetras(apellidosPaciente, errorApellidosPaciente, 'Los apellidos solo pueden contener letras');
        });
        apellidosPaciente.addEventListener('input', function() {
            if (fueTocado('apellidosPaciente')) {
                const ok = validarLongitud(apellidosPaciente, errorApellidosPaciente, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres');
                if (ok) validarSoloLetras(apellidosPaciente, errorApellidosPaciente, 'Los apellidos solo pueden contener letras');
            }
            actualizarBotonPaciente();
        });
    }

    // CITA
    const fecha = document.getElementById('fecha');
    const horaInicio = document.getElementById('horaInicio');
    const horaFin = document.getElementById('horaFin');
    const medicoSelect = document.getElementById('medicoSelect');
    const pacienteSelect = document.getElementById('pacienteSelect');

    const errorFecha = document.getElementById('errorFecha');
    const errorHoras = document.getElementById('errorHoras');
    const errorHoraInicio = document.getElementById('errorHoraInicio');
    const errorHoraFin = document.getElementById('errorHoraFin');
    const errorMedicoSelect = document.getElementById('errorMedicoSelect');
    const errorPacienteSelect = document.getElementById('errorPacienteSelect');

    if (fecha) {
        fecha.addEventListener('blur', function() {
            marcarComoTocado('fecha');
            const ok = validarCampoObligatorio(fecha, errorFecha, 'La fecha es obligatoria');
            if (ok) validarFechaFutura(fecha, errorFecha, 'La fecha no puede ser anterior a hoy');
        });
        fecha.addEventListener('change', function() {
            marcarComoTocado('fecha');
            const ok = validarCampoObligatorio(fecha, errorFecha, 'La fecha es obligatoria');
            if (ok) validarFechaFutura(fecha, errorFecha, 'La fecha no puede ser anterior a hoy');
            actualizarBotonCita();
        });
    }

    if (horaInicio) {
        horaInicio.addEventListener('blur', function() {
            marcarComoTocado('horaInicio');
            validarCampoObligatorio(horaInicio, errorHoraInicio, 'La hora de inicio es obligatoria');
            if (horaInicio.value && horaFin.value) {
                validarHoras(horaInicio, horaFin, errorHoras, 'La hora de fin debe ser mayor a la hora de inicio');
            }
        });
        horaInicio.addEventListener('change', function() {
            marcarComoTocado('horaInicio');
            validarCampoObligatorio(horaInicio, errorHoraInicio, 'La hora de inicio es obligatoria');
            if (horaInicio.value && horaFin.value) {
                validarHoras(horaInicio, horaFin, errorHoras, 'La hora de fin debe ser mayor a la hora de inicio');
            }
            actualizarBotonCita();
        });
    }

    if (horaFin) {
        horaFin.addEventListener('blur', function() {
            marcarComoTocado('horaFin');
            validarCampoObligatorio(horaFin, errorHoraFin, 'La hora de fin es obligatoria');
            if (horaInicio.value && horaFin.value) {
                validarHoras(horaInicio, horaFin, errorHoras, 'La hora de fin debe ser mayor a la hora de inicio');
            }
        });
        horaFin.addEventListener('change', function() {
            marcarComoTocado('horaFin');
            validarCampoObligatorio(horaFin, errorHoraFin, 'La hora de fin es obligatoria');
            if (horaInicio.value && horaFin.value) {
                validarHoras(horaInicio, horaFin, errorHoras, 'La hora de fin debe ser mayor a la hora de inicio');
            }
            actualizarBotonCita();
        });
    }

    if (medicoSelect) {
        medicoSelect.addEventListener('blur', function() {
            marcarComoTocado('medicoSelect');
            validarSelect(medicoSelect, errorMedicoSelect, 'Debe seleccionar un médico');
        });
        medicoSelect.addEventListener('change', function() {
            marcarComoTocado('medicoSelect');
            validarSelect(medicoSelect, errorMedicoSelect, 'Debe seleccionar un médico');
            // Validar horario del médico seleccionado
            if (horaInicio.value && horaFin.value && medicoSelect.value) {
                validarHorarioMedico(horaInicio, horaFin, medicoSelect.value, errorHoras, 'La cita debe estar dentro del horario del médico');
            }
            actualizarBotonCita();
        });
    }

    if (pacienteSelect) {
        pacienteSelect.addEventListener('blur', function() {
            marcarComoTocado('pacienteSelect');
            validarSelect(pacienteSelect, errorPacienteSelect, 'Debe seleccionar un paciente');
        });
        pacienteSelect.addEventListener('change', function() {
            marcarComoTocado('pacienteSelect');
            validarSelect(pacienteSelect, errorPacienteSelect, 'Debe seleccionar un paciente');
            actualizarBotonCita();
        });
    }
}


//  INICIALIZACIÓN


document.addEventListener('DOMContentLoaded', function() {
    configurarValidacionPorFoco();
    actualizarBotonMedico();
    actualizarBotonPaciente();
    actualizarBotonCita();
});