class Medico {
  constructor(id, nombres, apellidos, especialidad, diasAtencion, horarioInicio, horarioFin, añosExperiencia, bibliografia) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.especialidad = especialidad;
    this.diasAtencion = diasAtencion; // Array de números: [1,2,3,4,5] = Lunes a Viernes
    this.horarioInicio = horarioInicio;
    this.horarioFin = horarioFin;
    this.añosExperiencia = añosExperiencia;
    this.bibliografia = bibliografia;
  }

  // Método para obtener los días como texto legible
  obtenerDiasTexto() {
    const nombres = {
      0: 'Dom', 1: 'Lun', 2: 'Mar', 3: 'Mié',
      4: 'Jue', 5: 'Vie', 6: 'Sáb'
    };
    return this.diasAtencion.map(d => nombres[d]).join(', ');
  }

  // Método para saber si atiende un día específico
  atiendeDia(diaSemana) {
    return this.diasAtencion.includes(diaSemana);
  }
}