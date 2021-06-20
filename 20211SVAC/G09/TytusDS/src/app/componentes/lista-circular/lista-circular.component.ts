import { Component, OnInit } from '@angular/core';
declare var lsimpleCircleAdd:any;
declare var lsimpleCircleDelete:any;
declare var lsimpleCircleSearch:any;

@Component({
  selector: 'app-lista-circular',
  templateUrl: './lista-circular.component.html',
  styleUrls: ['./lista-circular.component.css']
})
export class ListaCircularComponent implements OnInit {

  displayVal='';
  getValue1(val:string){
    console.warn(val)
    
  }
  getValuelsimpleCircleDelete(val:string){
    lsimpleCircleDelete(val)
  }
  getValueCircular(val:string){
    lsimpleCircleAdd(val)
  }
  getValueSearch(val:string){
    lsimpleCircleSearch(val)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
