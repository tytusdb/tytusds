import { Component, OnInit } from '@angular/core';
import { TablaHash, Funcion, Prueba } from '../../helpers/TablaHashCerrada/TablaHash'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-hash-cerrada',
  templateUrl: './hash-cerrada.component.html',
  styleUrls: ['./hash-cerrada.component.css']
})
export class HashCerradaComponent implements OnInit {
  numero: number | string = ''
  fileName
  tamanio: number = 3
  funcionHash: number = 1
  pruebaHash: number = 1

  maxHash: number = 60
  minHash: number = 50

  flagCreada: boolean = false

  tablaHash: TablaHash

  values: any[]

  duracion: number = 0.3

  ocupacion: number = 0

  numeroBuscar: number | string = 0

  numeroEliminar: number | string = 0

  numeroAntiguo: number | string = 0
  numeroNuevo: number | string = 0
  constructor() {
    this.values = []
  }

  ngOnInit(): void {
  }

  async add() {
    await this.agregar(this.numero)
    this.numero = ''
  }

  async agregar(value) {
    if (!this.flagCreada) {
      document.getElementById('consola').innerHTML = "Creando Tabla Hash"
      this.tablaHash = new TablaHash(this.tamanio, this.getFuncion(), this.getPrueba(), this.minHash, this.maxHash, this.values)
      this.flagCreada = true

    }

    await this.tablaHash.add(value, this.duracion)
    let ocupacion = this.tablaHash.obtenerOcupacion()
    this.ocupacion = ocupacion
    if (ocupacion >= this.minHash) {
      document.getElementById('consola').innerHTML += `<br />----------------Haciendo ReHashing-------------`
      await this.tablaHash.reHashing(this.duracion)
      this.tamanio = this.values.length
      this.ocupacion = this.tablaHash.obtenerOcupacion()
    }
  }


  async search() {
    let result = await this.tablaHash.search(this.numeroBuscar, this.duracion)
    if (result !== null) {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se econtro el numero ${this.numeroBuscar} en la posicion ${result.index} `
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No se econtro el numero ${this.numeroBuscar}  `
      })
    }
    this.numeroBuscar = ''
  }


  async delete() {
    let result = await this.tablaHash.delete(this.numeroEliminar, this.duracion)
    if (result !== null) {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se Elimino el numero ${this.numeroEliminar} en la posicion ${result.index} `
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No se econtro el numero ${this.numeroEliminar}  `
      })
    }
    this.numeroEliminar = ''
  }


  async edit() {
    let result = await this.tablaHash.edit(this.numeroAntiguo, this.numeroNuevo, this.duracion)
    if (result !== null) {
      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Se Edito el numero ${this.numeroAntiguo} por ${this.numeroNuevo} `
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ':(',
        text: `No se econtro el numero ${this.numeroAntiguo}  `
      })
    }
    this.numeroAntiguo = ''
    this.numeroNuevo = ''
  }


  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      this.tamanio = +data.m
      this.minHash = +data.minimo 
      this.maxHash = +data.maximo
      data = data.valores
      for (let i = 0; i < data.length; i++) {
        await this.agregar(data[i])
      }

      Swal.fire({
        icon: 'success',
        title: ':)',
        text: `Recorrido Completo `
      })


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

    let jsonData = this.tablaHash.getJson(this.duracion)
    var link = document.createElement("a");
    link.download = "data.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(jsonData);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }

  getFuncion(): Funcion {
    if (+this.funcionHash === 1) return Funcion.SIMPLE
    else if (+this.funcionHash === 2) return Funcion.MULTIPLICACION
    return Funcion.DIVISION
  }

  getPrueba(): Prueba {
    if (+this.pruebaHash === 1) return Prueba.LINEAL
    else if (+this.pruebaHash === 2) return Prueba.CUADRATICA
    return Prueba.DOBLE
  }




}
