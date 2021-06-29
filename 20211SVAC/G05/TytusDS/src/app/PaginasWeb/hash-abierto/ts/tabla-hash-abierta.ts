import { NodoHashAbierto } from './nodo-hash-abierto';
import { LlaveHashAbierto } from './llave-hash-abierto';

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
        this.size = size;
        this.minimo = minimo;
        this.maximo = maximo;
    }

    agregar(id: any, clave: any, valor: any, metodo?: string, constante?: any): void {
        let p = 0;
        if (metodo?.toLowerCase() === 'simple') {
            p = this.hashDivision(id)
        } else if (metodo?.toLowerCase() === 'division') {
            p = this.hashDivision(id)
        } else if (metodo?.toLowerCase() === 'multiplicacion') {
            p = this.hashMultiplicacion(id, constante);
        } else {
            p = this.hashDivision(id)
        }
        if (this.arreglo[p] !== null) {
            let llave = new LlaveHashAbierto(clave, valor);
            this.arreglo[p].lista.push(llave);
        } else {
            let nuevaNodo = new NodoHashAbierto(p); 
            nuevaNodo.lista.push(new LlaveHashAbierto(clave, valor));
            this.arreglo[p] = nuevaNodo;
            this.elementosCargados++;
            this.factorDeCarga = this.elementosCargados / this.size;
        }
    }

    eliminar(valor: any, metodo: string, constante?: any): void {
        let resultado = 0;
        if (isNaN(valor)) {
            resultado = this.getAscii(valor);
        }else {
            resultado = parseInt(valor, 10);
        }

        let posicion = 0;

        if (metodo?.toLowerCase() === 'simple') {
            posicion = this.hashDivision(resultado)
        } else if (metodo?.toLowerCase() === 'division') {
            posicion = this.hashDivision(resultado)
        } else if (metodo?.toLowerCase() === 'multiplicacion') {
            posicion = this.hashMultiplicacion(resultado, constante);
        } else {
            posicion = this.hashDivision(resultado)
        }

        if (this.arreglo[posicion] === null) return;

        let indice = 0;

        this.arreglo[posicion].lista.forEach( (e: any, i) => {
            if (e.clave == valor){
                indice = i;
            }
        });

        this.arreglo[posicion].lista.splice(indice, 1);

        if (this.arreglo[posicion].lista.length === 0) {
            this.arreglo[posicion] = null;
        }
    }

    actualizar(valorAntiguo: any, valorNuevo: any, metodo: string, constante: any): void {
        this.eliminar(valorAntiguo, metodo, constante);
        this.agregar(valorNuevo, valorNuevo, valorNuevo, metodo, constante);
    }

    reHash(): void {
        let s = this.size;
        let factor = 0;
        while (factor < 0.3) {
            factor = this.elementosCargados / s;
            s++;
        }

        let arr: any = [];
        this.elementosCargados = 0;

        for (let i = 0; i < s; i++) {
            arr.push(null);
        }

        let aux = this.arreglo;
        
        this.arreglo = arr;
        this.size = s;

        console.log(`Nuevo tama;o ${s} tamano: ${arr.length}`);

        for (let i = 0; i < aux.length; i++) {
            if (aux[i]) {
                for (let j = 0; j < aux[i].lista.length; j++) {
                    this.agregar(this.getAscii(aux[i].lista[j].clave), aux[i].lista[j].clave, aux[i].lista[j].valor);
                }
            }
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

    getAscii(cadena: string): number {
        let resultado = 0;
        for (let x = 0; x < cadena.length; x++) {
            resultado += cadena.charCodeAt(x);
        }
        return resultado;
    }

    getNodos(): any[] {
        let nodos: any = [];
        for (let x = 0; x < this.arreglo.length; x++) {
            let nodo = {
                id : x,
                label: '',
                level: x,
                shape: 'box'
            };
            if (this.arreglo[x] === null) {
                nodo.label = 'vacio';
                nodos.push(nodo);
            } else {
                nodo.label = `${x+1}`;
                nodos.push(nodo);
                for (let y = 0; y < this.arreglo[x].lista.length; y++) {
                    let n = {
                        id: +`${x}${y}1111`,
                        label: this.arreglo[x].lista[y].valor,
                        level: x,
                        shape: 'box'
                    };
                    nodos.push(n);
                }   
            }
        }
        return nodos;
    }

    getEdges(): any[] {
        let edges: any = [];
        for (let x = 0; x < this.arreglo.length; x++) {
            if (x < this.arreglo.length - 1){
                let edge = {
                    from : x,
                    to: x + 1
                };
                edges.push(edge);
            }
            if (this.arreglo[x] !== null) {
                for (let y = 0; y < this.arreglo[x].lista.length; y++) {
                    if (y === 0) {
                        let e = {
                            from: x,
                            to: +`${x}01111`
                        };
                        edges.push(e);
                    }else if (y <= this.arreglo[x].lista.length - 1){
                        let e = {
                            from: +`${x}${y-1}1111`,
                            to: +`${x}${y}1111`
                        };
                        edges.push(e);
                    }
                }
            }
        }
        return edges;
    }
}