import { Component, OnInit } from '@angular/core';
declare var agregarBinary:any;
declare var buscarBinario:any;
declare var eliminarBinario:any;

@Component({
  selector: 'app-arbol-binario',
  templateUrl: './arbol-binario.component.html',
  styleUrls: ['./arbol-binario.component.css']
})
export class ArbolBinarioComponent implements OnInit {
  displayVal='';
  IngresarBinario(val:string){
    agregarBinary(val)
  }
  buscarBinary(val:string){
    buscarBinario(val)
  }
  eliminarBinario(val:string){
    eliminarBinario(val)

  }
  getValue(val:string){
    
  
  }
  getValuePila(val:string){
    
  }

  getValuePilaDelet(){
    

  }
  
  getValueBuscarPila(val:string){
    
  }

  getValueReemplzarPila(val:string,val2:string){
    

  }

  constructor() { }

  ngOnInit(): void {
  }

}
