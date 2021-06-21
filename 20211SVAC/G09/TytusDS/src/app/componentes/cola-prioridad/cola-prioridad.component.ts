import { Component, OnInit } from '@angular/core';
declare var insertarPrioridad:any;

@Component({
  selector: 'app-cola-prioridad',
  templateUrl: './cola-prioridad.component.html',
  styleUrls: ['./cola-prioridad.component.css']
})
export class ColaPrioridadComponent implements OnInit {
  displayVal='';
  getValue1(val:string){
    console.warn(val)
    
  }
  getValueprioridad(val1:string,val2:string){
    insertarPrioridad(val1,val2)
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
