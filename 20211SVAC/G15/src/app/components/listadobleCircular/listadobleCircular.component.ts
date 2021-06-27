import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ListaDobleCircular } from '../../helpers/DobleEnlazadaCircular/ListaDobleCircular'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ListaDobleCircular',
  templateUrl: './ListaDobleCircular.component.html',
  styleUrls: ['./ListaDobleCircular.component.css']
})
export class ListaDobleCircularComponent implements OnInit {
  numero: number|string
  numeroBuscar: number|string
  numeroEliminar: number|string
  numeroAntiguo: number|string
  numeroNuevo: number|string
  ListaDobleCircular: ListaDobleCircular
  svg1

  repetidos: boolean = false
  velocidad: number = 0.5
  alfinal: boolean = true
  alinicio: boolean = false
  ordenado: boolean = false

  fileName = '';


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

  async addLast() {
    let result = await this.addData(this.convertir(this.numero))
    if (result === -1) return
    this.numero = 0
  }

  async addData(numero) {
    if (!this.repetidos) {
      let temp = this.ListaDobleCircular.search(this.convertir(numero))
      if (temp !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El numero ${numero} ya existe en la lista`
        })
        return -1;
      }
    }
    if (this.alfinal) {
      let dibujo = document.getElementById("cuerpoDraw")
      await this.ListaDobleCircular.add(this.convertir(numero), this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.alinicio) {
      let dibujo = document.getElementById("cuerpoDraw")
      await this.ListaDobleCircular.addAlInicio(this.convertir(numero), this.svg1, dibujo, `${this.velocidad}s`)
    }

    if (this.ordenado) {
      let dibujo = document.getElementById("cuerpoDraw")
      await this.ListaDobleCircular.addOrdenado(this.convertir(numero), this.svg1, dibujo, `${this.velocidad}s`)
    }
    return 1
  }


  async search() {
    let result = await this.ListaDobleCircular.searchAnimation(this.convertir(this.numeroBuscar), `${this.velocidad}s`)
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
    let result = await this.ListaDobleCircular.eliminar(this.convertir(this.numeroEliminar), `${this.velocidad}s`, this.svg1)
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
    let result = await this.ListaDobleCircular.searchAnimation(this.convertir(this.numeroAntiguo), `${this.velocidad}s`)
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El numero ${this.numeroAntiguo} no existe en la lista`
      })
      return;
    }
    result.nodo.setNumero(this.convertir(this.numeroNuevo))
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


  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data:any = await this.processFile(file)
      data = JSON.parse(data)
      data = data.valores
      for(let i = 0; i < data.length; i++){
        await this.addData(data[i])
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


  generarJSON(){
    let data = this.ListaDobleCircular.generarJSON()
    var link = document.createElement("a");
    link.download = "data.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(data);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }

  convertir(dato){
    if(isNaN(dato)) return dato
    return +dato
  }

}


