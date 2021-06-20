import { Component, OnInit } from '@angular/core';

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
