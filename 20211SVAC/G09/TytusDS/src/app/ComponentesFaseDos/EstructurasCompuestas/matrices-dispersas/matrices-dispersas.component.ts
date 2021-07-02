import { Component, OnInit } from '@angular/core';

declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')

@Component({
  selector: 'app-matrices-dispersas',
  templateUrl: './matrices-dispersas.component.html',
  styleUrls: ['./matrices-dispersas.component.css']
})
export class MatricesDispersasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  leerArchivo(event: any){
    //debugger
    let ca= new CargaArchivo()
    ca.leerMatriz(event,1)
  }
}
