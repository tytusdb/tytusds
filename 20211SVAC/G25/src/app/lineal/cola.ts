import {Nodopila} from './nodopila';
export class Cola {
primero:Nodopila;
ultimo:Nodopila;
size:number;


edges = [];
carga = [];

  constructor() {
      this.primero = null;
      this.ultimo = null;
      this.size = 0;
  }

  encolar(dato){
      const nodo = new Nodopila(dato);

      if (this.size > 0)
      {
          this.ultimo.siguiente = nodo;
          this.ultimo = nodo;
          this.size++;
      }else{
          this.primero = nodo;
          this.ultimo = nodo;
          this.size++;
      }
  }

  desencolar(){
      const actual = this.primero;
      this.primero = this.primero.siguiente;
      this.size --;

      return actual.dato;
  }

  imprimir(){
    var arrayNodes = [];
      let id = 0;
      let actual = this.primero;
      if (this.size != 0){
          while (actual)
          {
              if (id > 0)
              {
                  arrayNodes.push({id: id, label: actual.dato, shape: "box"})
                  this.edges.push({from: id - 1, to: id})

              }else{
                  arrayNodes.push({id: id, label: actual.dato, shape: "box"})
              }
              actual = actual.siguiente;
              id++;
          }
      }else{
          alert("Lista vacia");
      }
      return arrayNodes;
  }

  actualizar(actual, remplazo){
      let data = this.primero;
      if(this.buscar(actual))
      {
          this.remplazar(actual, remplazo);
      }
  }

  buscar(dato){
      let actual = this.primero
      if (this.size != 0)
      {
          while (actual)
          {
              if (actual.dato === dato)
              {
                  return true;
              }
              actual = actual.siguiente;
          }
      }else{
          alert('Dato No encontrado')
          return false;
      }
  }

  buscarNodo(dato){
      let id = 0;
      let encontro = false;
      let actual = this.primero;
      if (this.cantidad() != 0)
      {
          while (actual)
          {
              if (actual.dato === dato)
              {
                  encontro = true;
                  return id;
              }
              actual = actual.siguiente;
              id++;
          }
          if (encontro == false)
          {
              alert("Dato a buscar no se encuentra en la COLA");
          }
      }
  }

  remplazar(datoV, datoN){
      let actual = this.primero;
      while (actual)
      {
          if (actual.dato === datoV)
          {
              actual.dato = datoN;
          }
          actual = actual.siguiente
      }
  }

  isVacia(){
      return this.size === 0;
  }

  peek(){
      console.log(this.primero.dato);
      return this.primero.dato;
  }

  cantidad(){
      console.log(this.size);
      return this.size;
  }
}
