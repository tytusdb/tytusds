import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lzw',
  templateUrl: './lzw.component.html',
  styleUrls: ['./lzw.component.css']
})
export class LZWComponent implements OnInit {
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
