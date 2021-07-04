import { Component, OnInit } from '@angular/core';
declare var insertarAbierta:any;

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
  value(){
    
  }

}
