import { Component, OnInit } from '@angular/core';

declare var require:any;
let CargaArchivo=require('../../../EstructurasF2/CargarArchivo')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
let rowColMayor= require('../../../EstructurasF2/rowColMayor')
let Animaciones= require('../../../EstructurasF2/Animaciones')
@Component({
  selector: 'app-row-major',
  templateUrl: './row-major.component.html',
  styleUrls: ['./row-major.component.css']
})
export class RowMajorComponent implements OnInit {
  rcM= new rowColMayor()
  animate= new Animaciones()
  constructor() { }

  ngOnInit(): void {
  }
  leerArchivo(event: any){
    let ca= new CargaArchivo()
    ca.leerMatriz(event,2,"row")
    setTimeout(() => {
      this.rcM.convertRowmayor(ca.returnMatriz())
      this.animate.graficarMatrizUnaDimension(this.rcM.returnMatriz())
    }, 1000);
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarMatriz(this.rcM.returnValores(),"RowMajor")
  }
  insert(text:string){
    this.rcM.insertar(text)
    console.log("______________________")
    this.rcM.imprimir()
  }
  delete(text:string){
    this.rcM.delete(text)
    console.log("______________________")
    this.rcM.imprimir()
  }
  search(text:string){
    console.log(this.rcM.search(text).existe)
  }
  actualizar(textReplace:string, textNew:string){
    this.rcM.actualizar(textReplace,textNew)
    console.log("______________________")
    this.rcM.imprimir()
  }
}
