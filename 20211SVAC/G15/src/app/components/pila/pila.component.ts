import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { pila } from 'src/app/helpers/Pila/pila';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.css']
})
export class PilaComponent implements OnInit {

  nombre: number|string
  datoBuscar: number|string
  datoAntiguo: number|string
  datoNuevo: number|string
  pila: pila
  fileName= ""

  repetidos: boolean = false
  velocidad: number = 0.5
  @ViewChild('cuerpoDraw') cuerpoDraw: ElementRef;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.pila = new pila()
    
  }
  async pushbutton(){
    await this.push(this.nombre)
    this.nombre = ""
  }

  async push(dato){
    if (!this.repetidos) {
      let temp = this.pila.search(dato)
      if (temp !== null) {
        Swal.fire({
          target: document.getElementById('form-modal'),
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${dato} ya existe en la pila`
        })
        this.nombre=""
        return -1;
      }
    }
  
    
      let dibujo = document.getElementById("cuerpoDraw")
      await this.pila.push(dato, dibujo, `${this.velocidad}s`)
      this.nombre=""
    return 1;
  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        await this.push(data[i])
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

  async buscar() {
    let busqueda = await this.pila.searchAnimation(this.datoBuscar, `${this.velocidad}s`)
    if (busqueda === null) {
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoBuscar} no existe en la pila`
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
    let datomodificar = await this.pila.searchAnimation(this.datoAntiguo, `${this.velocidad}s`)
    if (datomodificar === null) {
      Swal.fire({
        target: document.getElementById('form-modal'),
        icon: 'error',
        title: 'Oops...',
        text: `El dato ${this.datoAntiguo} no existe en la pila`
      })
      return;
    }
    if (!this.repetidos) {
      let temp = this.pila.search(this.datoNuevo)
      if (temp !== null) {
        Swal.fire({
          target: document.getElementById('form-modal'),
          icon: 'error',
          title: 'Oops...',
          text: `El dato ${this.datoNuevo} ya existe en la pila`
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

  async pop() {
    let result = await this.pila.pop(`${this.velocidad}s`)
    return 1;
  }

  generarJSON() {
    let data = this.pila.generarJSON()
    var link = document.createElement("a");
    link.download = "Pila.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }

}
