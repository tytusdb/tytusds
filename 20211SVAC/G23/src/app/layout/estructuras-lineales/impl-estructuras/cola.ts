import NodoSimple from "./nodo-simple";

export default class Cola {
  inicio: NodoSimple;
  elementos = [];

  constructor(){
    this.elementos = [];
  }
  estaVacia(): boolean {
    return this.elementos.length === 0;
  }
  toArray(): any[] {
    return this.elementos;
  }
  size(): number {
    return this.elementos.length;
  }
  encolar(data: any): void {
    this.elementos.push(data);
  }
  desencolar(): any {
    return this.elementos.shift();
  }
  peek() {
    return this.elementos[this.elementos.length - 1];
  }
  actualizar(posicion, newData){
    throw new Error("Method not implemented.");
  }
}