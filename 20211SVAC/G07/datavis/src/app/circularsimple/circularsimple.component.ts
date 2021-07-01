import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';

var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  /*layout: {
    //randomSeed: 89,
    hierarchical: {
      direction: 'LR',        // UD, DU, LR, RL
      sortMethod: 'directed'   // hubsize, directed
  }
  },*/
  edges: {
    arrows: "from",
  },/*
  physics: {
    enabled: false,
  },*/
}
let listaData = { nodes: nodes,
                edges: edges };
var i = 0;
var l = 1;
class Nodo{
  dato: any
  siguiente: Nodo
  constructor(dato: any){
      this.dato = dato;
      this.siguiente = null;
  }
}

class ListaCircularSimple{
  cabeza: Nodo;
  cola: Nodo;
  constructor(){
      this.cabeza = null;
      this.cola = null;
  }

  agregarFinal(entrada: any){
      const nuevoNodo = new Nodo(entrada);
      let actual = this.cabeza;

      let vars;
      if(this.cabeza==null){
          this.cabeza = nuevoNodo;
          nuevoNodo.siguiente = this.cabeza;
          this.cola = nuevoNodo;
          nodes.add(
            {id: i, label:entrada}
          );
          var id = nodes.get({
            fields:['id', 'label']
          });
          vars = id.length-1;
          edges.update(
            { id: 'primer' ,from: id[vars].id , to: id[0].id,}
          );

      }else{

          while(actual.siguiente!=this.cabeza){
              actual = actual.siguiente;
          }
          actual.siguiente = nuevoNodo;
          nuevoNodo.siguiente= this.cabeza;
          this.cola = nuevoNodo;
          let men: number;
          nodes.add(
            {id: l, label:entrada}
          );
          var id = nodes.get({
            fields:['id', 'label']
          });
          for (var val of id){
            if(val.label == actual.dato){
              men = val.id;
            }
          }
          vars = id.length-1;
          edges.add(
            {from: l, to: men, length: 20}
          );
          edges.remove('primer');
          edges.update(
            { id: 'primer' ,from: id[vars].id, to: id[0].id}
          );
          i++;
          l++;
      }

  }

  agregarInicio(entrada: any){
      const nuevoNodo = new Nodo(entrada);
      let vars;
      if(this.cabeza==null){
          this.cabeza = nuevoNodo;
          nuevoNodo.siguiente = this.cabeza;
          this.cola = nuevoNodo;
          nodes.add(
            {id: i, label:entrada}
          );
          var id = nodes.get({
            fields:['id', 'label']
          });
          vars = id.length-1;
          edges.update(
            { id: 'primer' ,from: id[vars].id , to: id[0].id }
          );
      }else{
          let anterior= null;
          nuevoNodo.siguiente = this.cabeza;
          this.cabeza = nuevoNodo;
          this.cola.siguiente = nuevoNodo;
          let men: number;
          nodes.add(
            {id: l, label:entrada}
          );
          var id = nodes.get({
            fields:['id', 'label']
          });
          anterior = this.cabeza.siguiente
          for (var val of id){
            if(val.label == anterior.dato){
              men = val.id;
            }
          }
          edges.add(
            {from: men, to: l, length: 20}
          );
          edges.remove('primer');
          vars = id.length-1;
          edges.update(
            { id: 'primer' ,from: id[vars].id, to: id[0].id}
          );
          i++;
          l++;
      }
  }

