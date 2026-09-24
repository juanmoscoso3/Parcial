

document.addEventListener('DOMContentLoaded', function() {
    console.log(' Landing page cargada correctamente');

    inicializarFiltradoEspecialidades();
});


// FILTRADO POR ESPECIALIDADES


// Descripciones de cada especialidad
const descripcionesEspecialidades = {
    'terapia-neural': {
        titulo: 'Terapia Neural',
        descripcion: 'La Terapia Neural regula el sistema nervioso mediante anestésicos locales. Es una técnica que ayuda a aliviar el dolor crónico y restaurar el equilibrio del organismo.'
    },
    'quiropraxia': {
        titulo: 'Quiropraxia',
        descripcion: 'La Quiropraxia se enfoca en el diagnóstico y tratamiento de los trastornos mecánicos del sistema musculoesquelético, especialmente de la columna vertebral.'
    },
    'fisioterapia': {
        titulo: 'Fisioterapia',
        descripcion: 'La Fisioterapia utiliza técnicas físicas para rehabilitar lesiones, mejorar la movilidad y reducir el dolor, ayudando a recuperar la funcionalidad del cuerpo.'
    },
    'nutricion': {
        titulo: 'Nutrición y Dietética Terapéutica',
        descripcion: 'La Nutrición y Dietética Terapéutica diseña planes alimenticios personalizados para prevenir y tratar enfermedades, promoviendo un estilo de vida saludable.'
    },
    'cardiologia': {
        titulo: 'Cardiología',
        descripcion: 'La Cardiología se dedica al diagnóstico y tratamiento de las enfermedades del corazón y del sistema cardiovascular, incluyendo prevención y rehabilitación.'
    },
    'pediatria': {
        titulo: 'Pediatría',
        descripcion: 'La Pediatría atiende la salud integral de niños y adolescentes, enfocándose en su crecimiento, desarrollo y prevención de enfermedades.'
    }
};

function inicializarFiltradoEspecialidades() {
    const enlacesEspecialidades = document.querySelectorAll('.especialidad-link');
    const medicos = document.querySelectorAll('.medico-item');
    const panelDescripcion = document.getElementById('descripcionEspecialidad');
    const tituloEspecialidad = document.getElementById('tituloEspecialidad');
    const textoEspecialidad = document.getElementById('textoEspecialidad');

    // Si no existen elementos, no hacer nada
    if (!enlacesEspecialidades.length || !medicos.length) {
        console.warn('No se encontraron elementos para el filtrado');
        return;
    }

    enlacesEspecialidades.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const especialidad = this.getAttribute('data-especialidad');

            // Si ya está activa, desactivar (mostrar todos los médicos)
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                
                // Mostrar todos los médicos
                medicos.forEach(medico => {
                    medico.style.display = '';
                });

                // Ocultar panel de descripción
                if (panelDescripcion) panelDescripcion.style.display = 'none';

                return;
            }

            // Quitar 'active' de todos los enlaces
            enlacesEspecialidades.forEach(el => el.classList.remove('active'));
            
            // Agregar 'active' al enlace clicado
            this.classList.add('active');

            // ---- 1. Mostrar descripción de la especialidad ----
            const info = descripcionesEspecialidades[especialidad];
            if (info && panelDescripcion && tituloEspecialidad && textoEspecialidad) {
                tituloEspecialidad.textContent = info.titulo;
                textoEspecialidad.textContent = info.descripcion;
                panelDescripcion.style.display = 'block';
            }

            // ---- 2. Filtrar médicos ----
            medicos.forEach(medico => {
                const especialidadMedico = medico.getAttribute('data-especialidad');
                if (especialidadMedico === especialidad) {
                    medico.style.display = '';
                } else {
                    medico.style.display = 'none';
                }
            });

            
            document.getElementById('seccion2').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // ---- Botones "Agendar Cita" ----
    const botonesAgendar = document.querySelectorAll('.btn-agendar');
    botonesAgendar.forEach(boton => {
        boton.addEventListener('click', function() {
            // Redirigir a la sección de registro
            document.getElementById('seccion3').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            
            mostrarNotificacion(' Selecciona el médico en el formulario de registro', 'exito');
        });
    });
}

