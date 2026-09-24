import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  public proyecto: any = {
    anio: '2026',
    nombreProyecto: 'Parcial - Clínica Bienestar'
  };
}