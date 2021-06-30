import { NodoHashCerrado } from './nodo-hash-cerrado';

export class TablaHashCerrada {
    size: number;
    minimo: number;
    maximo: number;
    arreglo: any[];
    elementosCargados: number;
    factorCarga: any;
    prueba: string;
    funcion: string;
    constante: any;
    
    constructor() {
        this.size = 0;
        this.minimo = 0;
        this.maximo = 0;
        this.arreglo = [];
        this.elementosCargados = 0;
        this.factorCarga = 0;
        this.prueba = 'lineal';
        this.funcion = 'division';
        this.constante = 0;
    }

    llenarArreglo(size: number, minimo: number, maximo: number, prueba: string, funcion: string, constante: any): void {
        for (let x = 0; x < size; x++) {
            this.arreglo.push(null);
        }
        this.size = size;
        this.minimo = minimo;
        this.maximo = maximo;
        this.prueba = prueba;
        this.funcion = funcion;
        this.constante = constante;
    }

    agregar(valor: any): void {
        let p = 0;
        if (this.funcion.toLowerCase() === 'simple') {
            p = this.hashSimple(valor);
        }else if (this.funcion.toLowerCase() === 'division') {
            p = this.hashDivision(valor);
        }else if (this.funcion.toLowerCase() === 'multiplicacion') {
            p = this.hashMultiplicacion(valor, this.constante);
        }else {
            console.log('no se reconocio la funcion hash');
            p = this.hashDivision(valor);
        }

        let nuevoNodo = new NodoHashCerrado(valor, valor, p);

        if (this.arreglo[p] === null) {
            this.arreglo[p] = nuevoNodo;
            this.elementosCargados++;
            this.factorCarga = this.elementosCargados / this.size;
            this.rehash();
            return
        }

        if (this.prueba.toLowerCase() === 'lineal') {
            this.pruebaLineal(nuevoNodo, p);
        }else if (this.prueba.toLowerCase() === 'cuadratica') {
            this.pruebaCuadratica(nuevoNodo, p);
        }else if (this.prueba.toLowerCase() === 'doble') {
            this.pruebaDobleHash(nuevoNodo, p);
        }else {
            console.log('no se reconocio el tipo de prueba');
            this.pruebaLineal(nuevoNodo, p)
        }
        this.elementosCargados++;
        this.factorCarga = this.elementosCargados / this.size;
        this.rehash();
    }

    eliminar(valor: any): void {
        for (let x = 0; x < this.size; x++) {
            if (this.arreglo[x] !== null) {
                if (this.arreglo[x].valor == valor) {
                    this.arreglo[x] = null;
                    this.elementosCargados--;
                    this.factorCarga = this.elementosCargados / this.size;
                    this.rehash();
                }
            }
        }
    }

    actualizar(valor: any): void {
        this.eliminar(valor);
        this.agregar(valor);
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

        while(resultado >= 1) {
            resultado = resultado / 10;
        }

        return Math.floor(resultado * this.size);
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

        console.log(Math.floor(parseFloat(`${this.size*(resultado * (constante % 1))}`)));

        return Math.floor(parseFloat(`${this.size*(resultado * (constante % 1))}`));
    }

    getAscii(cadena: string): number {
        let resultado = 0;
        for (let x = 0; x < cadena.length; x++) {
            resultado += cadena.charCodeAt(x);
        }
        return resultado;
    }

    pruebaLineal(nodo: NodoHashCerrado, posicion: number): void {
        console.log('entro a lineal');
        let encontrado = false;
        let aux = posicion;
        while(!encontrado) {
            if (this.arreglo[aux] === null) {
                nodo.posicion = aux;
                this.arreglo[aux] = nodo;
                encontrado = true;
            }

            if (aux === this.arreglo.length - 1) {
                aux = 0;
            }else {
                aux++;
            }
        }
        
    }

    pruebaCuadratica(nodo: NodoHashCerrado, posicion: number): void {
        console.log('entro a cuadratica');
        let encontrado = false;
        let p = 1;
        let aux = posicion+p;
        while(!encontrado) {
            console.log(aux);
            if (this.arreglo[aux] === null) {
                nodo.posicion = aux;
                this.arreglo[aux] = nodo;
                encontrado = true;
            }
            p++;
            if ((aux + Math.pow(p, 2)) > (this.arreglo.length - 1)) {
                console.log(`se da la vuelta ${aux+Math.pow(p, 2)}`);
                aux = (aux + Math.pow(p, 2)) - (this.arreglo.length);
            }else {
                aux += Math.pow(p, 2);
            }
        }
    }

    pruebaDobleHash(nodo: NodoHashCerrado, posicion: number): void {
        console.log('entro a doble hash');
        let encontrado = false;
        let i = 0;
        let aux = posicion;
        while(!encontrado) {
            console.log(aux);
            if (this.arreglo[aux] === null) {
                nodo.posicion = aux;
                this.arreglo[aux] = nodo;
                encontrado = true;
            }
            i++;
            if ((aux + this.hashSimple(nodo.valor) * i * this.hashDivision(nodo.valor)) > this.arreglo.length) {
                aux = (aux + this.hashSimple(nodo.valor) * i * this.hashDivision(nodo.valor)) - this.arreglo.length;
            }else {
                aux += this.hashSimple(nodo.valor) * i * this.hashDivision(nodo.valor);
            }
        }
    }

    rehash(): void {
        if ((this.factorCarga * 100) < this.maximo) {
            return;
        }
        console.log('hay que hacer rehash');

        let nodos: any = [];

        for (let x = 0; x < this.size; x++) {
            if (this.arreglo[x] !== null) {
                nodos.push(this.arreglo[x]);
            }
            this.arreglo[x] = null;
        }

        this.factorCarga = 0;

        while((this.factorCarga * 100) < this.minimo) {
            this.arreglo.push(null);
            this.size++;
            this.factorCarga = this.elementosCargados / this.size;
        }

        this.elementosCargados = 0;

        for (let x = 0; x < nodos.length; x++) {
            this.agregar(nodos[x].valor);
        }
    }

    getNodos(): any {
        let nodos: any = [];
        for (let x = 0; x < this.size; x++) {
            const nodo = {
                id: x,
                label: '',
                shape: 'box',
                level: x
            };
            if (this.arreglo[x] !== null) {
                nodo.label = this.arreglo[x].valor;
            }else {
                nodo.label = `nodo vacio: ${x+1}`;
            }
            nodos.push(nodo);
        }
        return nodos;
    }

    getEdges(): any {
        let edges: any = [];
        for (let x = 0; x < this.size - 1; x++) {
            let edge = {
                from: x,
                to: x + 1
            }
            edges.push(edge);
        }
        return edges;
    }
}