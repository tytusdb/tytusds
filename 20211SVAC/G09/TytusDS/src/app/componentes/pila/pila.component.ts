import { Component, OnInit } from '@angular/core';
declare var addValuePila:any;
declare var getValuePilaDelet:any;
declare var getValueBuscar:any;
declare var getActualizar:any;
@Component({
  selector: 'app-pila',
  templateUrl: './pila.component.html',
  styleUrls: ['./pila.component.css']
})
export class PilaComponent implements OnInit {

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
  getValueCircular(val:string){
    //lsimplecircleAdd(val)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
