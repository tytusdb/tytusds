import NodoSimple from "./nodo-simple";
import ListaPadre from "./lista-padre";

export default class ListaSimpleEnlazada implements ListaPadre {
  inicio: NodoSimple;

  constructor() {
    this.inicio = null;
  }

  public estaVacia(): boolean {
    return this.inicio === null;
  }

  public size(): number {
    if (this.estaVacia()) {
      return 0;
    } else {
      let i = 0;
      let aux = this.inicio;
      while (aux) {
        i++;
        aux = aux.getNext();
      }
      return i;
    }
  }

  public agregarAlInicio(data: any): void {
    if (data) {
      if (this.estaVacia()) {
        this.inicio = new NodoSimple(data);
      } else {
        const node = new NodoSimple(data);
        node.setNext(this.inicio);
        this.inicio = node;
      }
    } else {
      throw new Error("El parametro data no puede ser null o undefined");
    }
  }

  public agregarAlFinal(data: any): void {
    if (data) {
      if (this.estaVacia()) {
        this.inicio = new NodoSimple(data);
      } else {
        let aux = this.inicio;
        while (aux.getNext()) {
          aux = aux.getNext();
        }
        aux.setNext(new NodoSimple(data));
      }
    } else {
      throw new Error("El parametro data no puede ser null o undefined");
    }
  }

  public agregarEnIndice(data: any, i: number): void {
    if (data && i) {
      if (this.estaVacia() || i === 0) {
        this.agregarAlInicio(data);
      } else if (i === this.size() - 1) {
        this.agregarAlFinal(data);
      } else if (i > this.size()) {
        throw new Error("El parametro indice (i) no puede ser más grande que el tamaño de la lista");
      } else if (i < 0) {
        this.agregarEnIndice(data, this.size() + i);
      } else {
        let j = 0;
        let aux = this.inicio;
        const node = new NodoSimple(data);
        while (i < j) {
          aux = aux.getNext();
          j++;
        }
        node.setNext(aux.getNext());
        aux.setNext(node);
      }
    } else if (data) {
      throw new Error("El parametro indice (i) no puede ser null o undefined");
    } else if (i) {
      throw new Error("El parametro data no puede ser null o undefined");
    } else {
      throw new Error("Los dos parametros no pueden ser null o undefined");
    }
  }

  public borrarAlInicio(): any {
    if (this.estaVacia()) {
      return null;
    } else {
      const temp = this.inicio;
      this.inicio = this.inicio.getNext();
      temp.setNext(null);
      return temp.getData();
    }
  }

  public borrarAlFinal(): any {
    if (this.estaVacia()) {
      return null;
    } else {
      let aux = this.inicio;
      while (aux.getNext().getNext()) {
        aux = aux.getNext();
      }
      const temp = aux.getNext();
      aux.setNext(null);
      return temp.getData();
    }
  }

  public borrarEnIndice(i: number): any {
    if (i) {
      if (this.estaVacia() || i === 0) {
        return this.borrarAlInicio();
      } else if (i === this.size() - 1) {
        return this.borrarAlFinal();
      } else if (i > this.size()) {
        throw new Error("El parametro indice (i) no puede ser más grande que el tamaño de la lista");
      } else if (i < 0) {
        return this.borrarEnIndice(this.size() + i);
      } else {
        let j = 0;
        let aux = this.inicio;
        while (i < j) {
          aux = aux.getNext();
          j++;
        }
        const temp = aux.getNext();
        aux.setNext(aux.getNext().getNext());
        temp.setNext(null);
        return temp.getData();
      }
    } else {
      throw new Error("El parametro indice (i) no puede ser null o undefined");
    }
  }

  public toArray(): any[] {
    let node = this.inicio;
    const array = new Array(this.size());
    for (let i = 0; i < array.length; i++) {
      array[i] = node.getData();
      node = node.getNext();
    }
    return array;
  }

  public forEach(cb: any): void {
    const list = this;
    const size = this.size();
    let node = this.inicio;
    for (let i = 0; i < size; i++) {
      cb(node.getData(), i, list);
      node = node.getNext();
    }
  }

  public push(data:any):void{

  }
  public pop():void{
    
  }
  actualizar(posicion, newData){
    if (posicion < 0 || posicion >= this.size()) {
      return false
    }
    let current = this.inicio
    let index = 0
      while(index++ < posicion){
      current = current.getNext();
    }
    current.setData ( newData);
  }
}