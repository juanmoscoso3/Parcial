import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  public nombres: string = 'Clínica';
  public apellidos: string = 'Bienestar';
  public disciplina: string = 'Tu salud en las mejores manos';

}