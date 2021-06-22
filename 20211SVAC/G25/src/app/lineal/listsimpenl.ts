import {Nodolistsimpenl} from './nodolistsimpenl';
export class Listsimpenl {

  //Nodo:Nodolistsimpenl;
  size :number;
  primero:Nodolistsimpenl;
  anterior:Nodolistsimpenl;
  ultimo:Nodolistsimpenl;

  constructor() {
      this.primero = null;
      this.ultimo = null;
      this.size = 0;
  }
  getPrimero(){
    return this.primero;
  }
  add(dato) {
       let nuevo = new Nodolistsimpenl(dato)
       if (this.primero == null) {
           this.primero = nuevo;
           this.ultimo = this.primero;
           this.size++;
       } else {
           this.ultimo.siguiente = nuevo;
           nuevo.anterior = this.ultimo;
           this.ultimo = nuevo;
           this.size++;
       }

   }

  print() {
       var valores = [];
       let aux = this.primero;
       while (aux != null) {
           valores.push(aux.dato);
           console.log("dato:", aux.dato);
           aux = aux.siguiente;
       }

       return valores;
   }
}
