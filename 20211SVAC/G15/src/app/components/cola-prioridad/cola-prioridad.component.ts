import { Component, OnInit, ElementRef,ViewChild, Renderer2  } from '@angular/core';
import {ColaP}from '../ColaPrioridad/ColaP'
import Swal from 'sweetalert2'

import {ColaPrioridad} from "src/app/helpers/interfaz/colaPrioridad"


@Component({
  selector: 'app-cola-prioridad',
  templateUrl: './cola-prioridad.component.html',
  styleUrls: ['./cola-prioridad.component.css']
})
export class ColaPrioridadComponent implements OnInit {

  dato: number|string
  prioridad: any
  datoBuscar: any
  datoEliminar: any
  datoModificar: any
  datoModificado: any
  ColaPrioridad: ColaP
  svg1
  fileName=""
  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false

  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.ColaPrioridad = new ColaP()
  }

  async pushbutton() {
    await this.add(this.dato,this.prioridad)
    this.dato = ""
  }

  async add(dato, prioridad) {
    if (!this.repetidos) {
      let temp = this.ColaPrioridad.search(this.dato)
      if (temp !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${this.dato} ya existe en la Cola`
        })
        this.dato=""
        return -1;
      }
    }
    let dibujo = document.getElementById("cuerpoDraw")
    await this.ColaPrioridad.add(dato, prioridad, dibujo, `${this.velocidad}s`)
    this.dato = ""
    this.prioridad = ""
    return 1
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
      result.NodoP.dato = this.datoModificado
      document.getElementById("nodo" + result.NodoP.identificador).innerHTML = "" + this.datoModificado
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
      data =<ColaPrioridad> JSON.parse(data)
      //ColaPrioridad es la interfaz utilizada. se puede cambiar por otra para cargar el archivo
      data.valores.forEach(async nodo => {
        await this.add(nodo.valor,nodo.prioridad)
      });
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
    let data = this.ColaPrioridad.generarJSON()
    var link = document.createElement("a");
    link.download = "ColaDePrioridad.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }


}
