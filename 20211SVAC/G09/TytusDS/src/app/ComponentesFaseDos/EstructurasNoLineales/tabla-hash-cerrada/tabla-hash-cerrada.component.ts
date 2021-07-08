import { Component, OnInit } from '@angular/core';
declare var insertarHashCerrada:any;
declare var eliminarHash:any;
declare var BuscarHash:any;
declare var ReemplazarHash:any;
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
  eliminarHashCerra(data:any){
    eliminarHash(data)
  }
  buscarHashCerrada(data:any){
    BuscarHash(data);
  }

  reemplazarHash(data1:any,data2:any){
    ReemplazarHash(data1,data2)
  }
 
}
