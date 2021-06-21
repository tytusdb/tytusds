let Nodo = require('./nodoAux')
class listaaux{
  constructor() {
    this.head = null
    this.tail=null
    this.size=0
  }
  append(valor){
    let nodo= new Nodo(valor);
    if(this.head==null){
      this.head=nodo;
      this.tail=this.head;
    }else{
      this.tail.next=nodo;
      this.tail=nodo;
    }
    this.size+=1;
  }
  buscar(valor) {
    let current = this.head;
    while (current!=null){
      if(current.valor==valor){
        return current
      }
      current=current.next
    }
    return null;
  }
  Reset(){
    this.head=null;
    this.size=0;
  }

}

module.exports = listaaux;
