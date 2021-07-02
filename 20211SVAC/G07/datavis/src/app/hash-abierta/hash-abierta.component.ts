import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';
var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var x1 = 0, y1 = 0;
var h;
var pos: any, value:any;
var options = {
  physics: {
    enabled: false,
  },
}
let listaData = { nodes: nodes,
  edges: edges };
var tama: number, valor: number, uno: number, dos: number//tamaño de arreglo para la tabla

class Node {
  data: any
  next: Node
  prev: Node
  constructor (data: any, next: Node, prev: Node){
      this.data = data;
      this.next = next;
      this.prev = prev;
  }
}

class ListaDoble {
  head: Node
  tail: Node
  size: number
  constructor(){
      this.head = null;
      this.tail = null;
      this.size = 0;
  }

  addhead(data: any){
      const newNode = new Node(data, this.head, null);
      if (this.head){
          newNode.next = this.head;
          this.head.prev = newNode;
          this.head = newNode;
          var id = nodes.get({
            fields:['id', 'label', 'x', 'y']
          });
          var anterior = this.head.next
          for (var val of id){
            if(val.label == anterior.data){
              uno = val.x
              dos = val.y
            }
          }
          console.log("id de los nodos we")
          console.log(id)
          dos = dos+50;
          nodes.add(
            {id: pos+','+data, label:String(data), x: uno , y: dos, color: "rgba(97,195,238,0.5)",shape: "box"}
          );
          let men: number;
          var ids = nodes.get({
            fields:['id', 'label']
          });
          for (var val of ids){
            if(val.label == anterior.data){
              men = val.id;
            }
          }
          edges.update(
            {from: pos+','+data, to: men, length: 20, arrows: 'to'}
          );
          edges.update(
            {from: men, to: pos+','+data, length: 20, arrows: 'to'}
          );
      }
      else {
          this.head = newNode;
          this.tail = newNode;
          var id = nodes.get({
            fields:['id', 'label', 'x', 'y']
          });
          console.log("id de los nodos we")
          console.log(id)
          for (var val of id){
            if(val.id == pos){
              uno = val.x
              dos = val.y
            }
          }
          nodes.update(
            {id: pos, label:String(data), x: uno , y: dos, color: "rgba(97,195,238,0.5)",shape: "box"}
          );
      }
      this.size++;
  }
  actualizarValor(dato: any, valor: any) {
    let aux = this.head;
    var ids = nodes.get({
      fields:['id', 'label', 'color']
    });
    console.log("id de los nodos we")
    console.log(ids)
    if (aux == null) {
        console.log("Nada we")
    } else {
        while (aux != null) {
            if (aux.data == dato) {
                aux.data = valor;
                for (var val of ids){
                  if(val.label === dato){
                    if(typeof val.id == 'number'){
                      nodes.update(
                        {id: val.id,label:valor, color: "#FFA807"}
                      );
                    }else{
                      nodes.update(
                        {id: pos+','+dato, label:valor,color: "#FFA807"}
                      );
                    }
                  }
                }
                return true
            } else {
                aux = aux.next;
            }
        }
    }
  }

  buscar(dato: any) {
    let aux = this.head;
    var ids = nodes.get({
      fields:['id', 'label', 'color']
    });
    console.log("id de los nodos we")
    console.log(ids)

    if (aux == null) {
        console.log("LISTA VACIA")
    } else {
        while (aux != null) {
            if (aux.data == dato) {
                aux = aux.next;
                for (var val of ids){
                  if(val.label === dato){
                    if(typeof val.id == 'number'){
                      nodes.update(
                        {id: val.id, color: "#FFA807"}
                      );
                    }else{
                      nodes.update(
                        {id: pos+','+dato, color: "#FFA807"}
                      );
                    }
                  }
                }
                return true
            } else {
                aux = aux.next;
            }
        }
        console.log("NO SE ENCONTRO")
        return false
    }
  }

