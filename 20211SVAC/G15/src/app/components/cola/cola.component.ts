import { Component, OnInit, ElementRef,ViewChild , Renderer2 } from '@angular/core';
import {Cola}from '../CreacionCola/Cola'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cola',
  templateUrl: './cola.component.html',
  styleUrls: ['./cola.component.css']
})

export class ColaComponent implements OnInit {

  dato: number|string
  datoBuscar: any
  datoEliminar: any
  datoModificar: any
  datoModificado: any
  CreacionCola: Cola
  svg1
  prioridad: number

fileName = ""

  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false

  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    this.CreacionCola = new Cola()
  }

  async pushbutton() {
    await this.add(this.dato)
    this.dato = ""
  }

  async add(dato) {
    if (!this.repetidos) {
      let temp = this.CreacionCola.search(this.dato)
      if (temp !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${this.dato} ya existe en la cola`
        })
        this.dato=""
        return -1;
      }
    }
      let dibujo = document.getElementById("cuerpoDraw")
      await this.CreacionCola.add(dato, dibujo, `${this.velocidad}s`)
      this.dato=""
    return 1;
  }

  async search() {
    let result = await this.CreacionCola.buscarAnimacion(this.datoBuscar, `${this.velocidad}s`)
    console.log("mi numero no esta ")
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoBuscar} no existe en la lista`
      })
      this.datoBuscar = ""
      return;
    } else {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se econtro el dato ${this.datoBuscar} en la posicion ${result.index}`
      })
    }

    this.datoBuscar = ""
    return

  }

  async delete() {
    console.log("entre al metodo eliminar")
    let result = await this.CreacionCola.delete(`${this.velocidad}s`, this.svg1)
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
    let result = await this.CreacionCola.buscarAnimacion(this.datoModificar, `${this.velocidad}s`)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoModificar} no existe en la Cola`
      })
      return;
    }
    else {
      result.NodoCola.dato = this.datoModificado
      document.getElementById("nodo" + result.NodoCola.identificador).innerHTML = "" + this.datoModificado
      this.datoModificar = ""
      this.datoModificado = ""
    }
    this.datoModificar = ""
    this.datoModificado = ""
  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        await this.add(data[i])
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
    let data = this.CreacionCola.generarJSON()
    var link = document.createElement("a");
    link.download = "Cola.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }


}
