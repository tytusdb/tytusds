import { Component, OnInit } from '@angular/core';
declare var ldobleAdd:any;



@Component({
  selector: 'app-lista-doble-enlazada',
  templateUrl: './lista-doble-enlazada.component.html',
  styleUrls: ['./lista-doble-enlazada.component.css']
})
export class ListaDobleEnlazadaComponent implements OnInit {
  
  displayVal='';
  getValueDobleEnlazada(val:string){
    console.warn(val)
    var hola = ldobleAdd(val)
    this.displayVal=hola
    
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  getDelete(val:string){}
  getSearch(val:string){}
  getRefresh(val:string){}
}
