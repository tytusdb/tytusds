import { Component, OnInit } from '@angular/core';
import { Avl } from './ts/avl';


declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-avl',
  templateUrl: './avl.component.html',
  styleUrls: ['./avl.component.css']
})
export class AvlComponent implements OnInit {

  arbol: Avl;

  //  Las variables para manejar las operaciones de la lista
  valorAgregar = '';
  valorEliminar = '';
  nodoActualizar = '';
  valorActualizar = '';
  valorBuscar = '';

  //  Opciones de configuracion de los arboles
  opciones = {
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor() {
    this.arbol = new Avl();
    this.arbol.agregar(5);
    this.arbol.agregar(10);
    this.arbol.agregar(20);
    this.arbol.agregar(25);
    this.arbol.agregar(30);
    this.arbol.agregar(35);
    this.arbol.agregar(50);
    console.log(this.arbol.raiz);
  }

  ngOnInit(): void {
  }

  getOpciones(opciones: any): void {
    this.opciones = opciones;
  }

  agregar(): void {

  }

  eliminar(): void {

  }

  actualizar(): void {

  }

  buscar(): void {

  }

  cargar(documento: any): void {

  }

  guardar(): void {

  }

}
