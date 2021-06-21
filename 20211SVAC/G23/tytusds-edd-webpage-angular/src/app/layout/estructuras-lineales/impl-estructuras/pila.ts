import NodoSimple from "./nodo-simple";
import ListaPadre from "./lista-padre";

export default class Pila implements ListaPadre {
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
    while(i<this.longitud){
      colaArray[i]=aux.getData();
      i++;
      aux=aux.getNext();
    }
    return colaArray;
  }
  size(): number {
    return this.longitud;
  }
  push(data: any): void {
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
  pop(): any {
    let nodo=null;
    if(this.longitud>0){
      if(this.longitud==1){
        this.inicio=null;
      }else{
        let aux=this.inicio;
        let previo=this.inicio;
        while(aux.getNext()!=null){
          previo=aux;
          aux=aux.getNext();
        }
        previo.setNext(null);
      }
      this.longitud--;
    }
    return nodo;
  }
  buscar(valor):boolean{
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
  peek() {
    throw new Error("Method not implemented.");
  }
  agregarAlInicio(data: any): void {
      throw new Error("Method not implemented.");
  }
  agregarAlFinal(data: any): void {
      throw new Error("Method not implemented.");
  }
  borrarAlInicio() {
      throw new Error("Method not implemented.");
  }
  borrarAlFinal() {
      throw new Error("Method not implemented.");
  }
  actualizar(posicion, newData){
    throw new Error("Method not implemented.");
  }
}