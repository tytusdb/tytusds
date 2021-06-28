import { NodoHashCerrado } from './nodo-hash-cerrado';
import { LlaveHashCerrado } from './llave-hash-cerrado';
export class TablaHashAbierta {
    
    arreglo: any[];
    size: number;
    elementosCargados: number;
    factorDeCarga: any;
    minimo: any = null;
    maximo: any = null;

    constructor() {
        this.arreglo = [];
        this.size = 0;
        this.elementosCargados = 0;
        this.factorDeCarga = 0;
    }

    llenarArreglo(size: number, minimo: number, maximo: number): void {
        for (let x = 0; x < size; x++) {
            this.arreglo.push(null);
        }
        this.minimo = minimo;
        this.maximo = maximo;
    }

    agregar(id: any, clave: any, valor: any): void {
        let p = this.hashDivision(id)
        if (this.arreglo[p] !== null) {
            let llave = new LlaveHashCerrado(clave, valor);
            this.arreglo[p].lista.push(llave);
        } else {
            let nuevaNodo = new NodoHashCerrado(p); 
            nuevaNodo.lista.push(new LlaveHashCerrado(clave, valor));
            this.arreglo[p] = nuevaNodo;
            this.elementosCargados++;
            this.factorDeCarga = this.elementosCargados / this.size;
        }
    }

    hashSimple(entrada: any): any {
        let resultado = 0;
        if (isNaN(entrada)) {
            for (let x = 0; x < entrada.length; x++) {
                resultado +=  entrada.charCodeAt(x);
            }
        } else {
            resultado = parseInt(entrada, 10);
        }

        return (resultado * this.size);
    }

    hashDivision(entrada: any): any {
        let resultado = 0;
        if (isNaN(entrada)) {
            for (let x = 0; x < entrada.length; x++) {
                resultado +=  entrada.charCodeAt(x);
            }
        } else {
            resultado = parseInt(entrada, 10);
        }

        return resultado % this.size;
    }

    hashMultiplicacion(entrada: any, constante: any): any {
        let resultado = 0;
        if (isNaN(entrada)) {
            for (let x = 0; x < entrada.length; x++) {
                resultado +=  entrada.charCodeAt(x);
            }
        } else {
            resultado = parseInt(entrada, 10);
        }

        console.log(parseFloat(`${this.size*(resultado * constante % 1)}`));

        return Math.round(this.size*((resultado * constante) % 1));
    }

}