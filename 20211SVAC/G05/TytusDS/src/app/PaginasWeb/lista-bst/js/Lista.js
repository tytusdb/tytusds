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
    if(current==null){
      this.head=nodo;
      this.tail=nodo;
      this.size+=1;
      return;
    }
    while (current != null) {
      if (current.valor < valor) {
          current = current.next;
      } else {
        if (current == this.head) {
          nodo.next = this.head;
          this.head.prev = nodo;
          this.head = nodo;
          this.size+=1;
          return;
          } else {
            nodo.next=current.prev.next;
            nodo.prev=current.prev;
            current.prev.next=nodo;
            current.prev=nodo;
            this.size+=1;
            return;
          }
        }
      }
      this.tail.next=nodo;
      nodo.prev=this.tail;
      this.tail=nodo;
      this.size+=1;
  }
  eliminar(valor){
    let nodo=this.buscar(valor);
    if(nodo!=null){
      if(this.size==1){
        this.head=null;
        this.tail=null;
      }else{
        if(nodo==this.head){
          this.head.next.prev=null;
          this.head=this.head.next;
        }else if(nodo==this.tail){
          this.tail.prev.next=null;
          this.tail=this.tail.prev;
        }else{
          nodo.prev.next=nodo.next;
          nodo.next.prev=nodo.prev;
        }
      }
      this.size-=1;
    }
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
  Size(){
    return this.size;
  }
}

module.exports = Lista;
