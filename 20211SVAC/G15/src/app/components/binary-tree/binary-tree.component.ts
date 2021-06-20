import { Component, OnInit } from '@angular/core';
import { BinaryTree } from '../../helpers/BinaryTree/BinaryTree'
@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements OnInit {
  public network: any
  numero: number = 0
  numeroBuscar: number = 0
  numeroViejo: number = 0
  numeroNuevo:number = 0
  numeroEliminar:number = 0


  binaryTree: BinaryTree

  constructor() { }

  ngOnInit(): void {
    this.binaryTree = new BinaryTree()
  }





  async add() {
    let contenedor = document.getElementById('tree')
    await this.binaryTree.addNode(this.numero, contenedor,'0.3s')
    this.numero = 0
  }

  async search(){
    let contenedor = document.getElementById('tree')
    let result = await this.binaryTree.search(this.numeroBuscar,'2s')
    console.log(result)
    this.numeroBuscar = 0
  }

  async update(){
    let result = await this.binaryTree.update(this.numeroViejo,this.numeroNuevo,'2s')
    console.log(result)
    this.numeroViejo = 0
    this.numeroNuevo = 0
  }

  async delete(){
    let result  = await this.binaryTree.delete(this.numeroEliminar,'2s')
    console.log(result)
    this.numeroEliminar = 0
  }

}
