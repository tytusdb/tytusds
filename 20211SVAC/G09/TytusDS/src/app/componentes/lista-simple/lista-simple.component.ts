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
    //print()
    //Lista.print()
    //Lista.add("574");
    //document.write("Imprime");
    f1();
    
    //document.write(Lista.print());
    
  }

}
