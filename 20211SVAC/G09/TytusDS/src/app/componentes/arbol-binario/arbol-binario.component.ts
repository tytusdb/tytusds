import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbol-binario',
  templateUrl: './arbol-binario.component.html',
  styleUrls: ['./arbol-binario.component.css']
})
export class ArbolBinarioComponent implements OnInit {
  displayVal='';
  getValue1(val:string){
    console.warn(val)
    
  }
  getValuePila(val:string){
    addValuePila(val)
  }
  getValuePilaDelet(){
    getValuePilaDelet()

  }
  getValueBuscarPila(val:string){
    getValueBuscar(val)
  }
  getValueReemplzarPila(val:string,val2:string){
    getActualizar(val,val2)

  }

  constructor() { }

  ngOnInit(): void {
  }

}
