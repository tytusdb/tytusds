import { Component, OnInit } from '@angular/core';
declare var ldobleCircleAdd:any;

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

  getValor(){
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
