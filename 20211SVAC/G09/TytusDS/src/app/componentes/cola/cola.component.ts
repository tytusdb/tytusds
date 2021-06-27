import { Component, OnInit } from '@angular/core';
declare var adDCola:any;
declare var DeletCola:any;
declare var buscarCola:any;
declare var actualizarCOla:any;

@Component({
  selector: 'app-cola',
  templateUrl: './cola.component.html',
  styleUrls: ['./cola.component.css']
})
export class ColaComponent implements OnInit {
  displayVal='';

  addCola(val:string){
    adDCola(val)
  }
  eliminarCola(){
    DeletCola()

  }
  getValueActualizarCola(var1:string,var2:string){
    actualizarCOla(var1,var2)

  }
  getValue1(val:string){
    console.warn(val)
    
  }
  buscarCola(val:string){
    buscarCola(val)

  }
  getValuelsimpleCircleDelete(val:string){
    //lsimpleCircleDelete(val)
  }
  getValueCircular(val:string){
    //lsimplecircleAdd(val)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
