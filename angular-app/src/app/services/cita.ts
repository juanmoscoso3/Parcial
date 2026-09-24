import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  // BehaviorSubject que guarda el médico seleccionado
  private medicoSeleccionadoSubject = new BehaviorSubject<any>(null);
  
  // Observable público para que los componentes se suscriban
  public medicoSeleccionado$ = this.medicoSeleccionadoSubject.asObservable();

  constructor() { }

  // Método para seleccionar un médico
  seleccionarMedico(medico: any): void {
    this.medicoSeleccionadoSubject.next(medico);
  }

  // Método para limpiar
  limpiarSeleccion(): void {
    this.medicoSeleccionadoSubject.next(null);
  }
}