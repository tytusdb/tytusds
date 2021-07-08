import { Component, OnInit } from '@angular/core';

declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
let Matricesdisp= require('../../../EstructurasF2/Matricesdisp')
let Animaciones= require('../../../EstructurasF2/Animaciones')
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
    this.md.graficar()
    }, 600);
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarMatriz(this.md.returnValores(),"Matriz Dispersa")
  }
  insert(text:string, x:string, y:string){
    this.md.insertar(text,parseInt(x),parseInt(y))
    console.log("______________________")
    this.md.imprimir_horizontal()
  }
  delete(text:string){
    this.md.delete(text)
    console.log("______________________")
    this.md.imprimir_horizontal()
  }
  search(text:string){
    console.log(this.md.search(text).existe)
  }
  actualizar(textReplace:string, textNew:string){
    this.md.actualizar(textReplace,textNew)
    console.log("______________________")
    this.md.imprimir_horizontal()
  }
}
