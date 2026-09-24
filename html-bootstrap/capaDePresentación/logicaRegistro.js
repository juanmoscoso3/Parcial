

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Formulario de registro cargado');

    configurarValidacionesRegistro();
      
});


// FUNCIONES DE VALIDACIÓN ESPECÍFICAS


function validarCorreo(campo, errorElement, mensaje) {
    const valor = campo.value.trim();
    // Regex básico de correo
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (valor === '') {
        errorElement.textContent = '';
        campo.classList.remove('is-invalid');
        return true;
    }
    if (!regex.test(valor)) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    return true;
}

function validarTelefono(campo, errorElement, mensaje) {
    const valor = campo.value.trim();
    const regex = /^[0-9]{7,10}$/;
    if (valor === '') {
        errorElement.textContent = '';
        campo.classList.remove('is-invalid');
        return true;
    }
    if (!regex.test(valor)) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    return true;
}

function validarFechaNacimiento(campo, errorElement, mensaje) {
    if (!campo.value) {
        errorElement.textContent = '';
        campo.classList.remove('is-invalid');
        return true;
    }
    const fechaNac = new Date(campo.value + 'T00:00:00');
    const hoy = new Date();
    const edad = Math.floor((hoy - fechaNac) / (365.25 * 24 * 60 * 60 * 1000));

    if (edad < 0 || edad > 120) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    return true;
}

function validarGenero(nombreGrupo, errorElement, mensaje) {
    const opciones = document.getElementsByName(nombreGrupo);
    let seleccionado = false;
    for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].checked) {
            seleccionado = true;
            break;
        }
    }
    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    }
    errorElement.textContent = '';
    return true;
}


// VALIDACIÓN DE CAMPOS ESPECÍFICOS


function validarCampoRegistro(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    return true;
}

function validarLongitudRegistro(campo, errorElement, min, max, mensaje) {
    const valor = campo.value.trim();
    if (valor.length < min || valor.length > max) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    }
    errorElement.textContent = '';
    campo.classList.remove('is-invalid');
    campo.classList.add('is-valid');
    return true;
}

function validarSoloLetrasRegistro(campo, errorElement, mensaje) {
    const valor = campo.value.trim();
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (valor !== '' && !regex.test(valor)) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    }
    return true;
}

function validarSoloNumerosRegistro(campo, errorElement, mensaje) {
    const valor = campo.value.trim();
    const regex = /^[0-9]+$/;
    if (valor !== '' && !regex.test(valor)) {
        errorElement.textContent = mensaje;
        campo.classList.add('is-invalid');
        return false;
    }
    return true;
}


// VALIDACIÓN COMPLETA DEL FORMULARIO


