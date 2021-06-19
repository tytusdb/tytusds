import NodoDoble from "./nodo-doble";
import ListaPadre from "./lista-padre";     
export default class ListaDobleEnlazada implements ListaPadre {
    inicio: NodoDoble;
    final:NodoDoble;
    longitud:number;
    constructor() {
        this.inicio = null;
        this.final=null;
        this.longitud=0;
      }
    estaVacia(): boolean {
        return this.longitud==0;
    }
    toArray(): any[] {
      const array = new Array(this.longitud);
      let node = this.inicio;
      // 2. Avanza sucesivamente, obtén cada nodo
      for (let i = 0; i < array.length; i++) {
        array[i] = node.getData()
        node = node.getNext();
      }
      return array;
    }
    size(): number {
        return this.longitud;
    }
    agregarAlInicio(data: any): void {
        if(data){
            let newNode = new NodoDoble(data)
            if (this.longitud == 0) {
                this.final = newNode
                this.inicio = newNode 
            }else {
                newNode.setNext ( this.inicio );
                this.inicio.setPrev(newNode);
                this.inicio = newNode
            }
            this.longitud += 1
        }
    }
    agregarAlFinal(data: any): void {
        if(data){
            let newNode = new NodoDoble(data)
            if (this.longitud == 0) {
                this.final = newNode
                this.inicio = newNode 
            }else {
                newNode.setPrev ( this.final );
                this.final.setNext( newNode);
                this.final = newNode
            }
            this.longitud += 1
        }
    }
    borrarAlInicio() {
        this.removeAt(0);
    }
    borrarAlFinal() {
        this.removeAt(this.longitud);
    }
    push(data: any): void {
        throw new Error("Method not implemented.");
    }
    pop() {
        throw new Error("Method not implemented.");
    }
    actualizar(posicion, newData){
        if (posicion < 0 || posicion >= this.longitud) {
          return false
        }
        let current = this.inicio
        let index = 0
        if (this.longitud / 2 > posicion) {
          while(index++ < posicion){
          current = current.getNext();
        }
        }else{
          current = this.final
          index = this.longitud - 1
          while (index -- > posicion) {
            current = current.getPrev();
          }
        }
        current.setData ( newData);
    }
    removeAt( position ){
        // 1. Juicio fuera de límites
        if (position < 0 || position >= this.longitud) {
          return null
        }
        // 2. Eliminar nodo
        // Cuando length == 1 en la lista enlazada
        // Caso 1: solo hay un nodo en la lista vinculada
        let current = this.inicio// Defina en la parte superior para facilitar las siguientes situaciones para devolver current.data
        if (this.longitud == 1) {
          this.inicio = null
          this.final = null
        // Cuando longitud> 1 en la lista enlazada
        } else{
          // Escenario 2: Eliminar el primer nodo
          if (position == 0) {
            this.inicio.getNext().setPrev(null)
            this.inicio = this.inicio.getNext()
          // Caso 3: Eliminar el último nodo
          }else if(position == this.longitud - 1){
            current = this.final// Volver al último nodo eliminado en este caso
            this.final.getPrev().setNext(null)
            this.final = this.final.getPrev()
          }else{
          // Caso 4: Elimina el nodo en el medio de la lista vinculada
            let index = 0
            while(index++ < position){
              current = current.getNext()
            }
            current.getNext().setPrev(current.getPrev())
            current.getPrev().setNext(current.getNext())
          }
        }
        this.longitud -= 1
      }
}