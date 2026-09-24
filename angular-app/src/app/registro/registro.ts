import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../services/cita';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements OnInit, OnDestroy {
  medicoSeleccionado: any = null;
  private suscripcion?: Subscription;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del servicio
    this.suscripcion = this.citaService.medicoSeleccionado$.subscribe(medico => {
      this.medicoSeleccionado = medico;
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente
    this.suscripcion?.unsubscribe();
  }
  // Modelo del formulario
  registro = {
    tipoId: '',
    numeroId: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    genero: '',
    fechaNacimiento: '',
    aceptaTerminos: false
  };

  // Mensajes de error
  errores = {
    tipoId: '',
    numeroId: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    genero: '',
    fechaNacimiento: '',
    aceptaTerminos: ''
  };

  
  // MÉTODOS DE VALIDACIÓN
  
  // ---- Validar tipo de identificación ----
  validarTipoId(): void {
    if (!this.registro.tipoId || this.registro.tipoId.trim() === '') {
      this.errores.tipoId = 'El tipo de identificación es obligatorio';
    } else {
      this.errores.tipoId = '';
    }
  }

  // ---- Validar número de identificación ----
  validarNumeroId(): void {
    const valor = this.registro.numeroId.trim();
    if (valor === '') {
      this.errores.numeroId = 'El número de identificación es obligatorio';
    } else if (valor.length < 6 || valor.length > 15) {
      this.errores.numeroId = 'El número debe tener entre 6 y 15 dígitos';
    } else if (!/^\d+$/.test(valor)) {
      this.errores.numeroId = 'El número solo puede contener dígitos';
    } else {
      this.errores.numeroId = '';
    }
  }

  // ---- Validar nombres ----
  validarNombres(): void {
    const valor = this.registro.nombres.trim();
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    
    if (valor === '') {
      this.errores.nombres = 'Los nombres son obligatorios';
    } else if (valor.length < 2 || valor.length > 50) {
      this.errores.nombres = 'Los nombres deben tener entre 2 y 50 caracteres';
    } else if (!regexLetras.test(valor)) {
      this.errores.nombres = 'Los nombres solo pueden contener letras';
    } else {
      this.errores.nombres = '';
    }
  }

  // ---- Validar apellidos ----
  validarApellidos(): void {
    const valor = this.registro.apellidos.trim();
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    
    if (valor === '') {
      this.errores.apellidos = 'Los apellidos son obligatorios';
    } else if (valor.length < 2 || valor.length > 50) {
      this.errores.apellidos = 'Los apellidos deben tener entre 2 y 50 caracteres';
    } else if (!regexLetras.test(valor)) {
      this.errores.apellidos = 'Los apellidos solo pueden contener letras';
    } else {
      this.errores.apellidos = '';
    }
  }

  // ---- Validar correo ----
  validarCorreo(): void {
    const valor = this.registro.correo.trim();
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (valor === '') {
      this.errores.correo = 'El correo electrónico es obligatorio';
    } else if (!regexCorreo.test(valor)) {
      this.errores.correo = 'Ingrese un correo válido (ejemplo: usuario@dominio.com)';
    } else {
      this.errores.correo = '';
    }
  }

  // ---- Validar teléfono ----
  validarTelefono(): void {
    const valor = this.registro.telefono.trim();
    
    if (valor === '') {
      this.errores.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{7,10}$/.test(valor)) {
      this.errores.telefono = 'El teléfono debe tener entre 7 y 10 dígitos';
    } else {
      this.errores.telefono = '';
    }
  }

  // ---- Validar género ----
  validarGenero(): void {
    if (!this.registro.genero) {
      this.errores.genero = 'El género es obligatorio';
    } else {
      this.errores.genero = '';
    }
  }

  // ---- Validar fecha de nacimiento ----
  validarFechaNacimiento(): void {
    if (!this.registro.fechaNacimiento) {
      this.errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
      return;
    }
    
    const fechaNac = new Date(this.registro.fechaNacimiento + 'T00:00:00');
    const hoy = new Date();
    const edad = Math.floor((hoy.getTime() - fechaNac.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    
    if (edad < 0 || edad > 120) {
      this.errores.fechaNacimiento = 'Ingrese una fecha de nacimiento válida';
    } else {
      this.errores.fechaNacimiento = '';
    }
  }

  // ---- Validar términos ----
  validarTerminos(): void {
    if (!this.registro.aceptaTerminos) {
      this.errores.aceptaTerminos = 'Debe aceptar los términos y condiciones';
    } else {
      this.errores.aceptaTerminos = '';
    }
  }

  
  // VALIDACIÓN COMPLETA 
  
  validarFormulario(): boolean {
    this.validarTipoId();
    this.validarNumeroId();
    this.validarNombres();
    this.validarApellidos();
    this.validarCorreo();
    this.validarTelefono();
    this.validarGenero();
    this.validarFechaNacimiento();
    this.validarTerminos();

    // Verificar si hay algún error
    return !Object.values(this.errores).some(error => error !== '');
  }

  
  // REGISTRAR
 
  registrar(): void {
  if (!this.validarFormulario()) {
    console.log(' Formulario con errores');
    const primerError = document.querySelector('.is-invalid');
    if (primerError) {
      primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  console.log(' Registro exitoso:', this.registro);
  
  alert(` ¡Bienvenido/a ${this.registro.nombres}! Te enviamos un correo a ${this.registro.correo} para confirmar tu registro.`);

  //  Limpiar el médico seleccionado
  this.citaService.limpiarSeleccion();

  this.limpiarFormulario();
}
  
  // LIMPIAR FORMULARIO
  
  limpiarFormulario(): void {
    this.registro = {
      tipoId: '',
      numeroId: '',
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      genero: '',
      fechaNacimiento: '',
      aceptaTerminos: false
    };
    
    this.errores = {
      tipoId: '',
      numeroId: '',
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      genero: '',
      fechaNacimiento: '',
      aceptaTerminos: ''
    };
  }


  // MÉTODOS AUXILIARES

  soloNumeros(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
}
