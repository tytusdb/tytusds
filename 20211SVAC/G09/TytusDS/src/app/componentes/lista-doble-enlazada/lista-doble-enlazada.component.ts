import { Component, OnInit } from '@angular/core';
declare var ldobleAdd:any;
declare var ldobleDelete:any;
declare var ldobleRefresh:any;
declare var ldobleSearch:any;



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
  
  ldobleDelete(val:string){
    ldobleDelete(val)
  }

  ldobleRefresh(val1:string,val2:string){
    ldobleRefresh(val1,val2)
  }

  ldobleSearch(val:string){
    ldobleSearch(val)
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
