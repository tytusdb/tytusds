import { NodoAvl } from './nodo-avl';

export class Avl {
    raiz: any;
    constructor() {
        this.raiz = null;
    }

    agregar(valor: any): void {
        this.raiz = this._agregar(valor, this.raiz);
    }

    private _agregar(valor: any, temporal: any): any {
        if (temporal === null) return new NodoAvl(valor);
        else if (valor > temporal.valor) {
            temporal.derecha = this._agregar(valor, temporal.derecha);
            if (this.getAltura(temporal.derecha) - this.getAltura(temporal.izquierda) === 2){
                if (valor > temporal.derecha.valor) {
                    temporal = this.rotarDerechDerecha(temporal);
                }else {
                    temporal = this.bajarDerechaDerecha(temporal);
                }
            }
        }else {
            temporal.izquierda = this._agregar(valor, temporal.izquierda);
            if (this.getAltura(temporal.izquierda) - this.getAltura(temporal.derecha) === 2) {
                if (valor < temporal.izquierda.valor) {
                    temporal = this.rotarDerechaIzquierda(temporal);
                } else {
                    temporal = this.bajarDerechaIzquierda(temporal);
                }
            }
        }
        const derecha = this.getAltura(temporal.derecha);
        const izquierda = this.getAltura(temporal.izquierda);
        const maximo = this.maximo(derecha, izquierda);
        temporal.nivel = maximo + 1;
        return temporal;
    }

    maximo(derecha, izquierda): any {
        if (derecha > izquierda){
            return derecha;
        } else {
            return izquierda;
        }
    }

    getAltura(temporal: any): number {
        if (temporal === null) return -1;
        else return temporal.nivel;
    }

    rotarDerechaIzquierda(nodo1: any): any {
        let nodo2 = nodo1.izquierda;
        nodo1.izquierda = nodo2.derecha;
        nodo2.derecha = nodo1;
        nodo1.nivel = this.maximo(this.getAltura(nodo1.izquierda), this.getAltura(nodo1.derecha)) + 1
        nodo2.nivel = this.maximo(this.getAltura(nodo2.izquierda), nodo1.nivel) + 1;
        return nodo2;
    }

    rotarDerechDerecha(nodo1: any): any {
        let nodo2 = nodo1.derecha;
        nodo1.derecha = nodo2.izquierda;
        nodo2.izquierda = nodo1;
        nodo1.nivel = this.maximo(this.getAltura(nodo1.izquierda), this.getAltura(nodo1.derecha)) + 1;
        nodo2.nivel = this.maximo(this.getAltura(nodo2.izquierda), nodo1.nivel) + 1;
        return nodo2
    }

    bajarDerechaIzquierda(temporal: any): any {
        temporal.izquierda = this.rotarDerechDerecha(temporal.izquierda);
        return this.rotarDerechaIzquierda(temporal)
    }

    bajarDerechaDerecha(temporal: any): any {
        temporal.derecha = this.rotarDerechaIzquierda(temporal.derecha);
        return this.rotarDerechDerecha(temporal);
    }
    
    preorden(): void {
        this._preorden(this.raiz);
    }

    private _preorden(temp: any): void {
        if (temp) {
            console.log(temp.valor);
            this._preorden(temp.izquierda);
            this._preorden(temp.derecha);
        }
    }

    getNodos(): any {
        let nodos: any = [];
        
    }

}