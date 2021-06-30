class Nodo{
  constructor(valor,x=null,y=null) {
    this.valor=valor;
    this.x=x;
    this.y=y;
    this.next=null;
    this.prev=null;
    this.arriba=null;
    this.abajo=null;
    this.izq=null;
    this.der=null;
  }
}

module.exports = Nodo
