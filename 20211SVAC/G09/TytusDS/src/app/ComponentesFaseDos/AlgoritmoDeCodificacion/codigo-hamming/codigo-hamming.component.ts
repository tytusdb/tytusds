import { Component, OnInit } from '@angular/core';

declare var require:any;
let Hamming=require('../../../EstructurasF2/Hamming')

@Component({
  selector: 'app-codigo-hamming',
  templateUrl: './codigo-hamming.component.html',
  styleUrls: ['./codigo-hamming.component.css']
})
export class CodigoHammingComponent implements OnInit {

  cadena:string ="Primer"
  ingresaString:boolean = false
  constructor() {
    this.cadena=""
  }

  ngOnInit(): void {}
  codificar(){
    let a= new Hamming()
    if (!this.ingresaString) {
      a.Hamming(this.cadena)
      a.graficar()
    } else {
      a.HammingCadena(this.cadena)
      if(a.returnMatriz().length<50){
        a.graficar()
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
    //console.log(this.ingresaString)
  }
}

