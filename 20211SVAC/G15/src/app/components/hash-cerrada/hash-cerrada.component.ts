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
    if (!this.flagCreada) {
      document.getElementById('consola').innerHTML = "Creando Tabla Hash"
      this.tablaHash = new TablaHash(this.tamanio, this.getFuncion(), this.getPrueba(), this.minHash, this.maxHash, this.values)
      this.flagCreada = true

    }

    await this.tablaHash.add(this.numero, this.duracion)
    let ocupacion = this.tablaHash.obtenerOcupacion()
    this.ocupacion = ocupacion
    if (ocupacion >= this.minHash) {
      document.getElementById('consola').innerHTML += `<br />----------------Haciendo ReHashing-------------`
      await this.tablaHash.reHashing(this.duracion)
      this.tamanio = this.values.length
      this.ocupacion = this.tablaHash.obtenerOcupacion()
    }
    this.numero = ''
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
    let result = await this.tablaHash.edit(this.numeroAntiguo,this.numeroNuevo, this.duracion)
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
