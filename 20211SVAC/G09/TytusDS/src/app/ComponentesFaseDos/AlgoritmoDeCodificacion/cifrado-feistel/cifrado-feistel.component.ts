import { Component, OnInit } from '@angular/core';

declare var require:any;
let Feistel=require('../../../EstructurasF2/Feistel')
let guardarArchivo=require('../../../EstructurasF2/guardarArchivo')
@Component({
  selector: 'app-cifrado-feistel',
  templateUrl: './cifrado-feistel.component.html',
  styleUrls: ['./cifrado-feistel.component.css']
})
export class CifradoFeistelComponent implements OnInit {
  rondas = 3
  llave="010001"
  cadena:string ="Primer"
  ingresaString:boolean = false
  a = new Feistel()
  constructor() {
    this.cadena=""
  }

  ngOnInit(): void {}
  codificar(){
    if (!this.ingresaString) {
      this.a.cifrarCadena(this.cadena,this.rondas, this.llave)
      this.a.graficar()
    } else {
      this.a.convertBinario(this.cadena,this.rondas, this.llave)
      if(this.a.returnTable().length<50){
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