  eliminar(entrada: any){
      let actual = this.cabeza;
      let anterior = null;
      let encontrado = false;

      while((actual!=null) && (encontrado==false)){ // si no es null y no se ha encotrado nada
          encontrado = (actual.dato == entrada);
          if(encontrado == false){ // si no es la entrada que se busca, se ejecuta
              anterior = actual; // guardo el anterior
              actual = actual.siguiente; // cambio de nodo, paso al siguiente
          }
      }

      if(actual!=null){ //diferente de null
          if(actual == this.cabeza){ // si lo que se elimino es la cabeza, se reasigna la cabeza
              this.cabeza = actual.siguiente;
              var id = nodes.get({
                fields:['id', 'label']
              });
              let primer: number;
              for (var val of id){
                if(val.label == actual.dato){
                  primer = val.id;
                }
              }
              nodes.remove(primer);
              id = nodes.get({
                fields:['id', 'label']
              });
              var vars = id.length-1;
              edges.remove('primer');
              edges.update(
                { id: 'primer' ,from: id[vars].id, to: id[0].id}
              );
          }else if(actual == this.cola){ // si lo que se elimina es la cola, el anterior de la cola, su siguiente es la cabeza
            anterior.siguiente = this.cabeza;
            this.cola = anterior;
            var id = nodes.get({
              fields:['id', 'label']
            });
            let primer: number;
            for (var val of id){
              if(val.label == actual.dato){
                primer = val.id;
              }
            }
            nodes.remove(primer);
            id = nodes.get({
              fields:['id', 'label']
            });
            var vars = id.length-1;
            edges.remove('primer');
            edges.update(
              { id: 'primer' ,from: id[vars].id, to: id[0].id}
            );
          }else{
              anterior.siguiente = actual.siguiente;  // si es cualquiera, el anterior se enlaza con el siguiente del eliminado
              if(anterior.siguiente){
                var id = nodes.get({
                  fields:['id', 'label']
                });
                let primer: number;
                for (var val of id){
                  if(val.label == actual.dato){
                    primer = val.id;
                  }
                }
                nodes.remove(primer);

                let froms: number;
                for (var val of id){
                  if(val.label == anterior.dato){
                    froms = val.id;
                  }
                }
                let to: number;
                for (var val of id){
                  if(val.label == anterior.siguiente.dato){
                    to = val.id;
                  }
                }
                edges.add(
                  {from: froms, to: to, length: 20, arrows: 'to'}
                );
              }
          }
          actual = null; // se limpia

      }

  }

  buscar(entrada: any){
      let actual = this.cabeza;
      do{
          if(entrada == actual.dato){
              return entrada;
          }
          actual = actual.siguiente;
      }while(actual!=this.cabeza);
      return null;
  }

  actualizar(entrada: any, valor: any){
      let actual = this.cabeza;
      do{
          if(entrada == actual.dato){
              actual.dato = valor;
              break;
          }
          actual = actual.siguiente;
      }while(actual!=this.cabeza);
  }

  imprimir(){
      console.log("Impresion \n");
      let actual = this.cabeza;
      let res = "";
          do{
              res += actual.dato +" ->  ";
              actual = actual.siguiente;
          }while(actual!=this.cabeza);
          console.log(res);
  }


}

@Component({
  selector: 'app-circularsimple',
  templateUrl: './circularsimple.component.html',
  styleUrls: ['./circularsimple.component.css']
})
export class CircularsimpleComponent implements OnInit {

  @ViewChild('mynetwork', {static: false}) el: ElementRef;
  public network: any;

  constructor() { }
  contenido = "{ \"valores\": [\n";
  generador(){
    for(var j =0;j<this.array.length;j++){
      if(this.array[j]!=null){
        if(j+1!=this.array.length){
          this.contenido += this.array[j]+",\n";
        }else{
          this.contenido += this.array[j]+"\n";
        }
      }
    }
    this.contenido += "]}";
  }

  descargarContenido(){
    this.generador();
    let downloadfile = "data: text/json;charset=utf-8,"+encodeURIComponent(this.contenido);
    console.log(downloadfile);
    var downloader = document.createElement('a');
    downloader.setAttribute('href', downloadfile);
    downloader.setAttribute('download', 'data.json');
    downloader.click();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    var container = this.el.nativeElement;
    this.network = new vis.Network(container, listaData, options);
  }
  code = '';
  array = [];
  texto="";
  lista = new ListaCircularSimple();
  abrir(eve:any)
  {
    let a =eve.target.files[0]
    let text=""
  
    if(a){
      let reader=new FileReader()
        reader.onload=ev=>{
        const resultado=ev.target?.result
        text=String(resultado)
        var data = JSON.parse(text);
        data.valores.forEach(element => {
          this.array.push(element)
        });
    
        this.array.forEach(el => this.lista.agregarInicio(el.toString()))
        this.code=text.toString();
      }
      reader.readAsText(a)
    }


  }
  AgregarNuevo(valor: any){
    this.lista.agregarInicio(valor);
    this.array.unshift(valor);
    console.log(this.lista);
  }
  AgregarNuevoUltimo(valor: any){
    this.lista.agregarFinal(valor);
    this.array.push(valor);
    console.log(this.lista);
   }
  Eliminar(valor: any){
    console.log('valor ' + valor)
    this.lista.eliminar(valor)
    this.blankspace(valor);
    console.log(this.lista);
  }
  blankspace(value){
    for(var j=0;j<this.array.length;j++){
      if(this.array[j]==value){
        this.array[j]=null;
        return;
      }
    }

  }

}
