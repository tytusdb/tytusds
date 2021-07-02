import { Component, OnInit } from '@angular/core';

declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
@Component({
  selector: 'app-row-major',
  templateUrl: './row-major.component.html',
  styleUrls: ['./row-major.component.css']
})
export class RowMajorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  leerArchivo(event: any){
    let ca= new CargaArchivo()
    ca.leerMatriz(event,2,"row")
  }

}
