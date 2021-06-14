import { Component, OnInit } from '@angular/core';

declare var Nodo:any; 
declare var Lista:any;
declare var f1:any;
declare var add:any;
declare var print:any;
@Component({
  selector: 'app-lista-simple',
  templateUrl: './lista-simple.component.html',
  styleUrls: ['./lista-simple.component.css']
})
export class ListaSimpleComponent implements OnInit {

  //constructor() { }

  ngOnInit(): void {
  }
  onClick1(){
    f1();
    add("5");
    add("si");
    add("no");
    document.write(print());
  }

}
