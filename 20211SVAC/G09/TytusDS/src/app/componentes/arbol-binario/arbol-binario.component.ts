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
