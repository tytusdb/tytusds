class Nodo{
  constructor(valor,padre) {
    this.padre=padre;
    this.valor=valor;
    this.next=null;
    this.prev=null;
    this.izquierda=null;
    this.derecha=null;
  }
}

module.exports = Nodo
