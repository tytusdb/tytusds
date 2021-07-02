import { Component, OnInit } from '@angular/core';



//const Huffman=require('../../../EstructurasF2/Hamming')

@Component({
  selector: 'app-codigo-hamming',
  templateUrl: './codigo-hamming.component.html',
  styleUrls: ['./codigo-hamming.component.css']
})
export class CodigoHammingComponent implements OnInit {

  cadena:string ="Primer"

  constructor() {
    this.cadena=""
  }

  ngOnInit(): void {
  }
  codificar(){
    
  }
  leerArchivo(event: any){
    console.log(event)
    let archivo = event.target.files[0]
    if (archivo) {
      let reader= new FileReader()
      var contenido, text=""
      reader.onload = function (e) {
        contenido = e.target?.result
        console.log(contenido)
        text+=contenido?.toString()
      }
      reader.readAsText(archivo)
      setTimeout(() => {
        this.cadena+=text
      }, 500); 
    }
  }
}

