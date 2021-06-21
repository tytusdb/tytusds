import { Component, OnInit } from '@angular/core';

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
