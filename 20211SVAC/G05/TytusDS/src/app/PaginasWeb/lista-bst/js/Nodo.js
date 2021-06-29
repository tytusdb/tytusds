class Nodo{
  constructor(valor,padre=null,nivel=0) {
    this.nivel=nivel;
    this.padre=padre;
    this.valor=valor;
    this.next=null;
    this.prev=null;
    this.izquierda=null;
    this.derecha=null;
  }
}

module.exports = Nodo
