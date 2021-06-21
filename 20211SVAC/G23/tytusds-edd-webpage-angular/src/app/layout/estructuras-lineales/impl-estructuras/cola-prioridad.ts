import NodoSimple from "./nodo-simple";
import {JsonSalidaNodoPrioridad} from './json-nodo';

export default class ColaPrioridad {
  private colaPrioridad:NodoSimple;
  longitud:number;
  constructor(){
    this.longitud=0;
    this.colaPrioridad=null;
  }
  estaVacia(): boolean {
    return this.longitud == 0;
  }
  toArray(): any[] {
    const colaArray = new Array(this.longitud);
    let aux=this.colaPrioridad;
    let i=0;
    while(i<this.longitud){
      colaArray[i]=aux.getData();
      i++;
      aux=aux.getNext();
    }
    return colaArray;
  }
  toArrayJson(): JsonSalidaNodoPrioridad[] {
    const colaArray = new Array(this.longitud);
    let aux=this.colaPrioridad;
    let i=0;
    while(i<this.longitud){
      colaArray[i]=new JsonSalidaNodoPrioridad(aux.getData(),aux.getPrioridad());
      i++;
      aux=aux.getNext();
    }
    return colaArray;
  }
  size(): number {
    return this.longitud;
  }
  
  encolar(data: any, prioridad:number): void {
    let nuevoNodo:NodoSimple;
    nuevoNodo=new NodoSimple(data);
    nuevoNodo.setPrioridad(prioridad);

    if(this.longitud == 0){
        this.colaPrioridad=nuevoNodo;
    } else{
        let flag = false;
        let aux=this.colaPrioridad;
        let previo=this.colaPrioridad;
        //busca en la cola si la prioridad del nodo nuevo es menor a una existente 
        for(let i =0 ; i< this.longitud; i++){
            if(nuevoNodo.getPrioridad() < aux.getPrioridad()){
                previo.setNext(nuevoNodo);
                nuevoNodo.setNext(aux);
                flag = true;
                break;
            }
            previo=aux;
            aux=aux.getNext();
        }
        //si no encuentra, insertar al final de la cola
        if(!flag){
          let aux=this.colaPrioridad;
          while(aux.getNext()!=null){
            aux=aux.getNext();
          }
          aux.setNext(nuevoNodo);
        }
    }
    this.longitud++;
  }

  desencolar() {
    let nodo=null;
    if(this.longitud>0){
      nodo = this.colaPrioridad;
      this.colaPrioridad=this.colaPrioridad.getNext();
      this.longitud--;
    }
    return nodo;
  }
  buscar(valor):boolean{
    let existeValor=false;
    let aux=this.colaPrioridad;
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
  actualizar(posicion, newData){
    throw new Error("Method not implemented.");
  }
}
