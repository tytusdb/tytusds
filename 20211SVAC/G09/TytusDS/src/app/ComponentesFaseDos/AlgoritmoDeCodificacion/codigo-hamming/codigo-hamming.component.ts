import { Component, OnInit } from '@angular/core';

declare var require:any;
let Hamming=require('../../../EstructurasF2/Hamming')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')


@Component({
  selector: 'app-codigo-hamming',
  templateUrl: './codigo-hamming.component.html',
  styleUrls: ['./codigo-hamming.component.css']
})
export class CodigoHammingComponent implements OnInit {

  cadena:string ="Primer"
  ingresaString:boolean = false
  a= new Hamming()
  constructor() {
    this.cadena=""
  }

  ngOnInit(): void {}
  codificar(){
    if (!this.ingresaString) {
      this.a.Hamming(this.cadena)
      this.a.graficar()
    } else {
      this.a.HammingCadena(this.cadena)
      if(this.a.returnMatriz().length<50){
        this.a.graficar()
      }else{
        console.log("No se grafica por que la Matriz es muy grande")
      }
    }
  }
  leerArchivo(event: any){
    console.log(event)
    let archivo = event.target.files[0]
    if (archivo) {
      let reader= new FileReader()
      var contenido, text=""
      reader.onload = function (e) {
        contenido = e.target?.result
        text+=contenido?.toString()
      }
      reader.readAsText(archivo)
      setTimeout(() => {
        this.cadena+=text
      }, 500); 
    }
  }
  checkString(){
    this.ingresaString=!this.ingresaString
  }
  download(){
    let dow= new guardarArchivo()
    dow.guardarTexto(this.cadena,this.a.returnCadena())
  }
}