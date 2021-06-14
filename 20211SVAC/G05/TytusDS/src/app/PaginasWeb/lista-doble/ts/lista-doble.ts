import { NodoDoble } from './nodo-doble';

export class ListaDoble{
    primero: any;
    ultimo: any;
    cuenta: number;
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.cuenta = 0;
    }

    vacia(): boolean {
        return this.cuenta === 0;
    }

    agregarFinal(valor: number): void {
        if (this.vacia()){
            this.primero = this.ultimo = new NodoDoble(valor);
        }else {
            const aux = this.ultimo;
            this.ultimo = aux.siguiente = new NodoDoble(valor);
            this.ultimo.anterior = aux;
        }
        this.cuenta += 1;
    }

    agregarInicio(valor: number): void {
        if (this.vacia()){
            this.primero = this.ultimo = new NodoDoble(valor);
        }else {
            const aux = new NodoDoble(valor);
            aux.siguiente = this.primero;
            this.primero.anterior = aux;
            this.primero = aux;
        }
        this.cuenta += 1;
    }

    recorrer(): void {
        let aux = this.primero;
        while (aux){
            console.log(aux.valor);
            aux = aux.siguiente;
        }
    }
}
