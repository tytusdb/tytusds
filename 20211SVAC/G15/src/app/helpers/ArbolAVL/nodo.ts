
export class nodo{
     dato: number|string
     left: nodo
     right: nodo
     altura:number
    constructor(dato) {
        this.dato = dato;
        this.left = null;
        this.right = null;
        this.altura = 0;
    }
}