import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Medico } from '../models/medico';
import { CitaService } from '../services/cita';

@Component({
  selector: 'app-medicos',
  imports: [CommonModule],
  templateUrl: './medicos.html',
  styleUrl: './medicos.css'
})
export class Medicos {
  constructor(private citaService: CitaService) {}
  // Especialidad actualmente seleccionada (null = mostrar todos)
  especialidadSeleccionada: string | null = null;

  // Lista de especialidades con sus descripciones
  especialidades = [
    {
      id: 'terapia-neural',
      nombre: 'Terapia neural',
      icono: 'fas fa-bolt',
      color: 'warning',
      descripcion: 'La Terapia Neural regula el sistema nervioso mediante anestésicos locales. Es una técnica que ayuda a aliviar el dolor crónico y restaurar el equilibrio del organismo.'
    },
    {
      id: 'quiropraxia',
      nombre: 'Quiropraxia',
      icono: 'fas fa-hands',
      color: 'info',
      descripcion: 'La Quiropraxia se enfoca en el diagnóstico y tratamiento de los trastornos mecánicos del sistema musculoesquelético, especialmente de la columna vertebral.'
    },
    {
      id: 'fisioterapia',
      nombre: 'Fisioterapia',
      icono: 'fas fa-running',
      color: 'success',
      descripcion: 'La Fisioterapia utiliza técnicas físicas para rehabilitar lesiones, mejorar la movilidad y reducir el dolor, ayudando a recuperar la funcionalidad del cuerpo.'
    },
    {
      id: 'nutricion',
      nombre: 'Nutrición y Dietética Terapéutica',
      icono: 'fas fa-apple-alt',
      color: 'danger',
      descripcion: 'La Nutrición y Dietética Terapéutica diseña planes alimenticios personalizados para prevenir y tratar enfermedades, promoviendo un estilo de vida saludable.'
    },
    {
      id: 'cardiologia',
      nombre: 'Cardiología',
      icono: 'fas fa-heartbeat',
      color: 'danger',
      descripcion: 'La Cardiología se dedica al diagnóstico y tratamiento de las enfermedades del corazón y del sistema cardiovascular, incluyendo prevención y rehabilitación.'
    },
    {
      id: 'pediatria',
      nombre: 'Pediatría',
      icono: 'fas fa-baby',
      color: 'primary',
      descripcion: 'La Pediatría atiende la salud integral de niños y adolescentes, enfocándose en su crecimiento, desarrollo y prevención de enfermedades.'
    }
  ];

  // Lista de médicos
  medicos: Medico[] = [
    {
      id: 1,
      nombres: 'Juan',
      apellidos: 'Pérez',
      especialidad: 'terapia-neural',
      subEspecialidad: 'Terapia neural',
      motivacion: 'Especialista en Fisioterapia Deportiva. Comprometido con tu recuperación.',
      imagen: '/resourceImages/medico1.jpg'
    },
    {
      id: 2,
      nombres: 'Catalina',
      apellidos: 'Sánchez',
      especialidad: 'quiropraxia',
      subEspecialidad: 'Quiropraxia',
      motivacion: 'Especialista en Quiropraxia. La salud es fundamental.',
      imagen: '/resourceImages/medico2.jpg'
    },
    {
      id: 3,
      nombres: 'Andrés',
      apellidos: 'Cardozo',
      especialidad: 'nutricion',
      subEspecialidad: 'Nutrición y Dietética Terapéutica',
      motivacion: 'Un alimento sano alarga la vida.',
      imagen: '/resourceImages/medico3.jpg'
    },
    {
      id: 4,
      nombres: 'María',
      apellidos: 'López',
      especialidad: 'fisioterapia',
      subEspecialidad: 'Fisioterapia',
      motivacion: 'Especialista en rehabilitación física y recuperación muscular.',
      imagen: '/resourceImages/medico4.jpg'
    },
    {
      id: 5,
      nombres: 'Carlos',
      apellidos: 'Ramírez',
      especialidad: 'cardiologia',
      subEspecialidad: 'Cardiología',
      motivacion: 'Especialista en cardiología preventiva y rehabilitación cardíaca.',
      imagen: '/resourceImages/medico5.jpg'
    },
    {
      id: 6,
      nombres: 'Laura',
      apellidos: 'Gómez',
      especialidad: 'pediatria',
      subEspecialidad: 'Pediatría',
      motivacion: 'Especialista en pediatría y desarrollo infantil.',
      imagen: '/resourceImages/medico6.jpg'
    }
  ];

  // Método para filtrar médicos
  get medicosFiltrados(): Medico[] {
    if (!this.especialidadSeleccionada) {
      return this.medicos;
    }
    return this.medicos.filter(m => m.especialidad === this.especialidadSeleccionada);
  }

  // Método para obtener la info de la especialidad seleccionada
  get especialidadActual() {
    if (!this.especialidadSeleccionada) return null;
    return this.especialidades.find(e => e.id === this.especialidadSeleccionada) || null;
  }

  // Seleccionar/desmarcar especialidad
  seleccionarEspecialidad(id: string): void {
    if (this.especialidadSeleccionada === id) {
      this.especialidadSeleccionada = null;  // Desmarcar
    } else {
      this.especialidadSeleccionada = id;    // Seleccionar
    }
  }

  // Agendar cita
agendarCita(medico: Medico): void {
    // Guardar en el servicio
    this.citaService.seleccionarMedico({
      nombre: `${medico.nombres} ${medico.apellidos}`,
      especialidad: medico.subEspecialidad
    });

    // Scroll al formulario
    const seccion3 = document.getElementById('seccion3');
    if (seccion3) {
      seccion3.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
