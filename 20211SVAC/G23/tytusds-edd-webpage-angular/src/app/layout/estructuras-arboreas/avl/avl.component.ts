import { Component, OnInit, Input, ViewChild,ElementRef } from '@angular/core';

import { AVL } from './clas-avl';

@Component({
  selector: 'app-avl',
  templateUrl: './avl.component.html',
  styleUrls: ['./avl.component.css']
})
export class AvlComponent implements OnInit {
  bst = new AVL()
  x:string = ''

  constructor() { }

  ngOnInit(): void {
    
  }

  Insertar(){
    console.log("IMPRIMIENDO EL INSERTAR")
    this.bst.insertar(this.x)
    console.log(this.x)
    console.log("X no vale NADA")
    this.x = ''
    this.x = this.bst.inOrder(this.bst.root,this.x)
    console.log("----------------------")
    console.log("IMPRIMIENDO EL RETORNO DE InOrder",this.x)
    this.x = '' 
  }

  Eliminar(){
    console.log("IMPRIMIENDO EL ELIMINAR")
    this.bst.eliminar(this.x)
    console.log(this.x)
    this.x = ''
  }

}
