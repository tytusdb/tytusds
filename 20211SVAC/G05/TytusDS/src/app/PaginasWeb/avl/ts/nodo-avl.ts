export class NodoAvl {
    valor: any;
    izquierda: any;
    derecha: any;
    nivel: number;
    constructor(valor: any) {
        this.valor = valor;
        this.izquierda = null;
        this.derecha = null;
        this.nivel = 0;
    }
}