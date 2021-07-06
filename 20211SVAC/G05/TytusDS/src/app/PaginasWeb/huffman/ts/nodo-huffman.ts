export class NodoHuffman {
    codigo: string;
    izquierda: any;
    derecha: any;
    caracter: string = '';
    suma = 0;
    constructor(caracter?: string) {
        this.suma = 0;
        this.codigo = '';
        this.izquierda = null;
        this.derecha = null;
        if (caracter) {
            this.caracter = caracter;
        }
    }
}