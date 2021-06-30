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
  fileName= ""
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
  async insertanButton(){
    await this.addLast(this.dato)
    this.dato = ""
  }
  
  addLast(dato) {
    if (!this.repetidos) {
      let temp = this.ListaDobleEnlazada.buscarDato(dato)
      if (temp !== null) {
        Swal.fire({
          target: document.getElementById('form-modal'),
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${dato} ya existe en la lista`
        })
        return;
      }
    }
    if (this.alfinal) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleEnlazada.insertarFinal(dato, this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.alinicio) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleEnlazada.insertarInicio(dato, this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.ordenado) {
      let dibujo = document.getElementById("cuerpoDraw")
      this.ListaDobleEnlazada.insertarOrden(dato, this.svg1, dibujo, `${this.velocidad}s`)
    }
    this.dato = ""
  }


  async search() {
    let result = await this.ListaDobleEnlazada.buscarAnimacion(this.datoBuscar, `${this.velocidad}s`)
    console.log("mi numero no esta ")
    if (result === null) {
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoBuscar} no existe en la lista`
      })
      return;
    } else {
      Swal.fire({
        target: document.getElementById('form-modal'),
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
        target: document.getElementById('form-modal'),
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
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoModificar} no existe en la lista`
      })
      return;
    }
    else {
      result.nodo.dato = this.datoModificado
      document.getElementById("nodo" + result.nodo.getIdentificador()).innerHTML = "" + this.datoModificado
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

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        await this.addLast(data[i])
        if (!isNaN(data[i])) {
          console.log("es numero")
        }
      }


    }
  }

  async processFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result.toString())
      }
      reader.onerror = reject;

      reader.readAsText(file);
    })
  }

  generarJSON() {
    let data = this.ListaDobleEnlazada.generarJSON()
    var link = document.createElement("a");
    link.download = "ListaDobleEnlazada.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }


}

