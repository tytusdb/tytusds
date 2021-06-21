import { Component, OnInit, ElementRef,ViewChild  } from '@angular/core';
import {ColaP}from '../ColaPrioridad/ColaP'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cola-prioridad',
  templateUrl: './cola-prioridad.component.html',
  styleUrls: ['./cola-prioridad.component.css']
})
export class ColaPrioridadComponent implements OnInit {

  dato: any
  prioridad:any
  datoBuscar: any
  datoEliminar: any
  datoModificar: any
  datoModificado: any
  ColaPrioridad: ColaP
  svg1

  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false

  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.ColaPrioridad = new ColaP()
    this.svg1 = document.getElementById("svg")
    this.svg1.style.position = 'absolute';
    this.svg1.style.top = '0';
    this.svg1.style.left = '0';
    this.svg1.style.width = '100%';
    this.svg1.style.height = '100vh';
    this.svg1.style.zIndex = '0';
  }

  addLast() {
    if (!this.repetidos) {
      let temp = this.ColaPrioridad.search(this.dato)
      if (temp !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${this.dato} ya existe en la lista`
        })
        return;
      }
    }
    if (this.alfinal) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ColaPrioridad.add(this.dato,this.prioridad, this.svg1,dibujo,this.velocidad)
    }

    if (this.alinicio) {
      let dibujo = document.getElementById("cuerpoDraw")
     this.ColaPrioridad.insertarInicio(this.dato, this.prioridad, this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.ordenado) {
      let dibujo = document.getElementById("cuerpoDraw")
    //  this.CreacionCola.insertarOrden(this.dato, this.svg1, dibujo, `${this.velocidad}s`)
    }
    this.dato = ""
    this.prioridad = ""
  }

  async search() {
    let result = await this.ColaPrioridad.buscarAnimacion(this.datoBuscar, `${this.velocidad}s`)
    console.log("mi numero no esta ")
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoBuscar} no existe en la Cola`
      })
      return;
    } else {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se econtro el dato ${this.datoBuscar} en la posicion ${result.index}`
      })
    }

    this.datoBuscar = ""

  }

  async delete() {
    console.log("entre al metodo eliminar")
    let result = await this.ColaPrioridad.delete(`${this.velocidad}s`, this.svg1)
    if (result === -1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `No hay datos en la Cola `
      })
      return;
    }
    this.datoEliminar = ""
  }


  async actualizar() {
    let result = await this.ColaPrioridad.buscarAnimacion(this.datoModificar, `${this.velocidad}s`)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoModificar} no existe en la Cola`
      })
      return;
    }
    else {
      result.Nodo.dato = this.datoModificado
      document.getElementById("nodo" + result.Nodo.identificador).innerHTML = "" + this.datoModificado
      this.datoModificar = ""
      this.datoModificado = ""
    }
    this.datoModificar = ""
    this.datoModificado = ""
  }


  changeAlFinal() {
    if (this.alfinal) {
      this.alinicio = false
      this.ordenado = false
    }

  }


  changeAlInicio() {
    if (this.alinicio) {
      this.alfinal = false
      this.ordenado = false
    }

  }

  changeOrdenado() {
    if (this.ordenado) {
      this.alfinal = false
      this.alinicio = false
    }

  }
}
