import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-doble-enlazada',
  templateUrl: './lista-doble-enlazada.component.html',
  styleUrls: ['./lista-doble-enlazada.component.css']
})
export class ListaDobleEnlazadaComponent implements OnInit {

  displayVal='';
  getValue(val:string){
    console.warn(val)
    
  }
  constructor() { }

  ngOnInit(): void {
  }

}
