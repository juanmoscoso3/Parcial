export class Medico {
  id!: number;
  nombres!: string;
  apellidos!: string;
  especialidad!: string;
  subEspecialidad!: string;
  motivacion!: string;
  imagen!: string;

  constructor(
    id: number,
    nombres: string,
    apellidos: string,
    especialidad: string,
    subEspecialidad: string,
    motivacion: string,
    imagen: string
  ) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.especialidad = especialidad;
    this.subEspecialidad = subEspecialidad;
    this.motivacion = motivacion;
    this.imagen = imagen;
  }
}