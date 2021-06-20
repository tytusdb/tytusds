import { Component, OnInit, Input, ViewChild, ElementRef,AfterViewInit} from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Flecha } from '../impl-canvas/flecha';
import { FlechaCompuesta } from '../impl-canvas/flecha-compuesta';
import { RectanguloNodo } from '../impl-canvas/rectangulo-nodo';
import { Network, DataSet, Node, Edge, IdType } from 'vis';


import BST from './clase-arbol'
import * as vis from 'vis';


@Component({
  selector: 'app-abb',
  templateUrl: './abb.component.html',
  styleUrls: ['./abb.component.css']
})
export class AbbComponent implements OnInit {
  bst = new BST()
  x:string = ''

  

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  rectangulosNodos: RectanguloNodo[] = [];
  private anchoNodo=160;
  private anchoNodoHead=100;
  private altoNodo=30;
  private anchoFlecha=2;
  private colorFlecha='cyan';
  colorFondoCanvas='black';
  flechas: any[];

  
 // nombre:string = "Maria"
  //apellido:string = "Perez"
  //alumno:any = {
    //nombre: "Carlos",
    //apellido:"Najera",
    //edad:26
  //}
  //inputNuevo:string = "Hola soy un nuevo input"
  //correo:string = ''
  //password:string = ''
  constructor() { }

  ngOnInit(): void {
    
  }

  Iniciar(){
    //console.log(this.correo)
    //console.log(this.password)
  }
  
  Insertar(){
    console.log("IMPRIMIENDO EL INSERTAR")
    this.bst.insert(this.x)
    console.log(this.x)
    console.log("X no vale NADA")
    this.x = ''
    this.x = this.bst.inOrder(this.bst.root,this.x)
    console.log("----------------------")
    console.log("IMPRIMIENDO EL RETORNO DE InOrder",this.x)
    this.x = '' 
  }

  Eliminar(){
    console.log("IMPRIMIENDO EL ELIMINAR")
    this.bst.eliminar(this.x)
    console.log(this.x)
    this.x = ''
  }
  


  grafo(){
    this.bst.insert(15)
    this.bst.insert(4)
    this.bst.insert(55)
    this.bst.insert(25)
    this.bst.dot = '{'
    this.bst.dotgen(this.bst.root)
    this.bst.dot += '}'
    return this.bst.dot
  }





  borrarCanvas(){
    this.ctx.fillStyle = this.colorFondoCanvas;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.drawBorder()
    this.ctx.beginPath();
  }


  drawBorder() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.ctx.canvas.width, 0);
    this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.lineTo(0, this.ctx.canvas.height);
    this.ctx.lineTo(0, 0);
    this.ctx.strokeStyle= this.colorFlecha;
    this.ctx.stroke();
  
  }


  pintarNodos(){
    this.borrarCanvas()
    let x = 0, y=1,i=1
    let nuevoNodo,tempNodo, primerNodo;
    let animar=true;
    this.flechas=[];
    if (this.rectangulosNodos.length > 0) animar = false
    nuevoNodo= new RectanguloNodo(this.ctx, 'Inicio',x,y,this.anchoNodoHead,this.altoNodo,false,animar);
    this.rectangulosNodos = this.rectangulosNodos.concat(nuevoNodo);
    y=3; let posFlech='arriba';


  }

  InsertarPrueba(){
    console.log(this.x)
    this.bst.insert(this.x)
    console.log(this.x)
    this.bst.insert(50)
    this.bst.insert(25)
    this.bst.insert(75)
    this.bst.insert(35)
    this.bst.insert(10)//1 10 15 25 32 35 50 55 60 75 79 81
    this.bst.insert(81)
    this.bst.insert(15)
    this.bst.insert(1)
    this.bst.insert(32)
    this.bst.insert(79)
    this.bst.insert(60)
    this.bst.insert(55)
    this.x = ''
    this.x = this.bst.inOrder(this.bst.root,this.x)
    console.log("----------------------")
    var x = this.bst.search(this.bst.root,5)
    console.log("IMPRIMIENDO EL RETORNO DE InOrder",this.x)
    this.x = ''
    this.bst.eliminar(25)
    this.bst.eliminar(60)
    this.x = this.bst.inOrder(this.bst.root,this.x)
    console.log
    console.log("IMPRIMIENDO EL RETORNO DE InOrder",this.x)
    this.x = ''
  }

}
