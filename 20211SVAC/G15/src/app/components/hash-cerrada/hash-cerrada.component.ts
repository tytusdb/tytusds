import { Component, OnInit } from '@angular/core';
import {TablaHash,Funcion,Prueba} from '../../helpers/TablaHashCerrada/TablaHash'
@Component({
  selector: 'app-hash-cerrada',
  templateUrl: './hash-cerrada.component.html',
  styleUrls: ['./hash-cerrada.component.css']
})
export class HashCerradaComponent implements OnInit {
  numero:number|string = ''
  fileName
  tamanio:number = 3
  funcionHash:number = 1
  pruebaHash:number = 1

  maxHash:number = 60 
  minHash:number = 50

  flagCreada:boolean = false

  tablaHash: TablaHash
  constructor() { }

  ngOnInit(): void {
  }

  add(){
    if(!this.flagCreada){
      this.tablaHash = new TablaHash(this.tamanio,this.getFuncion(),this.getPrueba())
      this.flagCreada = true
    }

    this.tablaHash.add(this.numero)
    
    this.numero = ''
  }


  getFuncion():Funcion{
    if(+this.funcionHash === 1) return Funcion.SIMPLE 
    else if(+this.funcionHash === 2) return Funcion.MULTIPLICACION 
    return Funcion.DIVISION
  }

  getPrueba():Prueba{
    if(+this.pruebaHash === 1) return Prueba.LINEAL
    else if(+this.pruebaHash === 2) return Prueba.CUADRATICA 
    return Prueba.DOBLE
  }




}
