import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import ListaSimpleEnlazada from './lista-simple-enlaz';
import NodoSimple from './nodo-simple';
import { routerTransition } from '../../../router.animations';
import { Square } from './square';


@Component({
  selector: 'app-lista-simple-enlaz',
  templateUrl: './lista-simple-enlaz.component.html',
  styleUrls: ['./lista-simple-enlaz.component.css'],
    animations: [routerTransition()]
})
export class ListaSimpleEnlazComponent implements OnInit {
  listaEnlArray:string[]=[];
  listaEnlJSon:string;
  listaEnl:ListaSimpleEnlazada;
  public radioData: any; 
  opcionOperar: string;
  valorNodoInsertar:string;
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  requestId;
  interval;
  squares: Square[] = [];

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.radioData = 1;
    this.listaEnl = new ListaSimpleEnlazada();
    this.opcionOperar='Inicio';
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick();
    }, 200);
  }
  actualizarListaStr(){
    this.listaEnlArray = this.listaEnl.toArray();
    this.listaEnlJSon = JSON.stringify(this.listaEnlArray);
  }

  clickAgregarNodo(valorInsertar:string) {
    if(this.valorNodoInsertar!=null && this.valorNodoInsertar!=''){
      console.log('it does nothing',this.valorNodoInsertar);
      if(this.opcionOperar=='Inicio'){
        this.listaEnl.addFirst(this.valorNodoInsertar);
        this.actualizarListaStr();
      }
      else{
        this.listaEnl.addLast(this.valorNodoInsertar);
        this.actualizarListaStr();
      }
      this.valorNodoInsertar='';
    }
  }

  clickBorrarNodo(){
    if(this.opcionOperar=='Inicio'){
      this.listaEnl.deleteFirst();
      this.actualizarListaStr();
    }
    else{
      this.listaEnl.deleteLast();
      this.actualizarListaStr();
    }
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.squares.forEach((square: Square) => {
      square.moveRight();
    });
    this.requestId = requestAnimationFrame(() => this.tick);
  }

  play() {
    const square = new Square(this.ctx, this.valorNodoInsertar);
    this.squares = this.squares.concat(square);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }

}
