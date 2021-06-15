import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ListaSimpleEnlazada from './impl-estructuras/lista-simple-enlaz';
import ListaPadre from './impl-estructuras/lista-padre';
import Pila from './impl-estructuras/pila';
import Cola from './impl-estructuras/cola';
import ListaDobleEnlazada from './impl-estructuras/lista-doble-enlaz';
import ListaCircularSimple from './impl-estructuras/lista-circular-simple';
import ListaCircularDoble from './impl-estructuras/lista-circular-doble';
import { routerTransition } from '../../router.animations';
import { RectanguloNodo, Flecha } from './impl-canvas/square';
import { Subscription } from 'rxjs';
import {JsonNodo} from './impl-estructuras/json-nodo'

@Component({
  selector: 'app-listas-edd',
  templateUrl: './listas-edd.component.html',
  styleUrls: ['./listas-edd.component.css'],
    animations: [routerTransition()]
})
export class ListasEddComponent implements OnInit {
  paramsSubscription: Subscription;
  private idTipoLista=0;
  listaEnlArray:string[]=[];
  listaEnlJSon:string;
  listaEnlazada:ListaPadre;
  public radioData: any; 
  opcionOperar: string;
  valorNodoInsertar:string;
  valorIndiceActualizar:string;
  valorNodoActualizar:string;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  rectangulosNodos: RectanguloNodo[] = [];
  private anchoNodo=160;
  private anchoNodoHead=100;
  private altoNodo=30;
  private anchoFlecha=2;
  tituloLista:string;
  lblBtnAgregar:string;
  lblBtnBorrar:string;
  strCarga:string;

  //constructor(private ngZone: NgZone) { }
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idTipoLista = +params['idTipoLista'];
      switch(this.idTipoLista){
        case 1:this.tituloLista="Lista simple enlazada"; this.lblBtnAgregar="Agregar";
                this.lblBtnBorrar="Borrar"; this.listaEnlazada = new ListaSimpleEnlazada();
                this.cambiarPagina();
                break; 
        case 2:this.tituloLista="Lista doble enlazada"; this.lblBtnAgregar="Agregar";
                this.lblBtnBorrar="Borrar"; this.listaEnlazada = new ListaDobleEnlazada();
                this.cambiarPagina();
                break; 
        case 3:this.tituloLista="Lista circular simplemente enlazada"; this.lblBtnAgregar="Agregar";
                this.lblBtnBorrar="Borrar"; this.listaEnlazada = new ListaCircularSimple();
                this.cambiarPagina();
                break; 
        case 4:this.tituloLista="Lista circular doblemente enlazada";this.lblBtnAgregar="Agregar";
                this.lblBtnBorrar="Borrar"; this.listaEnlazada = new ListaCircularDoble();
                this.cambiarPagina();
                break; 
        case 5:this.tituloLista="Pila"; this.lblBtnAgregar="Push";
                this.lblBtnBorrar="Pop"; this.listaEnlazada = new Pila();
                this.cambiarPagina();
                break; 
        case 6:this.tituloLista="Cola"; this.lblBtnAgregar="Encolar";
                this.lblBtnBorrar="Descencolar"; this.listaEnlazada = new Cola();
                this.cambiarPagina();
                break; 
      }
    });
    this.listaEnlJSon="";
    this.radioData = 1;
    this.opcionOperar='Inicio';
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    //this.ngZone.runOutsideAngular(() => this.tick());
    /*setInterval(() => {
      this.tick();
    }, 200);*/
  }
  cambiarPagina(){
    this.borrarCanvas();
    this.listaEnlJSon='';
    this.valorIndiceActualizar='';
    this.valorNodoActualizar='';
  }
  borrarCanvas(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  actualizarListaStr(){
    this.listaEnlArray = this.listaEnlazada.toArray();
    let i =0;
    let jsonNodoArray= new JsonNodo("Estructura Lineal",this.tituloLista,this.listaEnlArray);
    /*for (let valor of this.listaEnlArray){
      let jsonNodo = new JsonNodo(i,valor); i++;
      jsonNodoArray.push(jsonNodo);
    }*/
    this.listaEnlJSon = JSON.stringify(jsonNodoArray);
  }
  clickAgregarNodo() {
    if(this.valorNodoInsertar!=null && this.valorNodoInsertar!=''){
      this.agregarNodo(this.valorNodoInsertar);
      this.valorNodoInsertar='';
    }
  }
  agregarNodo(valorInsertar:string){
    //Si no es pila o cola, aplica si inserta al inicio o final
    if(this.idTipoLista>=1&&this.idTipoLista<=4){
      if(this.opcionOperar=='Inicio'){
        this.listaEnlazada.agregarAlInicio(valorInsertar);
      }
      else{
        this.listaEnlazada.agregarAlFinal(valorInsertar);
      }
    }else{
      this.listaEnlazada.push(valorInsertar);
    }
    this.actualizarListaStr();
    this.pintarNodos();
  }
  clickActualizarNodo(){
    this.listaEnlazada.actualizar(this.valorIndiceActualizar, this.valorNodoActualizar);
    this.actualizarListaStr();
    this.pintarNodos();
  }
  clickBorrarNodo(){
    //Si no es pila o cola, aplica borrar al inicio o final
    if(this.idTipoLista>=1&&this.idTipoLista<=4){
      if(this.opcionOperar=='Inicio'){
        this.listaEnlazada.borrarAlInicio();
      }
      else{ 
        this.listaEnlazada.borrarAlFinal();
      }
    }else{
      this.listaEnlazada.pop();
    }
    this.actualizarListaStr();
    this.pintarNodos();
  }

//'[{"indice":1,"valor":"5"},{"indice":2,"valor":"10"}]';
  clickCargar(){
    let strIntoObj = JSON.parse(this.strCarga);
    console.log(strIntoObj);
    for (let valorStrNodo of strIntoObj.valores) {
      this.agregarNodo(valorStrNodo);
    }
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.rectangulosNodos.forEach((square: RectanguloNodo) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }
  /*Se borra canvas, se recorre lista dinamica pintando los nodos y flechas*/ 
  pintarNodos(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    let x=0,y=1;
    let nuevoNodo,tempNodo;
    nuevoNodo= new RectanguloNodo(this.ctx, 'Inicio',x,y,this.anchoNodoHead,this.altoNodo);
    y=3;
    for (let valorStrNodo of this.listaEnlArray) {
      tempNodo=nuevoNodo;
      nuevoNodo= new RectanguloNodo(this.ctx, valorStrNodo, x,y,this.anchoNodo,this.altoNodo);
      if(tempNodo!=null&&nuevoNodo!=null){
        let flecha1= new Flecha(this.ctx,  tempNodo.xCola, tempNodo.yCola, nuevoNodo.xHead,
           nuevoNodo.yCola,this.anchoFlecha, 'black');
        tempNodo.drawText(); nuevoNodo.drawText();
      }
      x+=1.5;
      if(x*this.anchoNodo>=900){
        y+=2; x=0;
      }
    }
    
  }

  play() {
    //const square = new Square(this.ctx, this.valorNodoInsertar);
    //this.squares = this.squares.concat(square);
  }

  ngOnDestroy() {
    //clearInterval(this.interval);
    //cancelAnimationFrame(this.requestId);
  }

}
