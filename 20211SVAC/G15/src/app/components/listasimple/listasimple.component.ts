import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { listaSimple } from 'src/app/helpers/SimpleEnlazada/listaSimple';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listasimple',
  templateUrl: './listasimple.component.html',
  styleUrls: ['./listasimple.component.css']
})
export class ListasimpleComponent implements OnInit {
  nombre: number|string
  datoBuscar: number|string
  datoEliminar: number|string
  datoAntiguo: number|string
  datoNuevo: number|string
  lista: listaSimple
  svg1
  fileName= ""
  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false
  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.lista = new listaSimple()
    this.svg1 = document.getElementById("svg")
    this.svg1.style.position = 'absolute';
    this.svg1.style.top = '0';
    this.svg1.style.left = '0';
    this.svg1.style.width = '100%';
    this.svg1.style.height = '100vh';
    this.svg1.style.zIndex = '0';
  }
  async insertanButton(){
    await this.insertar(this.nombre)
    this.nombre = ""
  }

  async eliminar() {
    let result = await this.lista.Delete(this.datoEliminar, `${this.velocidad}s`, this.svg1)
    if (result === -1) {
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El Dato ${this.datoEliminar} no existe en la lista`
      })
      return;
    }
    this.datoEliminar = ""
  }

  async insertar(dato) {
    if (!this.repetidos) {
      let temp = this.lista.search(dato)
      if (temp !== null) {
        Swal.fire({
          target: document.getElementById('form-modal'),
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${dato} ya existe en la lista`
        })
        this.nombre = ""
        return -1;
      }
    }
    if (this.alfinal) {
      let dibujo = document.getElementById("cuerpoDraw")
      await this.lista.InsertarFinal(dato, this.svg1, dibujo, `${this.velocidad}s`)
      this.nombre = ""
    }
    if (this.alinicio) {
      let dibujo = document.getElementById("cuerpoDraw")
      await this.lista.InsertarInicio(dato, this.svg1, dibujo, `${this.velocidad}s`)
      this.nombre = ""
    }
    if (this.ordenado) {
      let dibujo = document.getElementById("cuerpoDraw")
      await this.lista.InsertarOrden(dato, this.svg1, dibujo, `${this.velocidad}s`)
      this.nombre = ""
    }
    


    return 1
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
  async buscar() {
    let busqueda = await this.lista.searchAnimation(this.datoBuscar, `${this.velocidad}s`)
    if (busqueda === null) {
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoBuscar} no existe en la Lista`
      })
      this.datoBuscar = ""
      return;
    }
    Swal.fire({
      target: document.getElementById('form-modal'),
      icon: 'success',
      title: ':)',
      text: `Se econtro el dato ${this.datoBuscar} en la posicion ${busqueda.index}`
    })
    this.datoBuscar = ""
    return;

  }

  async modificar() {
    let datomodificar = await this.lista.searchAnimation(this.datoAntiguo, `${this.velocidad}s`)
    if (datomodificar === null) {
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoAntiguo} no existe en la Lista`
      })
      return;
    }
    if (!this.repetidos) {
      let temp = this.lista.search(this.datoNuevo)
      if (temp !== null) {
        Swal.fire({
          target: document.getElementById('form-modal'),
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${this.datoNuevo} ya existe en la Lista`
        })
        this.datoNuevo=""
        this.datoAntiguo=""
        return -1;
      }
    }

    datomodificar.nodo.setDato(this.datoNuevo)
    document.getElementById("nodo" + datomodificar.nodo.getId()).innerHTML = "" + this.datoNuevo
    this.datoAntiguo = ""
    this.datoNuevo = ""
  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        await this.insertar(data[i])
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
    let data = this.lista.generarJSON()
    var link = document.createElement("a");
    link.download = "ListaSimple.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }


}
