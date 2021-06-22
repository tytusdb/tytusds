class Node {
    constructor(value, prioridad) {
      this.value = value;
      this.next = null;
      this.prioridad = null;
    }
  }
  
  class ColaPrioridad {
    constructor() {
      this.first = null;
      this.last = null;
      this.length = 0;
    }
    peek() {
      return this.first;
    }
    enqueue(value, prioridad) {
      const newNode = new Node(value, prioridad);
      if (this.length === 0) {
        this.first = newNode;
        this.last = newNode;
      } else {
            let nodo = this.first
            for(let i = 0; i< this.length; i++){
                if(newNode.prioridad < nodo.prioridad){
                    if(this.length == 1){
                        nodo = this.last;
                        newNode = this.first;
                    }else{
                        nodo = this.last;
                        newNode.next = nodo;
                    }     
                }else{
                    this.last.next = newNode;
                    this.last = newNode;
                }
                nodo = nodo.next
            }
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

    imprimir(){
        let nodo = this.first
        for(let i =0; i<this.length; i++ ){
            console.log(nodo.valor);
            nodo = nodo.next
        }
    }
    
  }


  let colap = new ColaPrioridad;
  colap.enqueue(1,2);
  colap.enqueue(2,3);
  colap.enqueue(4,1);
  colap.imprimir();
