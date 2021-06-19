import NodoSimple from "./nodo-simple";
import {JsonSalidaNodoPrioridad} from './json-nodo';

export default class ColaPrioridad {
  private colaPrioridad:NodoSimple;
  elementos = [];
  constructor(){
    this.colaPrioridad=null;
  }
  estaVacia(): boolean {
    return this.elementos.length == 0;
  }
  toArray(): any[] {
    let valores=[];
    for(let val of this.elementos){
      valores.push(val.getData());
    }
    return valores;
  }
  toArrayJson(): JsonSalidaNodoPrioridad[] {
    let valores=[];
    for(let val of this.elementos){
      let j=new JsonSalidaNodoPrioridad(val.getData(),val.getPrioridad());
      valores.push(j);
    }
    return valores;
  }
  size(): number {
    return this.elementos.length;
  }
  
  encolar(data: any, prioridad:number): void {
    let nuevoNodo:NodoSimple;
    nuevoNodo=new NodoSimple(data);
    nuevoNodo.setPrioridad(prioridad);

    if(this.elementos.length == 0){
        this.elementos.push(nuevoNodo);
    } else{
        let flag = false;
        for(let i =0 ; i< this.elementos.length; i++){
            if(nuevoNodo.getPrioridad() < this.elementos[i].getPrioridad()){
                this.elementos.splice(i,0,nuevoNodo);
                flag = true;
                break;
            }
        }
        if(!flag){
            this.elementos.push(nuevoNodo);
        }
    }
  }

  desencolar() {
    return this.elementos.shift();
  }
  peek() {
    return this.elementos[this.elementos.length - 1];
  }
  actualizar(posicion, newData){
    throw new Error("Method not implemented.");
  }
}

