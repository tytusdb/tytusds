import { Component, OnInit} from '@angular/core';


declare var require:any;
let huffman=require('../../../EstructurasF2/Huffman')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
@Component({
  selector: 'app-algoritmo-huffman',
  templateUrl: './algoritmo-huffman.component.html',
  styleUrls: ['./algoritmo-huffman.component.css']
})
export class AlgoritmoHuffmanComponent implements OnInit {

  cadena:string ="Primer"
  a= new huffman()
  constructor() {
    this.cadena=""
  }

  ngOnInit(): void {}
  codificar(){
      this.a.tableFrecuencias(this.cadena)
      //a.graficar()
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
