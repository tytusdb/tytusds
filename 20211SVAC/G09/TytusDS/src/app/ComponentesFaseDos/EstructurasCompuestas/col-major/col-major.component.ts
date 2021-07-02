import { Component, OnInit } from '@angular/core';
declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
@Component({
  selector: 'app-col-major',
  templateUrl: './col-major.component.html',
  styleUrls: ['./col-major.component.css']
})
export class ColMajorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  leerArchivo(event: any){
    let ca= new CargaArchivo()
    ca.leerMatriz(event,2,"col")
  }
}
