let Nodo=require('./Nodo');
class Lista{
  constructor() {
    this.head=null;
    this.tail=null;
    this.size=0;
  }
  //retornar head

  //Agregar de forma ordenada:
  appendO(valor){
    let nodo= new Nodo(valor);
    let current= this.head;
    //si no hay ningun nodo en la lista
    if(current===null){
      this.head=nodo;
      this.tail=nodo;
      return;
    }
    while (current != null) {
      if (current.valor < valor) {
          current = current.next;
      } else {
        if (current == this.head) {
          nodo.next = this.head;
          this.head.prev = nodo;
          this.tail = this.head;
          this.head = nodo;
          return;
          } else {
            nodo.next=current.prev.next;
            nodo.prev=current.prev;
            current.prev.next=nodo;
            current.prev=nodo;
            return;
          }
        }
      }
      this.tail.next=nodo;
      nodo.prev=this.tail;
      this.tail=nodo;
  }
  buscar(valor){
    let current=this.head;
    while (current!=null){
      if(current.valor==valor){
        break;
      }
      current=current.next;
    }
    return current;
  }
  print(){
    let l=[]
    let current=this.head;
    while (current!=null){
      l.push(current.valor);
      current=current.next
    }
    console.log(l);
  }
}

module.exports = Lista;
