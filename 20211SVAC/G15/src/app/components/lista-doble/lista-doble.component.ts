import {Component, OnInit, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { Lista } from '../ListaDobleEnlazada/Lista'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista-doble',
  templateUrl: './lista-doble.component.html',
  styleUrls: ['./lista-doble.component.css']
})
export class ListaDobleComponent implements OnInit {

  dato: any
  datoBuscar: any
  datoEliminar: any
  datoModificar: any
  datoModificado: any
  ListaDobleEnlazada: Lista
  svg1

  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false

  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.ListaDobleEnlazada = new Lista()
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
      let temp = this.ListaDobleEnlazada.buscarDato(this.dato)
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
      this.ListaDobleEnlazada.insertarFinal(this.dato, this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.alinicio) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleEnlazada.insertarInicio(this.dato, this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.ordenado) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleEnlazada.insertarOrden(this.dato, this.svg1, dibujo, `${this.velocidad}s`)
    }
    this.dato = ""
  }


  async search() {
    let result = await this.ListaDobleEnlazada.buscarAnimacion(this.datoBuscar, `${this.velocidad}s`)
    console.log("mi numero no esta ")
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoBuscar} no existe en la lista`
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
    let result = await this.ListaDobleEnlazada.eliminarDato(this.datoEliminar, `${this.velocidad}s`, this.svg1)
    if (result === -1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoEliminar} no existe en la lista`
      })
      return;
    }
    this.datoEliminar = ""
  }


  async actualizar() {
    let result = await this.ListaDobleEnlazada.buscarAnimacion(this.datoModificar, `${this.velocidad}s`)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoModificar} no existe en la lista`
      })
      return;
    }
    else {
      result.Nodo.dato = this.datoModificado
      document.getElementById("nodo" + result.Nodo.getIdentificador()).innerHTML = "" + this.datoModificado
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

