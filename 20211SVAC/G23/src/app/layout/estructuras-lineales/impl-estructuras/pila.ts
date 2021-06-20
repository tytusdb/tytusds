import NodoSimple from "./nodo-simple";
import ListaPadre from "./lista-padre";

export default class Pila implements ListaPadre {
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
  push(data: any): void {
    this.elementos.push(data);
  }
  pop(): any {
    return this.elementos.pop();
  }
  peek() {
    return this.elementos[this.elementos.length - 1];
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