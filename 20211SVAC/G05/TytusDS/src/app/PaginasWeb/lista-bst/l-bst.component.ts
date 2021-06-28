import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-l-bst',
  templateUrl: './l-bst.component.html',
  styleUrls: ['./l-bst.component.css']
})
export class LBSTComponent implements OnInit {
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
  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }

}
