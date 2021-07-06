import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
let mapOrder; // diccionario en donde ya esta ordenado todo
let cola // cola de prioridad
let codigo;
var tiempo;
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
                edges: edges };
//COLA DE PRIORIDAD ------------------------------------------------------------------------------
class Node {
  value: any;
  priority: any;
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  values: any[];
  sizeCola: any;
  constructor() {
    this.values = [];
    this.sizeCola = 0;
  }

  enqueue(value, priority) {
    this.sizeCola++;
    let newNode = new Node(value, priority);
    this.values.push(newNode);

    let index = this.values.length - 1;
    const element = this.values[index];

    while(index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      const parent = this.values[parentIndex];

      if(element.priority >= parent.priority) break;
      this.values[parentIndex] = element;
      this.values[index] = parent;
      index = parentIndex;
    }
    return this.values;
  }

  dequeue() {
    this.sizeCola--;
    const min = this.values[0];
    const end = this.values.pop();
    if(this.values.length > 0) {
      this.values[0] = end;

      let index = 0;
      const length = this.values.length;
      const element = this.values[0];

      while(true) {
        let leftIndex = 2 * index + 1;
        let rightIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;

        if(leftIndex < length) {
          leftChild = this.values[leftIndex];
          if(leftChild.priority < element.priority) {
            swap = leftIndex;
          }
        }
        if(rightIndex < length) {
          rightChild = this.values[rightIndex];
          if((swap === null && rightChild.priority < element.priority) || (swap !== null && rightChild.priority < leftChild.priority)) {
            swap = rightIndex;
          }
        }
        if(swap === null) break;
        this.values[index] = this.values[swap];
        this.values[swap] = element;
        index = swap;
      }
    }
    return min;
  }
}



//HUFFMAN **************************************************************************************************
class Nodo{
  valor: any;
  caracter: any;
  izquierdo: Nodo;
  derecho: Nodo
  constructor(valor,caracter){
      this.valor = valor;
      this.caracter = caracter;
      this.izquierdo = null;
      this.derecho = null;
  }
}


class Arbol{
  raiz: Nodo;
  aux:Nodo;
  contador: number;
  tablaCode: any[];
  tablaCaracter: any[];
  arrayTexto: any[];
  constructor(){
      this.raiz = null;
      this.aux = null;
      this.contador = 0;
      this.tablaCode = [];
      this.tablaCaracter = [];
      this.arrayTexto = []
  }
  delay(ms:number) {
    return new Promise( resolve => setTimeout(resolve,ms));
  }

  insertar(valor,caracter){
      this.contador++;
      this.raiz = this.add(valor,caracter, this.raiz);
      if(this.contador == 3){
          this.aux = this.raiz;
          this.raiz = null;
          this.contador = 0;

      }
  }

  add(valor,caracter, nodo){
      if (nodo == null){
          return new Nodo(valor,caracter);
      }else{
          if(this.contador == 2){ //cambios
              if(typeof caracter === 'object' ){
                  nodo.izquierdo = caracter;
              }else{
                  nodo.izquierdo = this.add(valor,caracter, nodo.izquierdo);
              }

          }else if(this.contador == 3){
              if(typeof caracter === 'object' ){
                  nodo.derecho = caracter;
              }else{
                  nodo.derecho = this.add(valor,caracter, nodo.derecho);
              }

          }

      }
      return nodo;
  }

