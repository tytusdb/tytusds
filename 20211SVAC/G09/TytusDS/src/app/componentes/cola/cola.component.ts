import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cola',
  templateUrl: './cola.component.html',
  styleUrls: ['./cola.component.css']
})
export class ColaComponent implements OnInit {
  displayVal='';

  addCola(val:string){

  }
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
