import { Component, OnInit } from '@angular/core';

declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
let Matricesdisp= require('../../../EstructurasF2/Matricesdisp')
@Component({
  selector: 'app-matrices-dispersas',
  templateUrl: './matrices-dispersas.component.html',
  styleUrls: ['./matrices-dispersas.component.css']
})
export class MatricesDispersasComponent implements OnInit {

  md= new Matricesdisp()
  a= new CargaArchivo()
  constructor() { }

  ngOnInit(): void {
  }
  leerArchivo(event: any){
    this.a.leerMatriz(event,1, null)
    setTimeout(() => {
      let Matriz=this.a.returnMatriz()
      for (let i = 0; i < Matriz.length; i++) {
      this.md.insertar(Matriz[i].valor,Matriz[i].x,Matriz[i].y)
    }
    this.md.imprimir_horizontal()
    }, 600);
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarMatriz(this.md.returnValores(),"Matriz Dispersa")
  }
}
