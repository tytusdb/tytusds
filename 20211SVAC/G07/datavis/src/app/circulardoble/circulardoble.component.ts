import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as vis from 'vis';

var edges = new vis.DataSet([]);
var nodes = new vis.DataSet([]);
var options = {
  edges: {
    arrows: "from",
  },
}
let listaData = { nodes: nodes,
                edges: edges };
var i = 0;
var l = 1;

class Nodo{
  dato: any
  siguiente: Nodo
  anterior: Nodo
  constructor(dato: any){
      this.dato = dato;
      this.siguiente = null;
      this.anterior = null;
  }
}

class ListaCircularDoble{
  cabeza: Nodo
  cola: Nodo
  constructor(){
      this.cabeza = null;
      this.cola = null;
  }

  agregarFinal(entrada: any){
      const nuevoNodo = new Nodo(entrada);
      let actual = this.cabeza;
      let vars;
      if(this.cabeza == null){
          this.cabeza = nuevoNodo;
          this.cola = nuevoNodo;
          nuevoNodo.siguiente = this.cabeza;
          this.cabeza.anterior = nuevoNodo;
          nuevoNodo.anterior = actual;
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
          edges.update(
            { id: 'segunda' ,from: id[0].id , to: id[vars].id }
          );
      }else{
          while(actual.siguiente!=this.cabeza){
              actual = actual.siguiente;
          }
          actual.siguiente = nuevoNodo;
          nuevoNodo.siguiente = this.cabeza
          this.cola = nuevoNodo;
          this.cabeza.anterior = nuevoNodo;
          nuevoNodo.anterior = actual;
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
            {from: men, to: l, length: 20}
          );
          edges.add(
            {from: l, to: men, length: 20}
          );
          edges.remove('primer');
          edges.remove('segunda');
          edges.update(
            { id: 'primer' ,from: id[vars].id, to: id[0].id}
          );
          edges.update(
            { id: 'segunda' ,from: id[0].id , to: id[vars].id }
          );
          i++;
          l++;
      }
  }

  agregarInicio(entrada: any){
      const nuevoNodo = new Nodo(entrada);
      let vars;
      if(this.cabeza == null){
          this.cabeza = nuevoNodo;
          this.cola = nuevoNodo;
          nuevoNodo.siguiente = this.cabeza;
          nuevoNodo.anterior = this.cola;
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
          edges.update(
            { id: 'segunda' ,from: id[0].id , to: id[vars].id }
          );
      }else{
        let anterior= null;
        nuevoNodo.siguiente = this.cabeza;
        this.cabeza.anterior = nuevoNodo;
        this.cabeza = nuevoNodo;
        nuevoNodo.anterior = this.cola;
        this.cola.siguiente = this.cabeza;
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
          edges.add(
            {from: l, to: men, length: 20}
          );
          edges.remove('primer');
          edges.remove('segunda');
          vars = id.length-1;
          edges.update(
            { id: 'primer' ,from: id[vars].id, to: id[0].id}
          );
          edges.update(
            { id: 'segunda' ,from: id[0].id , to: id[vars].id }
          );
          i++;
          l++;
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

  eliminar(entrada: any){
      let actual = this.cabeza;
      let valorAnterior = null;
      let valorMuySiguiente = null;
      let encontrado = false;

      while((actual!=null) && (encontrado==false)){ // si no es null y no se ha encotrado nada
          encontrado = (actual.dato == entrada);
          if(encontrado == false){ // si no es la entrada que se busca, se ejecuta
              valorAnterior = actual; // guardo el anterior
              actual = actual.siguiente; // cambio de nodo, paso al siguiente
          }
      }

      if(actual!=null){ //diferente de null
          if(actual == this.cabeza){ // si lo que se elimino es la cabeza, se reasigna la cabeza
              this.cabeza = actual.siguiente;
              this.cabeza.anterior = this.cola;
              this.cola.siguiente = this.cabeza;
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
              edges.remove('segunda');
              edges.update(
                { id: 'primer' ,from: id[vars].id, to: id[0].id}
              );
              edges.update(
                { id: 'segunda' ,from: id[0].id , to: id[vars].id }
              );
            }else if(actual == this.cola){ // si lo que se elimina es la cola, el anterior de la cola, su siguiente es la cabeza
              this.cola = valorAnterior;
              this.cola.siguiente = this.cabeza;
              this.cabeza.anterior = this.cola;
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
              edges.remove('segunda');
              edges.update(
                { id: 'primer' ,from: id[vars].id, to: id[0].id}
              );
              edges.update(
                { id: 'segunda' ,from: id[0].id , to: id[vars].id }
              );
          }else{
              valorMuySiguiente = actual.siguiente;
              valorAnterior.siguiente = actual.siguiente;
              valorMuySiguiente.anterior = valorAnterior;
              console.log(valorMuySiguiente.anterior)
              console.log(valorAnterior.siguiente)

              if(valorMuySiguiente.siguiente){
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
                  if(val.label == valorMuySiguiente.anterior.dato){
                    froms = val.id;
                  }
                }
                let to: number;
                for (var val of id){
                  if(val.label == valorAnterior.siguiente.dato){
                    to = val.id;
                  }
                }
                edges.add(
                  {from: froms, to: to, length: 20, arrows: 'to'}
                );
                edges.add(
                  {from: to, to: froms, length: 20, arrows: 'to'}
                );
              }

          }
          actual = null; // se limpia

      }

  }

  imprimirDelante(){
      console.log("Impresion \n");
      let actual = this.cabeza;
      let res = "";
          do{
              res += actual.dato +" ->  ";
              actual = actual.siguiente;
          }while(actual!=this.cabeza);
          console.log(res);
  }

  imprimirAtras(){
      console.log("Impresion \n");
      let actual = this.cola;
      let res = "";
          do{
              res += actual.dato +" ->  ";
              actual = actual.anterior;
          }while(actual!=this.cola);
          console.log(res);
  }
}


@Component({
  selector: 'app-circulardoble',
  templateUrl: './circulardoble.component.html',
  styleUrls: ['./circulardoble.component.css']
})
export class CirculardobleComponent implements OnInit {

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
  lista = new ListaCircularDoble();
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
    console.log("this.lista");
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
