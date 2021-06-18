import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a-binario',
  templateUrl: './a-binario.component.html',
  styleUrls: ['./a-binario.component.css']
})
export class ABinarioComponent implements OnInit {
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };
  constructor() { }

  ngOnInit(): void {
  }
  ///CAMBIO DE OPCIONES--------------------------------------
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }

}
