import { Component, OnInit } from '@angular/core';
declare var insertarAbierta:any;
declare var buscarAbierta:any;
declare var eliminarAbierta:any;
declare var actualizaAbierta:any;

@Component({
  selector: 'app-tabla-hash-abierta',
  templateUrl: './tabla-hash-abierta.component.html',
  styleUrls: ['./tabla-hash-abierta.component.css']
})
export class TablaHashAbiertaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  insertarAbierta(data:any){
    insertarAbierta(data)
  }
  buscarAbierta(data:any){
    buscarAbierta(data)
  }
  eliminarAbierta(data:any){
    eliminarAbierta(data)

  }
  actualizaAbierta(data1:any,data2:any){
    actualizaAbierta(data1,data2)

  }
  value(){
    
  }

}
