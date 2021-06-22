import { NodoAvl } from './nodo-avl';

export class ArbolAvl {
    raiz: any;
    nodos: any = [];
    constructor() {
        this.raiz = null;
    }

    altura(nodo: NodoAvl): number {
        if (nodo == null) {
            return 0;
        }
        return nodo.nivel;
    }

    maximo(derecha, izquierda): any {
        if (derecha > izquierda){
            return derecha;
        } else {
            return izquierda;
        }
    }

    rotarDerecha(y: NodoAvl): NodoAvl {
        let x = y.izquierda;
        let t2 = x.derecha;

        x.derecha = y;
        y.izquierda = t2;

        y.nivel = this.maximo(this.altura(y.izquierda), this.altura(y.derecha)) + 1;
        x.nivel = this.maximo(this.altura(x.izquierda), this.altura(x.derecha)) + 1;

        return x;
    }

    rotarIzquierda(x: NodoAvl): NodoAvl {
        let y = x.derecha;
        const t2 = y.izquierda;

        y.izquierda = x;
        x.derecha = t2;

        x.nivel = this.maximo(this.altura(x.izquierda), this.altura(x.derecha)) + 1;
        y.nivel = this.maximo(this.altura(y.izquierda), this.altura(y.derecha)) + 1;

        return y;
    }

    balance(nodo: NodoAvl): number {
        if (nodo === null) {
            return 0;
        }
        return this.altura(nodo.izquierda) - this.altura(nodo.derecha);
    }

    insertar(nodo: NodoAvl, valor: any): any {
        if (nodo === null) {
            return new NodoAvl(valor);
        }

        if (valor < nodo.valor) {
            nodo.izquierda = this.insertar(nodo.izquierda, valor);
        }else if (valor > nodo.valor) {
            nodo.derecha = this.insertar(nodo.derecha, valor);
        }else {
            return nodo;
        }

        nodo.nivel = 1 + this.maximo(this.altura(nodo.izquierda), this.altura(nodo.derecha));

        let balance = this.balance(nodo);
        if (balance > 1 && valor < nodo.izquierda.valor) {
            return this.rotarDerecha(nodo);
        }
        if (balance < -1 && valor > nodo.derecha.valor) {
            return this.rotarIzquierda(nodo);
        }
        if (balance > 1 && valor > nodo.izquierda.valor) {
            nodo.izquierda = this.rotarIzquierda(nodo.izquierda);
            return this.rotarDerecha(nodo);
        }
        if (balance < -1 && valor < nodo.derecha.valor) {
            nodo.derecha = this.rotarDerecha(nodo.derecha);
            return this.rotarIzquierda(nodo);
        }
        return nodo;
    }

    getNodoMenor(nodo: NodoAvl): NodoAvl {
        let aux = nodo;
        while (aux.izquierda !== null) {
            aux = aux.izquierda;
        }
        return aux;
    }

    eliminar(nodo: any, valor: any): NodoAvl {
        if (nodo === null) {
            return nodo;
        }
        if (valor < nodo.valor) {
            nodo.izquierda = this.eliminar(nodo.izquierda, valor);
        }else if (valor > nodo.valor) {
            nodo.derecha = this.eliminar(nodo.derecha, valor);
        } else {
            if (nodo.izquierda === null || nodo.derecha === null) {
                let aux: any = null;
                if (aux === nodo.izquierda) {
                    aux = nodo.derecha;
                }else {
                    aux = nodo.izquierda;
                }
                if (aux === null) {
                    aux = nodo;
                    nodo = null;
                }else {
                    aux = nodo;
                }
            }else {
                let aux = this.getNodoMenor(nodo.derecha);
                nodo.valor = aux.valor;
                nodo.derecha = this.eliminar(nodo.derecha, aux.valor);
            }
        }
        if (nodo === null) {
            return nodo;
        }
        nodo.nivel = this.maximo(this.altura(nodo.izuierda), this.altura(nodo.derecha)) + 1;
        let balance = this.balance(nodo);

        if (balance > 1 && this.balance(nodo.izquierda) >= 0){
            return this.rotarDerecha(nodo); 
        }
  
        if (balance > 1 && this.balance(nodo.izquierda) < 0) { 
            nodo.izquierda = this.rotarIzquierda(nodo.izquierda); 
            return this.rotarDerecha(nodo); 
        } 

        if (balance < -1 && this.balance(nodo.right) <= 0) {
            return this.rotarIzquierda(nodo); 
        }

        if (balance < -1 && this.balance(nodo.right) > 0) { 
            nodo.right = this.rotarDerecha(nodo.right); 
            return this.rotarIzquierda(nodo); 
        } 
  
        return nodo;
    }

    actualizar(nodo: NodoAvl, valor: any, nuevoValor: any): void {
        if (nodo !== null) {
            if (nodo.valor === valor) {
                nodo.valor = nuevoValor;
                return;
            }
            this.actualizar(nodo.izquierda, valor, nuevoValor);
            this.actualizar(nodo.derecha, valor, nuevoValor);
        }
    }

    preorden(nodo: NodoAvl): void {
        if (nodo !== null) {
            let encontrado = false;
            for (let x = 0; x < this.nodos.length; x++) {
                if (this.nodos[x] === nodo) {
                    encontrado = true;
                }
            }
            if (!encontrado){
                this.nodos.push(nodo);
            }
            this.preorden(nodo.izquierda);
            this.preorden(nodo.derecha);
        }
    }

    getNodos(): any {
        this.nodos = [];
        this.preorden(this.raiz);
        let arr: any = [];
        for (let x = 0; x < this.nodos.length; x++) {
            const nodo = {
                id: x,
                label: `${this.nodos[x].valor}`,
                nodo: this.nodos[x]
            };
            arr.push(nodo);
        }
        console.log(arr);
        return arr;
    }

    getEdges(): any {
        let nodos = this.getNodos();
        let edges: any = [];
        for (let x = 0; x < nodos.length; x++) {
            for (let y = x + 1; y < nodos.length; y++) {
                if (nodos[x].nodo.izquierda !== null) {
                    if (`${nodos[x].nodo.izquierda.valor}` === nodos[y].label){
                        edges.push({
                            from: nodos[x].id,
                            to: nodos[y].id
                        })
                    }
                }
                if (nodos[x].nodo.derecha !== null) {
                    if (`${nodos[x].nodo.derecha.valor}` === nodos[y].label){
                        edges.push({
                            from: nodos[x].id,
                            to: nodos[y].id
                        })
                    }
                }
            }
        }
        return edges;
    }
}