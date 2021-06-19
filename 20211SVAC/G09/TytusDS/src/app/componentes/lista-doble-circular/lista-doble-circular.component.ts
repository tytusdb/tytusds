import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-doble-circular',
  templateUrl: './lista-doble-circular.component.html',
  styleUrls: ['./lista-doble-circular.component.css']
})
export class ListaDobleCircularComponent implements OnInit {

  displayVal='';
  getValue(val:string){
    console.warn(val)
    
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
