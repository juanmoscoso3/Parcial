import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css'
})
export class Carrusel {
  // Array de promociones
  promociones = [
    {
      id: 1,
      titulo: 'Consulta General',
      descripcion: 'Primera consulta con 30% de descuento para nuevos pacientes',
      imagen: '/resourceImages/promocion1.jpg',
      icono: 'fas fa-stethoscope',
      botonClase: 'btn-primary'
    },
    {
      id: 2,
      titulo: 'Fisioterapia',
      descripcion: 'Paquete de 5 sesiones con 25% de descuento',
      imagen: '/resourceImages/promocion2.jpg',
      icono: 'fas fa-spa',
      botonClase: 'btn-success'
    },
    {
      id: 3,
      titulo: 'Nutrición y Dietética',
      descripcion: 'Plan nutricional personalizado + seguimiento gratis por 1 mes',
      imagen: '/resourceImages/promocion3.jpg',
      icono: 'fas fa-apple-alt',
      botonClase: 'btn-warning'
    }
  ];
}