function validarFormularioRegistro() {
    // Obtener campos
    const tipoId = document.getElementById('tipoIdentificacion');
    const numId = document.getElementById('numeroIdentificacion');
    const nombres = document.getElementById('nombresUsuario');
    const apellidos = document.getElementById('apellidosUsuario');
    const correo = document.getElementById('correoElectronico');
    const telefono = document.getElementById('telefonoUsuario');
    const fechaNac = document.getElementById('fechaNacimiento');
    const terminos = document.getElementById('aceptaTerminos');

    // Obtener labels de error
    const errTipoId = document.getElementById('errorTipoIdentificacion');
    const errNumId = document.getElementById('errorNumeroIdentificacion');
    const errNombres = document.getElementById('errorNombresUsuario');
    const errApellidos = document.getElementById('errorApellidosUsuario');
    const errCorreo = document.getElementById('errorCorreoElectronico');
    const errTelefono = document.getElementById('errorTelefonoUsuario');
    const errFechaNac = document.getElementById('errorFechaNacimiento');
    const errGenero = document.getElementById('errorGenero');
    const errTerminos = document.getElementById('errorTerminos');

    // Validar cada campo
    const vTipoId = validarCampoRegistro(tipoId, errTipoId, 'El tipo de identificación es obligatorio');

    const vNumId = validarCampoRegistro(numId, errNumId, 'El número de identificación es obligatorio')
                 && validarLongitudRegistro(numId, errNumId, 6, 15, 'El número debe tener entre 6 y 15 dígitos')
                 && validarSoloNumerosRegistro(numId, errNumId, 'El número solo puede contener dígitos');

    const vNombres = validarCampoRegistro(nombres, errNombres, 'Los nombres son obligatorios')
                   && validarLongitudRegistro(nombres, errNombres, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres')
                   && validarSoloLetrasRegistro(nombres, errNombres, 'Los nombres solo pueden contener letras');

    const vApellidos = validarCampoRegistro(apellidos, errApellidos, 'Los apellidos son obligatorios')
                     && validarLongitudRegistro(apellidos, errApellidos, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres')
                     && validarSoloLetrasRegistro(apellidos, errApellidos, 'Los apellidos solo pueden contener letras');

    const vCorreo = validarCampoRegistro(correo, errCorreo, 'El correo electrónico es obligatorio')
                  && validarCorreo(correo, errCorreo, 'Ingrese un correo válido (ejemplo: usuario@dominio.com)');

    const vTelefono = validarCampoRegistro(telefono, errTelefono, 'El teléfono es obligatorio')
                    && validarTelefono(telefono, errTelefono, 'El teléfono debe tener entre 7 y 10 dígitos');

    const vGenero = validarGenero('genero', errGenero, 'El género es obligatorio');

    const vFechaNac = validarCampoRegistro(fechaNac, errFechaNac, 'La fecha de nacimiento es obligatoria')
                    && validarFechaNacimiento(fechaNac, errFechaNac, 'Ingrese una fecha de nacimiento válida');

    // Validar términos
    let vTerminos = true;
    if (!terminos.checked) {
        errTerminos.textContent = 'Debe aceptar los términos y condiciones';
        vTerminos = false;
    } else {
        errTerminos.textContent = '';
    }

    return vTipoId && vNumId && vNombres && vApellidos && vCorreo && 
           vTelefono && vGenero && vFechaNac && vTerminos;
}


// CONFIGURACIÓN DE VALIDACIONES EN TIEMPO REAL


function configurarValidacionesRegistro() {
    const formRegistro = document.getElementById('formRegistro');
    if (!formRegistro) return;

    // Campos
    const tipoId = document.getElementById('tipoIdentificacion');
    const numId = document.getElementById('numeroIdentificacion');
    const nombres = document.getElementById('nombresUsuario');
    const apellidos = document.getElementById('apellidosUsuario');
    const correo = document.getElementById('correoElectronico');
    const telefono = document.getElementById('telefonoUsuario');
    const fechaNac = document.getElementById('fechaNacimiento');
    const terminos = document.getElementById('aceptaTerminos');
    const radiosGenero = document.getElementsByName('genero');

    // Labels de error
    const errTipoId = document.getElementById('errorTipoIdentificacion');
    const errNumId = document.getElementById('errorNumeroIdentificacion');
    const errNombres = document.getElementById('errorNombresUsuario');
    const errApellidos = document.getElementById('errorApellidosUsuario');
    const errCorreo = document.getElementById('errorCorreoElectronico');
    const errTelefono = document.getElementById('errorTelefonoUsuario');
    const errFechaNac = document.getElementById('errorFechaNacimiento');
    const errGenero = document.getElementById('errorGenero');

    // ---- SELECT tipo identificación ----
    if (tipoId) {
        tipoId.addEventListener('blur', () => {
            validarCampoRegistro(tipoId, errTipoId, 'El tipo de identificación es obligatorio');
        });
        tipoId.addEventListener('change', () => {
            validarCampoRegistro(tipoId, errTipoId, 'El tipo de identificación es obligatorio');
        });
    }

    // ---- Número identificación ----
    if (numId) {
        numId.addEventListener('blur', () => {
            const ok = validarCampoRegistro(numId, errNumId, 'El número de identificación es obligatorio');
            if (ok) {
                validarLongitudRegistro(numId, errNumId, 6, 15, 'El número debe tener entre 6 y 15 dígitos');
                validarSoloNumerosRegistro(numId, errNumId, 'El número solo puede contener dígitos');
            }
        });
        numId.addEventListener('input', () => {
            // Solo permitir números
            numId.value = numId.value.replace(/[^0-9]/g, '');
        });
    }

    // ---- Nombres ----
    if (nombres) {
        nombres.addEventListener('blur', () => {
            const ok = validarCampoRegistro(nombres, errNombres, 'Los nombres son obligatorios');
            if (ok) {
                validarLongitudRegistro(nombres, errNombres, 2, 50, 'Los nombres deben tener entre 2 y 50 caracteres');
                validarSoloLetrasRegistro(nombres, errNombres, 'Los nombres solo pueden contener letras');
            }
        });
    }

    // ---- Apellidos ----
    if (apellidos) {
        apellidos.addEventListener('blur', () => {
            const ok = validarCampoRegistro(apellidos, errApellidos, 'Los apellidos son obligatorios');
            if (ok) {
                validarLongitudRegistro(apellidos, errApellidos, 2, 50, 'Los apellidos deben tener entre 2 y 50 caracteres');
                validarSoloLetrasRegistro(apellidos, errApellidos, 'Los apellidos solo pueden contener letras');
            }
        });
    }

    // ---- Correo ----
    if (correo) {
        correo.addEventListener('blur', () => {
            const ok = validarCampoRegistro(correo, errCorreo, 'El correo electrónico es obligatorio');
            if (ok) {
                validarCorreo(correo, errCorreo, 'Ingrese un correo válido (ejemplo: usuario@dominio.com)');
            }
        });
    }

    // ---- Teléfono ----
    if (telefono) {
        telefono.addEventListener('blur', () => {
            const ok = validarCampoRegistro(telefono, errTelefono, 'El teléfono es obligatorio');
            if (ok) {
                validarTelefono(telefono, errTelefono, 'El teléfono debe tener entre 7 y 10 dígitos');
            }
        });
        telefono.addEventListener('input', () => {
            // Solo permitir números
            telefono.value = telefono.value.replace(/[^0-9]/g, '');
        });
    }

    // ---- Género ----
    radiosGenero.forEach(radio => {
        radio.addEventListener('change', () => {
            validarGenero('genero', errGenero, 'El género es obligatorio');
        });
    });

    // ---- Fecha de nacimiento ----
    if (fechaNac) {
        fechaNac.addEventListener('blur', () => {
            const ok = validarCampoRegistro(fechaNac, errFechaNac, 'La fecha de nacimiento es obligatoria');
            if (ok) {
                validarFechaNacimiento(fechaNac, errFechaNac, 'Ingrese una fecha de nacimiento válida');
            }
        });
        fechaNac.addEventListener('change', () => {
            const ok = validarCampoRegistro(fechaNac, errFechaNac, 'La fecha de nacimiento es obligatoria');
            if (ok) {
                validarFechaNacimiento(fechaNac, errFechaNac, 'Ingrese una fecha de nacimiento válida');
            }
        });
    }

    // ---- Términos ----
    if (terminos) {
        terminos.addEventListener('change', () => {
            const errTerminos = document.getElementById('errorTerminos');
            if (terminos.checked) {
                errTerminos.textContent = '';
            }
        });
    }

    // ---- Submit ----
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validarFormularioRegistro()) {
            mostrarNotificacion('Por favor, complete correctamente todos los campos', 'error');
            
            // Scroll al primer campo con error
            const primerError = formRegistro.querySelector('.is-invalid');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primerError.focus();
            }
            return;
        }

        // ---- Registro exitoso ----
        const datos = {
            tipoId: tipoId.value,
            numeroId: numId.value,
            nombres: nombres.value.trim(),
            apellidos: apellidos.value.trim(),
            correo: correo.value.trim(),
            telefono: telefono.value.trim(),
            genero: document.querySelector('input[name="genero"]:checked').value,
            fechaNacimiento: fechaNac.value
        };

        console.log('✅ Registro exitoso:', datos);

        mostrarNotificacion(
            ` ¡Bienvenido/a ${datos.nombres}! Te enviamos un correo a ${datos.correo} para confirmar tu registro.`,
            'exito',
            5000
        );

        // Limpiar formulario
        formRegistro.reset();
        formRegistro.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        formRegistro.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        document.querySelectorAll('#formRegistro .text-danger').forEach(el => el.textContent = '');
    });

    // ---- Botón limpiar ----
    const btnLimpiar = document.getElementById('btnLimpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            formRegistro.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
            formRegistro.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            document.querySelectorAll('#formRegistro .text-danger').forEach(el => el.textContent = '');
        });
    }
}