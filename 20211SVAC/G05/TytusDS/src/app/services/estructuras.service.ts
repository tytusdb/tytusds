import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstructurasService {

  constructor() {
    this.comprobarConfiguracion();
  }

  comprobarConfiguracion(): void {
    if (localStorage.getItem('ingreso') === null) {
      this.setIngreso('final');
    }
    if (localStorage.getItem('animacionLineal') === null) {
      this.setAnimacionLineal('1000');
    }
    if (localStorage.getItem('repeticionLineal') === null) {
      this.setRepeticionLineal('false');
    }
    if (localStorage.getItem('animacionOrdenamiento') === null) {
      this.setAnimacionOrdenamiento('1000');
    }
    if (localStorage.getItem('animacionArbol') === null) {
      this.setAnimacionArbol('1000');
    }
    if (localStorage.getItem('grado') === null) {
      this.setGrado('3');
    }
    if (localStorage.getItem('repeticionArboles') === null) {
      this.setRepeticionArbol('false');
    }
  }

  setIngreso(opcion: string): void {
    localStorage.setItem('ingreso', opcion);
  }

  getIngreso(): string {
    return localStorage.getItem('ingreso');
  }

  setAnimacionLineal(tiempo: string): void {
    localStorage.setItem('animacionLineal', tiempo);
  }

  getAnimacionLineal(): number {
    return +localStorage.getItem('animacionLineal');
  }

  setRepeticionLineal(opcion: string): void {
    localStorage.setItem('repeticionLineal', opcion);
  }

  getRepeticionLineal(): string {
    return localStorage.getItem('repeticionLineal');
  }

  setAnimacionOrdenamiento(tiempo: string): void {
    localStorage.setItem('animacionOrdenamiento', tiempo);
  }

  getAnimacionOrdenamiento(): number {
    return +localStorage.getItem('animacionOrdenamiento');
  }

  setAnimacionArbol(tiempo: string): void {
    localStorage.setItem('animacionArbol', tiempo);
  }

  getAnimacionArbol(): number {
    return +localStorage.getItem('animacionArbol');
  }

  setGrado(grado: string): void {
    localStorage.setItem('grado', grado);
  }

  getGrado(): string {
    return localStorage.getItem('grado');
  }

  setRepeticionArbol(opcion: string): void {
    localStorage.setItem('repeticionArbol', opcion);
  }

  getRepeticionArbol(): string {
    return localStorage.getItem('repeticionArbol');
  }

  getConfig(): any {
    return {
      ingreso: this.getIngreso(),
      animacionLineal: this.getAnimacionLineal(),
      repeticionLineal: this.getRepeticionLineal(),
      animacionOrdenamiento: this.getAnimacionOrdenamiento(),
      animacionArbol: this.getAnimacionArbol(),
      grado: this.getGrado(),
      repeticionArbol: this.getRepeticionArbol()
    };
  }
}
