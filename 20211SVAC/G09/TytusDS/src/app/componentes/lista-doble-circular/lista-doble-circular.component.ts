import { Component, OnInit } from '@angular/core';
declare var ldobleCircleAdd:any;
declare var ldobleCircleDelete:any;
declare var ldobleCircleSearch:any;
declare var ldobleCircleRefresh:any;

@Component({
  selector: 'app-lista-doble-circular',
  templateUrl: './lista-doble-circular.component.html',
  styleUrls: ['./lista-doble-circular.component.css']
})
export class ListaDobleCircularComponent implements OnInit {

  displayVal='';
  getValue(val:string,val2:string){
    console.warn(val, val2)
    
  }
  getValorCircularDoble(val:string){
    ldobleCircleAdd(val)
  }
  CircularDobleEliminar(val:string){
    ldobleCircleDelete(val)
  }
  BuscarDatoCirularDoble(val:string){
    ldobleCircleSearch(val)

  }
  actualizarCircularDoble(val1:string,val2:string){
    ldobleCircleRefresh(val1,val2)

  }

  getValor(val:string){
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
