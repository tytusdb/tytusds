import { Component, OnInit } from '@angular/core';
declare var addValuePila:any;
declare var getValuePilaDelet:any;

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
  getValueCircular(val:string){
    //lsimplecircleAdd(val)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
