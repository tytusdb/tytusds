import { Component, OnInit } from '@angular/core';
declare var lsimplecircleAdd:any;
declare var lsimpleCircleDelete:any;

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
    lsimplecircleAdd(val)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
