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


  binaryTree: BinaryTree

  constructor() { }

  ngOnInit(): void {
    this.binaryTree = new BinaryTree()
  }





  add() {
    let contenedor = document.getElementById('tree')
    console.log(this.binaryTree.addNode(this.numero, contenedor,'2s'))
  }

}
