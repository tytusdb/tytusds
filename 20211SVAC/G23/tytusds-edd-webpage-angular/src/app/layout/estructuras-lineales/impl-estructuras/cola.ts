import NodoSimple from "./nodo-simple";

export default class Cola {
  inicio: NodoSimple;
  longitud:number;

  constructor(){
    this.longitud = 0;
  }
  estaVacia(): boolean {
    return this.longitud == 0;
  }
  toArray(): any[] {
    const colaArray = new Array(this.longitud);
    let aux=this.inicio;
    let i=0;
    while(aux!=null){
      colaArray[i]=aux.getData();
      i++;
      aux=aux.getNext();
    }
    return colaArray;
  }
  size(): number {
    return this.longitud;
  }
  encolar(data: any) {
    let nuevo=new NodoSimple(data);
    if(this.longitud==0){
      this.inicio=nuevo;
    }else{
        let aux=this.inicio;
        while(aux.getNext()!=null){
          aux=aux.getNext();
        }
        aux.setNext(nuevo);
    }
    this.longitud++;    
  }
  desencolar(): any {
    let nodo=null;
    if(this.longitud>0){
      nodo = this.inicio;
      this.inicio=this.inicio.getNext();
      this.longitud--;
    }
    return nodo;
  }
  existeValor(valor):boolean{
    let existeValor=false;
    let aux=this.inicio;
    while(aux!=null&&!existeValor){
      if(aux.getData()==valor){
        return true;
      }
      aux=aux.getNext();
    }
    return existeValor;
  }
}