  deletehead(){
      if (!this.head){
          return null;
      }
      const valoret = this.head.data;

      if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
      }
      else {
          this.head = this.head.next;
          this.head.prev = null;
      }
      this.size--;
      var id = nodes.get({
        fields:['id', 'label']
      });
      let primer: number;
      for (var val of id){
        if(val.label == valoret){
          primer = val.id;
        }
      }
      nodes.remove(primer);
      return valoret;
  }

  deletetail(){
      if (!this.tail){
          return null;
      }
      const valoret = this.tail.data;

      if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
      }
      else {
          this.tail = this.tail.prev;
          this.tail.next = null;
      }
      this.size--;
      var id = nodes.get({
        fields:['id', 'label']
      });
      let primer: number;
      for (var val of id){
        if(val.label == valoret){
          primer = val.id;
        }
      }
      console.log(primer);
      console.log(nodes)
      nodes.update(
        {id: primer, label:"-1"}
      );
      return valoret;
  }

  delete(data: any){
      let actual = this.head;
      let anterior = null;

      while (actual != null){
          if (actual.data === data){
              if (!anterior){
                  return this.deletehead();
              }else if(!actual.next){
                  return this.deletetail();
              }
              else {
                  anterior.next = actual.next;
                  actual.next.prev = anterior;
                  if(actual.next){
                    var id = nodes.get({
                      fields:['id', 'label']
                    });
                    let primer: number;
                    for (var val of id){
                      if(val.label == actual.data){
                        primer = val.id;
                      }
                    }
                    nodes.remove(primer);

                    let froms: number;
                    for (var val of id){
                      if(val.label == anterior.data){
                        froms = val.id;
                      }
                    }
                    let to: number;
                    for (var val of id){
                      if(val.label == actual.next.data){
                        to = val.id;
                      }
                    }
                    edges.add(
                      {from: froms, to: to, length: 20, arrows: 'to'}
                    );edges.add(
                      {from: to, to: froms, length: 20, arrows: 'to'}
                    );
                  }
                  else{
                    var id = nodes.get({
                      fields:['id', 'label']
                    });
                    let primer: number;
                    for (var val of id){
                      if(val.label == actual.data){
                        primer = val.id;
                      }
                    }
                    nodes.remove(primer);
                  }
              }
              this.size--;
              return actual.data;
          }
          anterior = actual;
          actual = actual.next;
      }
      return null
  }

}

class HashAbierta{
  Arreglo: any[];
  fun:any;

  constructor(fun:any){
    this.Arreglo = null;
    this.fun = fun;
  }
  simple(){
    let k = 0.5567;
    return k * tama;
  }

  division(k:any){
      return k % tama;
  }

  multiplicacion(k:any){
      const A = 0.6180;
      return tama*((k*A) % 1);
  }
  NuevaTabla(tamano: number){
    tama = tamano;
    this.Arreglo = new Array(tama);//arreglo del tamaño especifico
    for (let j = 0; j < tama; j++) {
      this.Arreglo[j] = "-1";
      nodes.update(
        {id: j, label:'-1',x: x1 , y: y1, color: "rgba(97,195,238,0.5)",shape: "box"}
      );
      x1 = x1 + 90
    }
  }

  ValorPos(valor: any){
		let dato = 0
		if(typeof valor === 'string'){
			for(let j = 0; j < valor.length; j++){
				dato += valor.charCodeAt(j)
			}
		} else {
			dato = valor
      return dato
		}
		return dato
	}

