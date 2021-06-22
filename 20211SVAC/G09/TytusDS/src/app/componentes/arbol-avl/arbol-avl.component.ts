import { Component, OnInit } from '@angular/core';
declare var insertarAvl:any;
declare var removerAvl:any;
declare var buscarAvl:any;
declare var actualizarAvl:any;

@Component({
  selector: 'app-arbol-avl',
  templateUrl: './arbol-avl.component.html',
  styleUrls: ['./arbol-avl.component.css']
})
export class ArbolAvlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  insertarAVL(val:string){
    insertarAvl(val)

  }
  eliminarAVL(val:string){
    removerAvl(val)
  }
  buscarAVL(val:string){
    buscarAvl(val)
  }
  actualizarDato(val:string){
    actualizarAvl(val)
  }
  getValue(){

  }

}
