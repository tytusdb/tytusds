import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-circular',
  templateUrl: './lista-circular.component.html',
  styleUrls: ['./lista-circular.component.css']
})
export class ListaCircularComponent implements OnInit {

  displayVal='';
  getValue(val:string){
    console.warn(val)
    
    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
