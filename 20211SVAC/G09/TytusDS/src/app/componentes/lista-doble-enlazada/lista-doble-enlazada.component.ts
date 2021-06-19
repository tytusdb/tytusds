import { Component, OnInit } from '@angular/core';
declare var hola1:any;

@Component({
  selector: 'app-lista-doble-enlazada',
  templateUrl: './lista-doble-enlazada.component.html',
  styleUrls: ['./lista-doble-enlazada.component.css']
})
export class ListaDobleEnlazadaComponent implements OnInit {
  hola(hola:any){
    hola1(hola);
  }
  
  displayVal='';
  getValue(val:string){
    console.warn(val)
    
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
