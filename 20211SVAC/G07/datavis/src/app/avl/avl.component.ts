import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
//import { FormControl } from '@angular/forms';

var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
let arbolData =  {nodes: nodes, edges: edges};

  class Nodo{
  valor: number;
  izquierdo: Nodo;
  derecho: Nodo;
  altura: number;
  constructor(valor){
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;
    this.altura = 0;
  }
  }

  class AVL{
  raiz: Nodo;
  constructor(){
    this.raiz = null;
  }
  }
@Component({
  selector: 'app-avl',
  templateUrl: './avl.component.html',
  styleUrls: ['./avl.component.css']
})
export class AvlComponent implements OnInit {

  
  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  avl = new AVL();
  public network: any;
  //NvVal = new FormControl('');
  constructor() { }
  anterior = 0;

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    var options = {
      layout: {
        hierarchical: {
          direction: "UD",
          sortMethod: "directed"
        },
      },
      edges: {
        arrows: "to",
      },
    };

    var container = this.el.nativeElement;
    this.network = new vis.Network(container,arbolData,options);
  }

  MAXIMO(v1, v2) {
    if (v1 > v2) return v1;
    return v2;
  }

  altura(nodo) {
    if (nodo == null) return -1;
    return nodo.altura;
  }
  insercion(valor){
    
      let conversion = Number(valor);
      this.insertar(conversion);
      this.preOrden();
  }
  insertar(valor:number) {
    this.avl.raiz = this.add(valor, this.avl.raiz);
  }

  add(valor:number, nodo:Nodo) {
    if (nodo == null){
      let value = valor.toString();
      
        return new Nodo(valor);
    } 
    else {
        if (valor < nodo.valor) {
          this.anterior = nodo.valor;
            nodo.izquierdo = this.add(valor, nodo.izquierdo)
            if (this.altura(nodo.derecho) - this.altura(nodo.izquierdo) == -2) {
                if (valor < nodo.izquierdo.valor) {
                    nodo = this.RotIzquierda(nodo);
                    // edges.remove(nodo.izquierdo.valor);
                    // edges.remove(nodo.valor);
                    // edges.update(
                    // {from:nodo.valor, to: nodo.izquierdo.valor, length:10,id:nodo.izquierdo.valor}
                    // );
                    // edges.update(
                    // {from:nodo.valor, to: nodo.derecho.valor, length:10, id:nodo.derecho.valor}
                    //  );
                } else {
                    nodo = this.RotDobIzquierda(nodo);
                    // edges.clear();
                    // edges.update(
                    // {from:nodo.valor, to: nodo.izquierdo.valor, length:10, id:nodo.valor}
                    // );
                    // edges.update(
                    // {from:nodo.valor, to: nodo.derecho.valor, length:10, id:nodo.valor}
                    //  );
                }
            }
        } else if (valor > nodo.valor) {
         this.anterior = nodo.valor;
            nodo.derecho = this.add(valor, nodo.derecho);
            if (this.altura(nodo.derecho) - this.altura(nodo.izquierdo) == 2) {
                if (valor > nodo.derecho.valor) {
                    nodo = this.RotDerecha(nodo);
                    // edges.clear();
                    // edges.update(
                    // {from:nodo.valor, to: nodo.izquierdo.valor, length:10, id:nodo.valor}
                    // );
                    // edges.update(
                    // {from:nodo.valor, to: nodo.derecho.valor, length:10, id:nodo.valor}
                    //  );
                } else {
                    nodo = this.RotDobDerecha(nodo);
                    // edges.clear();
                    // edges.update(
                    // {from:nodo.valor, to: nodo.izquierdo.valor, length:10, id: nodo.valor}
                    // );
                    // edges.update(
                    // {from:nodo.valor, to: nodo.derecho.valor, length:10, id: nodo.valor}
                    //  );
                }
            }
        } else {
            nodo.valor = valor;
        }
    }
    nodo.altura = this.MAXIMO(this.altura(nodo.izquierdo), this.altura(nodo.derecho)) + 1
    return nodo;
  }



  RotIzquierda(nodo) {
    let aux = nodo.izquierdo;
    nodo.izquierdo = aux.derecho;
    aux.derecho = nodo;
    nodo.altura = this.MAXIMO(this.altura(nodo.derecho), this.altura(nodo.izquierdo)) + 1;
    aux.altura = this.MAXIMO(this.altura(nodo.izquierdo), nodo.altura) + 1;
    return aux;
    
  }

  RotDobIzquierda(nodo) {
    nodo.izquierdo = this.RotDerecha(nodo.izquierdo);
    return this.RotIzquierda(nodo);
  }

  RotDerecha(nodo) {
    var aux = nodo.derecho;
    nodo.derecho = aux.izquierdo;
    aux.izquierdo = nodo;
    nodo.altura = this.MAXIMO(this.altura(nodo.derecho), this.altura(nodo.izquierdo)) + 1;
    aux.altura = this.MAXIMO(this.altura(nodo.derecho), nodo.altura) + 1;
    return aux;
  }

  RotDobDerecha(nodo) {
    nodo.derecho = this.RotIzquierda(nodo.derecho);
    return this.RotDerecha(nodo);
  }


  preOrden() {
    console.log("Impresion \n")
    this.pre_orden(this.avl.raiz);
  }

  pre_orden(nodo) {
   
    if (nodo != null) {
        
        console.log("Valor:", nodo.valor);
        if(nodo.izquierdo != null || nodo.derecho != null){
          edges.clear();
          nodes.clear();
          let text = nodo.valor;
          text = text.toString();
          nodes.add(
            {id:nodo.valor, label:text}
          );

          if(nodo.izquierdo!=null){
            
            console.log("Iz "+nodo.izquierdo.valor)
            nodes.add(
              {id:nodo.izquierdo.valor, label:nodo.izquierdo.valor.toString()}
            );
            edges.add(
              {from:nodo.valor, to: nodo.izquierdo.valor, length:10}
            );
          }
          if(nodo.derecho!=null){
            console.log("Der "+nodo.derecho.valor)
            nodes.add(
              {id:nodo.derecho.valor, label:nodo.derecho.valor.toString()}
            );
            edges.add(
              {from:nodo.valor, to: nodo.derecho.valor, length:10}
            );
          }
        }
        
        this.pre_orden(nodo.izquierdo);
        this.pre_orden(nodo.derecho);
        
    }
    
  }

}
