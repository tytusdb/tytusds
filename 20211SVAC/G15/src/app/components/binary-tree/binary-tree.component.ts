import { Component, OnInit } from '@angular/core';
import { BinaryTree } from '../../helpers/BinaryTree/BinaryTree'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements OnInit {
  public network: any
  numero: number | string = 0
  numeroBuscar: number | string = 0
  numeroViejo: number | string = 0
  numeroNuevo: number | string = 0
  numeroEliminar: number | string = 0
  duracion: number = 0.3
  repetidos: boolean = true

  binaryTree: BinaryTree

  fileName = '';

  constructor() { }

  ngOnInit(): void {
    this.binaryTree = new BinaryTree()
  }





  async add() {
    await this.addData(this.convertir(this.numero))
    this.numero = 0

  }

  async search() {
    let result = await this.binaryTree.search(this.convertir(this.numeroBuscar), this.duracion + 's')
    if (result === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El numero ${this.numeroBuscar} no existe en el arbol`
      })
      return;
    }

    Swal.fire({
      icon: 'success',
      title: ':)',
      text: `Se econtro el numero ${this.numeroBuscar} `
    })
    this.numeroBuscar = 0
  }

  async update() {
    let result = await this.binaryTree.update(this.convertir(this.numeroViejo), this.convertir(this.numeroNuevo), this.duracion + 's',true)
    console.log(result)
    this.numeroViejo = 0
    this.numeroNuevo = 0
  }

  async delete() {
    let result = await this.binaryTree.delete(this.numeroEliminar, this.duracion + 's',true)
    console.log(result)
    this.numeroEliminar = 0
  }

  async addData(numero) {
    let contenedor = document.getElementById('tree')
    if (!this.repetidos) {
      let resultado = this.binaryTree.searchWithOutAnimation(this.convertir(numero))
      if (resultado !== null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El numero ${numero} ya existe en el arbol`
        })
        return;
      }
    }
    await this.binaryTree.addNode(this.convertir(numero), contenedor, this.duracion + 's',true)
    return 1
  }

  async onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {

      this.fileName = file.name;
      let data: any = await this.processFile(file)
      data = JSON.parse(data)
      this.duracion = +data.animacion
      this.repetidos = data.repeticion
      data = data.valores
      for (let i = 0; i < data.length; i++) {

        await this.addData(data[i])
        await this.sleep(this.duracion * 1000)
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
    let data = {
      categoria: "Estructura Arboreas",
      nombre: "ABB",
      repeticion: this.repetidos,
      animacion: this.duracion,
      valores: this.binaryTree.generarJSON()
    }
    let jsonData = JSON.stringify(data)
    var link = document.createElement("a");
    link.download = "data.json";
    var info = "text/json;charset=utf-8," + encodeURIComponent(jsonData);
    link.href = "data:" + info;
    link.click();
    link.remove()
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  convertir(dato) {
    if (isNaN(dato)) return dato
    return +dato
  }
}