 decodificando(nodo,code){
  if(nodo.izquierdo!=null && nodo.derecho != null){
      this.decodificando(nodo.izquierdo,code+"0")
      this.decodificando(nodo.derecho,code+"1")
  }
  if(nodo.izquierdo == null && nodo.derecho == null){
      this.tablaCode.push(code);
      this.tablaCaracter.push(nodo.caracter);
  }

 }
 x1 = 0;
y1 = 0;
i=0;
j=2
 async verTabla(){
     console.log("------------------------")
     console.log("Caracter   |Codigo  ")
     nodes.add(
      {id: this.i, label:'Tabla Caracter',x: 0 , y: 0, color: "#7BE141"}
    );
    await this.delay(tiempo)
    this.i++;
    nodes.add(
      {id: this.i, label:'Tabla Code',x: 110 , y: 0, color: "#7BE141"}
    );
    await this.delay(tiempo)
    this.i++
    this.y1 = this.y1 + 35
     this.arrayTexto.forEach(async element => {
      for (let i = 0; i < this.tablaCaracter.length; i++) {
        if(element == this.tablaCaracter[i]){
            console.log(this.tablaCaracter[i] +"         |  "+this.tablaCode[i]);
            nodes.add(
              {id: this.j, label:String(this.tablaCaracter[i]),x: this.x1 , y: this.y1, color: "rgba(97,195,238,0.5)"}
            );
            await this.delay(tiempo)
            this.j++;
            this.x1 = this.x1 + 110
            nodes.add(
              {id: this.j, label:String(this.tablaCode[i]),x: this.x1 , y: this.y1, color: "rgba(97,195,238,0.5)"}
            );
            this.j++;
            this.x1 = 0
          this.y1 = this.y1 + 35
          await this.delay(tiempo)
        }
        await this.delay(tiempo)
      }

  });
}
  ingresoTexto(texto){

      let diccionario = new Map();
      let freq = 0;
      this.arrayTexto = texto.split("");
      //para buscar valores
      this.arrayTexto.forEach(element => {
          //para frecuencia
          for (let i = 0; i < this.arrayTexto.length; i++) {
             if(element == this.arrayTexto[i]){
                 freq++;
             }
          }
          diccionario.set(element,freq);
          freq = 0;

      });
      mapOrder = new Map([...diccionario.entries()].sort((a,b)=> a[1]-b[1])); // se ordena por frecuencia

      //se recorre el mapa, para ir agregando los valores a la cola
      cola = new PriorityQueue();
      for(var [key,value] of mapOrder){
        cola.enqueue(key,value);
      }

      this.comprimir();

  }

  resultado(){
      let resCode="";
      let resText="";
      this.arrayTexto.forEach(element => {
          for (let i = 0; i < this.tablaCaracter.length; i++) {
              if(element == this.tablaCaracter[i]){
                  resCode += ' '+ this.tablaCode[i];
                  resText+= element;
              }
          }

      });
      console.log("Resultado :")
      console.log(resText);
      console.log(resCode);
  }

  comprimir(){
      while(true){
          let dato1 = cola.dequeue();
          let dato2 = cola.dequeue();

          let suma = dato1.priority + dato2.priority;
          this.insertar(suma,"*");
          this.insertar(dato1.priority,dato1.value)
          this.insertar(dato2.priority,dato2.value)
          if(cola.sizeCola == 0){
              cola.enqueue(this.aux,suma);
              this.decodificando(this.aux,''); // raiz del árbol
              this.verTabla();
              this.resultado(); // para imprimir el codigo
           break;
          }else{
              cola.enqueue(this.aux,suma);

          }

      }

  }
}
/*
let a = new Arbol();
a.ingresoTexto("hola buenas");
*/



@Component({
  selector: 'app-huffman',
  templateUrl: './huffman.component.html',
  styleUrls: ['./huffman.component.css']
})
export class HuffmanComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }
  definirTiempo(time:any){
    tiempo = 0;
    tiempo = time*10;
  } 
  descargarContenido(){
    let downloadfile = "data: text/json;charset=utf-8,"+encodeURIComponent(this.resultadoCifrado);
    console.log(downloadfile);
    var downloader = document.createElement('a');
    downloader.setAttribute('href', downloadfile);
    downloader.setAttribute('download', 'data.txt');
    downloader.click();
  }



  resultadoCifrado:string;
  texto:string;
  abrir(eve:any)
  {
    let a =eve.target.files[0]


    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        this.texto=String(resultado)
        console.log(this.texto)
      }
      reader.readAsText(a)
    }


  }
  enviarResultado(){
    this.resultadoCifrado = ""
    for (let i = 0; i < this.huff.tablaCode.length; i++) {
      this.resultadoCifrado += this.huff.tablaCode[i];
    }
  }
  huff:any;
  insercion(valor:any){
    this.huff = new Arbol();
    this.huff.ingresoTexto(valor);
    this.enviarResultado();
  }

  // pruebas(){
  //   let a = new Arbol();
  //   a.ingresoTexto("hola buenas");
  //   console.log(a)

  // }

}
