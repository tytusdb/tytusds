import { Component, OnInit } from '@angular/core';

declare var require:any;
let Feistel=require('../../../EstructurasF2/Feistel')
@Component({
  selector: 'app-cifrado-feistel',
  templateUrl: './cifrado-feistel.component.html',
  styleUrls: ['./cifrado-feistel.component.css']
})
export class CifradoFeistelComponent implements OnInit {
  rondas = 3
  cadena:string ="Primer"
  ingresaString:boolean = false
  constructor() {
    this.cadena=""
  }

  ngOnInit(): void {}
  codificar(){
    let a= new Feistel()
    if (!this.ingresaString) {
      a.cifrarCadena(this.cadena,this.rondas)
      a.graficar()
    } else {
      a.convertBinario(this.cadena,this.rondas)
      if(a.returnTable().length<50){
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
