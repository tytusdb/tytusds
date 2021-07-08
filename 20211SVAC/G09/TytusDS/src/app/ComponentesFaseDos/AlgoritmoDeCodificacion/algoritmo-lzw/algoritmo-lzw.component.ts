import { Component, OnInit } from '@angular/core';

declare var require:any;
let LZW=require('../../../EstructurasF2/lzw')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
@Component({
  selector: 'app-algoritmo-lzw',
  templateUrl: './algoritmo-lzw.component.html',
  styleUrls: ['./algoritmo-lzw.component.css']
})
export class AlgoritmoLZWComponent implements OnInit {
  cadena:string ="Primer"
  a= new LZW()

  constructor() {this.cadena="" }

  ngOnInit(): void {
  }
  codificar(){
    this.a.cifradoLZW(this.cadena)
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
  download(){
    let dow= new guardarArchivo()
    dow.guardarTexto(this.cadena,this.a.returnCadena())
  }  
}