  eliminar(valor:any){
    let posicion = this.ValorPos(valor);
    try {

      if(this.fun == "Simple"){
        let res = Math.trunc(this.simple());
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = valor;
          this.Arreglo[res].delete(valor)
        }else{
          console.log("Posición vacía")
        }

      }else if(this.fun == "Division"){
        let res = this.division(posicion);
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = valor;
          this.Arreglo[res].delete(valor);
        }else {
          console.log("Posición vacía")
        }

      }else if(this.fun == "Multiplicacion"){
        let res =Math.trunc(this.multiplicacion(posicion));
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = valor;
          this.Arreglo[res].delete(valor);
        }else {
          console.log("Posición vacía")
        }
      }


    } catch (error) {
      console.log('ERROR PRRA');
      console.log(error)
    }
  }

  actualizar(key:any, nuevo:any){
    let posicion = this.ValorPos(key);
    var ids = nodes.get({
      fields:['id', 'label', 'color']
    });
    console.log("id de los nodos we")
    console.log(ids)
    for (var val of ids){
      if(val.color === "#FFA807"){
        nodes.update(
          {id: val.id, color: "rgba(97,195,238,0.5)"}
        );
      }
    }
    try {

      if(this.fun == "Simple"){
        let res = Math.trunc(this.simple());
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = nuevo;
          this.Arreglo[res].actualizarValor(key,nuevo);
        }else{
          console.log("Posición vacía")
        }

      }else if(this.fun == "Div"){
        let res = this.division(posicion);
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = nuevo;
          this.Arreglo[res].actualizarValor(key,nuevo);
        }else {
          console.log("Posición vacía")
        }

      }else if(this.fun == "Multi"){
        let res =Math.trunc(this.multiplicacion(posicion));
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = nuevo;
          this.Arreglo[res].actualizarValor(key,nuevo);
        }else {
          console.log("Posición vacía")
        }
      }


    } catch (error) {
      console.log('ERROR PRRA');
      console.log(error)
    }
  }

  buscar(dato:any){
    let posicion = this.ValorPos(dato);
    var ids = nodes.get({
      fields:['id', 'label', 'color']
    });
    console.log("id de los nodos we")
    console.log(ids)
    for (var val of ids){
      if(val.color === "#FFA807"){
        nodes.update(
          {id: val.id, color: "rgba(97,195,238,0.5)"}
        );
      }
    }
    try {

      if(this.fun == "Simple"){
        let res = Math.trunc(this.simple());
        let prueba = true;
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = valor;
          console.log(res)
          this.Arreglo[res].buscar(dato);

        }else{
          console.log("Posición vacía")
        }

      }else if(this.fun == "Division"){
        let res = this.division(posicion);
        let prueba = true;
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = valor;
          console.log(res)
          this.Arreglo[res].buscar(dato);

        }else {
          console.log("Posición vacía")
        }

      }else if(this.fun == "Multiplicacion"){
        let res =Math.trunc(this.multiplicacion(posicion));
        let prueba = true;
        if(this.Arreglo[res]!="-1"){
          pos = res;
          value = valor;
          console.log(res)
          this.Arreglo[res].buscar(dato);
        }else {
          console.log("Posición vacía")
        }
      }


    } catch (error) {
      console.log('ERROR PRRA');
      console.log(error)
    }
  }

  AgregarValores(dato: any){
    console.log('que3 pdo prra')
    let posicion = this.ValorPos(dato);
    if(this.fun == "Simple"){
      let res = Math.trunc(this.simple());
      if(this.Arreglo[res]!="-1"){
        // si hay un dato en esa posición y se recorre la lista
        pos = res;
        value = dato;
        console.log("datos de pos y otros 1")
        console.log(res)
        console.log(posicion)
        this.Arreglo[res].addhead(dato);
      }else{
        //no hay dato en esa posición, se agrega
        pos = res;
        value = dato;
        console.log("datos de pos y otros 11")
        console.log(res)
        console.log(posicion)
        this.Arreglo[res] = new ListaDoble;
        this.Arreglo[res].addhead(dato);
      }
    }else if(this.fun == "Division"){
      let res = this.division(posicion);
      if(this.Arreglo[res]!="-1"){
        // si hay un dato en esa posición y se recorre la lista
        pos = res;
        value = dato;
        console.log("datos de pos y otros 2 ")
        console.log(res)
        console.log(posicion)
        this.Arreglo[res].addhead(dato);
      }else {
        //no hay dato en esa posición, se agrega
        pos = res;
        value = dato;
        console.log("datos de pos y otros 22")
        console.log(res)
        console.log(posicion)
        this.Arreglo[res] = new ListaDoble;
        this.Arreglo[res].addhead(dato);
      }
    }else if(this.fun == "Multiplicacion"){
      let res =Math.trunc(this.multiplicacion(posicion));
      if(this.Arreglo[res]!="-1"){
        // si hay un dato en esa posición y se recorre la lista
        pos = res;
        value = dato;
        console.log("datos de pos y otros 3 ")
        console.log(res)
        console.log(posicion)
        this.Arreglo[res].addhead(dato);
      }else {
        //no hay dato en esa posición, se agrega
        pos = res;
        value = dato;
        console.log("datos de pos y otros 33")
        console.log(res)
        console.log(posicion)
        this.Arreglo[res] = new ListaDoble;
        this.Arreglo[res].addhead(dato);
      }
    }
  }
}

@Component({
  selector: 'app-hash-abierta',
  templateUrl: './hash-abierta.component.html',
  styleUrls: ['./hash-abierta.component.css']
})
export class HashAbiertaComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }

  Tamano(ta: number, dat:any){
    h = new HashAbierta(dat);
    h.NuevaTabla(ta);
    console.log(h)
  }

  AgregarNuevo(datos: any){
    console.log("Entro??")
    console.log(h);
    h.AgregarValores(datos);
  }
  Actualizars(dato: any, datos: any){
    console.log('dato ' + dato)
    console.log("buscar")
    h.actualizar(dato, datos)
  }
  buscar(dato: any){
    console.log('dato ' + dato)
    console.log("buscar")
    h.buscar(dato)
  }
  Eliminar(valor: any){
    console.log("Entro??")
    console.log(h);
    h.eliminar(valor);
  }

}
