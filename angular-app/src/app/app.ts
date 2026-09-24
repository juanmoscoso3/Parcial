import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Navbar } from './navbar/navbar';
import { Carrusel } from './carrusel/carrusel';
import { Medicos } from './medicos/medicos';
import { Registro } from './registro/registro';
import { Footer } from './footer/footer';

@Component({
  imports: [Header, Navbar, Carrusel, Medicos, Registro, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-app');
}