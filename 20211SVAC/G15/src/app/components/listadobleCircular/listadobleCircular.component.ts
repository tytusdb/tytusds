import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ListaDobleCircular } from '../../helpers/DobleEnlazadaCircular/ListaDobleCircular'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ListaDobleCircular',
  templateUrl: './ListaDobleCircular.component.html',
  styleUrls: ['./ListaDobleCircular.component.css']
})
export class ListaDobleCircularComponent implements OnInit {
  numero: number
  numeroBuscar: number
  numeroEliminar: number
  numeroAntiguo: number
  numeroNuevo: number
  ListaDobleCircular: ListaDobleCircular
  svg1

  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false


  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.ListaDobleCircular = new ListaDobleCircular()
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
      let temp = this.ListaDobleCircular.search(this.numero)
      if (temp !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El numero ${this.numero} ya existe en la lista`
        })
        return;
      }
    }
    if (this.alfinal) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleCircular.add(this.numero, this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.alinicio) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleCircular.addAlInicio(this.numero, this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.ordenado) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleCircular.addOrdenado(this.numero, this.svg1, dibujo, `${this.velocidad}s`)
    }
    this.numero = 0
  }


  async search() {
    let result = await this.ListaDobleCircular.searchAnimation(this.numeroBuscar, `${this.velocidad}s`)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El numero ${this.numeroBuscar} no existe en la lista`
      })
      return;
    }
    Swal.fire({
      icon: 'success',
      title: ':)',
      text: `Se econtro el numero ${this.numeroBuscar} en la posicion ${result.index}`
    })
    this.numeroBuscar = 0

  }

  async delete() {
    let result = await this.ListaDobleCircular.eliminar(this.numeroEliminar, `${this.velocidad}s`, this.svg1)
    if (result === -1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El numero ${this.numeroEliminar} no existe en la lista`
      })
      return;
    }
    this.numeroEliminar = 0
  }


  async actualizar() {
    let result = await this.ListaDobleCircular.searchAnimation(this.numeroAntiguo, `${this.velocidad}s`)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El numero ${this.numeroAntiguo} no existe en la lista`
      })
      return;
    }
    result.nodo.setNumero(this.numeroNuevo)
    document.getElementById("nodo" + result.nodo.getId()).innerHTML = "" + this.numeroNuevo
    this.numeroAntiguo = 0
    this.numeroNuevo = 0
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
