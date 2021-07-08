import { Component, OnInit } from '@angular/core';
declare var addB:any;
declare var borrarB:any;
declare var buscarB:any;
declare var actualizarB:any;
@Component({
  selector: 'app-arbol-b',
  templateUrl: './arbol-b.component.html',
  styleUrls: ['./arbol-b.component.css']
})
export class ArbolBComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  InsertarB(val:string){
    addB(val)

  }
  eliminarB(val:string){
    borrarB(val)

  }
  buscarB(val:string){
    buscarB(val)
  }
  actualizarB(val:string,val2:string){
    actualizarB(val,val2)
  }
  getValue(){

  }

}
