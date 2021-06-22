class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.first = null;
      this.last = null;
      this.length = 0;
    }
    peek() {
      return this.first;
    }
    enqueue(value) {
      const newNode = new Node(value);
      if (this.length === 0) {
        this.first = newNode;
        this.last = newNode;
      } else {
        this.last.next = newNode;
        this.last = newNode;
      }
      this.length++;
  
      return this;
    }
    dequeue() {
      if (!this.first) {
        return null;
      }
      if (this.first === this.last) {
        this.last = null;
      }
      this.first = this.first.next;
      this.length--;
  
      return this;
    }

    get(index){
        let nodo = this.first
        for(let i =0; i<this.length; i++ ){
            if(i==index){
                break
            }
            nodo = nodo.next
        }
        return nodo
    }


    modificar(valor, nuevo) {
      if (this.first != null) {
        if (this.first.value == valor) {
          this.first.value = nuevo
        } else {
          let aux = this.first
          while (aux != null) {
            if (aux.value == valor) {
              aux.value = nuevo
              break
            }
            aux = aux.next
          }
        }
      }
    }
  
      buscar(valor) {
      if (this.first != null) {
        let aux = this.first
        while (aux != null) {
          if (aux.value == valor.toString() ) {
            return aux
          }
          aux = aux.next
        }
      }
      return null
    }
  
  
      obtenerIndice(valor) {
      let nodo = this.first
      let indice = 0
  
      for (let i = 0; i < this.length; i++) {
        if (nodo.value.toString() === valor.toString()) {
          indice = i
          break
        }
        nodo = nodo.next
      }
  
      return indice
    }
  
  


    
  }



export default Queue
