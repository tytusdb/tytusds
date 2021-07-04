import { NodoHashAbierto } from './nodo-hash-abierto';
import { LlaveHashAbierto } from './llave-hash-abierto';

export class TablaHashAbierta {
    
    arreglo: any[];
    size: number;
    elementosCargados: number;
    factorDeCarga: any;
    minimo: any = null;
    maximo: any = null;
    metodo = '';
    prueba = '';
    constante = 0.1625277911;
    nodosUtilizados = 0;

    constructor() {
        this.arreglo = [];
        this.size = 0;
        this.elementosCargados = 0;
        this.factorDeCarga = 0;
    }

    llenarArreglo(size: number, minimo: number, maximo: number, metodo: string, prueba: string): void {
        for (let x = 0; x < size; x++) {
            this.arreglo.push(null);
        }
        this.size = size;
        this.minimo = minimo;
        this.maximo = maximo;
        this.metodo = metodo;
        this.prueba = prueba;
        this.constante = 0.1625277911;
    }

    agregar(valor: any): void {
        let p = 0;
        if (this.metodo.toLowerCase() === 'simple') {
            p = this.hashSimple(valor)
        } else if (this.metodo.toLowerCase() === 'division') {
            p = this.hashDivision(valor)
        } else if (this.metodo.toLowerCase() === 'multiplicacion') {
            p = this.hashMultiplicacion(valor, this.constante);
        } else {
            console.log('NO SE RECONOCE LA FUNCION');
            p = this.hashDivision(valor)
        }
        if (this.arreglo[p] !== null) {
            let llave = new LlaveHashAbierto(valor, valor);
            this.arreglo[p].lista.push(llave);
            this.elementosCargados++;
            this.factorDeCarga = this.nodosUtilizados / this.size;
        } else {
            let nuevaNodo = new NodoHashAbierto(p); 
            nuevaNodo.lista.push(new LlaveHashAbierto(valor, valor));
            this.arreglo[p] = nuevaNodo;
            this.nodosUtilizados++;
            this.elementosCargados++;
            this.factorDeCarga = this.nodosUtilizados / this.size;
            this.reHash();
        }
    }

    eliminar(valor: any): void {
        let resultado = 0;
        if (isNaN(valor)) {
            resultado = this.getAscii(valor);
        }else {
            resultado = parseInt(valor, 10);
        }

        let posicion = 0;

        if (this.metodo.toLowerCase() === 'simple') {
            posicion = this.hashSimple(resultado)
        } else if (this.metodo.toLowerCase() === 'division') {
            posicion = this.hashDivision(resultado)
        } else if (this.metodo.toLowerCase() === 'multiplicacion') {
            posicion = this.hashMultiplicacion(resultado, this.constante);
        } else {
            console.log('NO SE RECONOCE LA FUNCION');
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
        this.elementosCargados--;

        if (this.arreglo[posicion].lista.length === 0) {
            this.arreglo[posicion] = null;
            this.nodosUtilizados--;
            this.factorDeCarga = this.nodosUtilizados / this.size;
        }
    }

    actualizar(valorAntiguo: any, valorNuevo: any): void {
        this.eliminar(valorAntiguo);
        this.agregar(valorNuevo);
    }

    reHash(): void {
        if ((this.factorDeCarga * 100) <= this.maximo) {
            return;
        }
        console.log('REHASHING');
        
        let aux = this.arreglo;
        let m = this.size;
        this.size = Math.ceil((this.nodosUtilizados * 100) / this.minimo);
        this.nodosUtilizados = 0;
        this.arreglo = [];
        for (let x = 0; x < this.size; x++) {
            this.arreglo.push(null);
        }
        this.factorDeCarga = 0;
        this.elementosCargados = 0;
        for (let x = 0; x < m; x++) {
            if (aux[x] !== null) {
                for (let y = 0; y < aux[x].lista.length; y++) {
                    this.agregar(aux[x].lista[y].valor);
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

        while(resultado >= 1) {
            resultado = resultado / 10;
        }

        return Math.round(resultado * this.size);
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

        console.log(Math.floor(this.size * (resultado * constante % 1)));

        //console.log(Math.floor(parseFloat(`${this.size*(resultado * (constante % 1))}`)));

        return Math.floor(this.size * (resultado * constante % 1));
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
                id : `n${x}`,
                label: '',
                level: x,
                shape: 'box',
                color: ''
            };
            if (this.arreglo[x] === null) {
                nodo.label = `Nodo vacio ${x+1}` ;
                nodo.color = 'red';
                nodos.push(nodo);
            } else {
                nodo.label = `Nodo ${x+1}`;
                nodo.color = '#ED9106';
                nodos.push(nodo);
                for (let y = 0; y < this.arreglo[x].lista.length; y++) {
                    let n = {
                        id: `${x}p${y}`,
                        label: this.arreglo[x].lista[y].valor,
                        level: x,
                        shape: 'box',
                        color: 'green'
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
                    from : `n${x}`,
                    to: `n${x + 1}`
                };
                edges.push(edge);
            }
            if (this.arreglo[x] !== null) {
                for (let y = 0; y < this.arreglo[x].lista.length; y++) {
                    if (y === 0) {
                        let e = {
                            from: `n${x}`,
                            to: `${x}p${y}`
                        };
                        edges.push(e);
                    }else if (y <= this.arreglo[x].lista.length - 1){
                        let e = {
                            from: `${x}p${y-1}`,
                            to: `${x}p${y}`
                        };
                        edges.push(e);
                    }
                }
            }
        }
        return edges;
    }

    buscar(valor: any): string {
        let p = 0;
        if (this.metodo.toLowerCase() === 'simple') {
            p = this.hashSimple(valor)
        } else if (this.metodo.toLowerCase() === 'division') {
            p = this.hashDivision(valor)
        } else if (this.metodo.toLowerCase() === 'multiplicacion') {
            p = this.hashMultiplicacion(valor, this.constante);
        } else {
            p = this.hashDivision(valor)
        }
        let id = '';
        for (let x = 0; x < this.arreglo[p].lista.length; x++) {
            if (this.arreglo[p].lista[x].valor == valor) {
                id = `${p}p${x}`;
            }
        }
        return id;
    }
}