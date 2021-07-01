import { Component, OnInit } from '@angular/core';
declare var insertarHashCerrada:any;
@Component({
  selector: 'app-tabla-hash-cerrada',
  templateUrl: './tabla-hash-cerrada.component.html',
  styleUrls: ['./tabla-hash-cerrada.component.css']
})
export class TablaHashCerradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  value(){
  }
  
  insertarHashCerrada(data:any){
    insertarHashCerrada(data)
  }
 
}
