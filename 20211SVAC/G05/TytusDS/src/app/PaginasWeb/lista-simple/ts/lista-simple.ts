import { NodoSimple } from './nodo-simple';

export class ListaSimple {
    primero: any;
    ultimo: any;
    cuenta = 0;
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    vacio(): boolean {
        return this.cuenta === 0;
    }

    insertarFinal(valor: any): void {
        if (this.vacio()) {
            this.primero = this.ultimo = new NodoSimple(valor);
        } else {
            const aux = this.ultimo;
            this.ultimo = aux.siguiente = new NodoSimple(valor);
        }
        this.cuenta++;
    }

    insertarInicio(valor: any): void {
    }

    eliminar(posicion: number): void {
        let aux = this.primero;
        if (posicion === this.cuenta){
            for (let i = 0; i < this.cuenta; i++){
                if (i === this.cuenta - 1){
                    this.ultimo = aux;
                    aux.siguiente = null;
                    this.cuenta -= 1;
                }
                aux = aux.siguiente;
            }
        }else{
            if (posicion === 0){
                this.primero = aux.siguiente;
                this.cuenta -= 1;
                return;
            }
            for (let i = 0; i < this.cuenta; i++){
                if (i === posicion - 1){
                    aux.siguiente = aux.siguiente.siguiente;
                    this.cuenta -= 1;
                }
                aux = aux.siguiente;
            }
        }

    }

    actualizar(posicion: number, valor: number): void {
        let aux = this.primero;
        for (let i = 0; i < this.cuenta; i++){
            if (posicion === i) {
                aux.valor = valor;
            }
            aux = aux.siguiente;
        }

    }

    buscar(valor: number): void {
        let aux = this.primero;
        for (let i = 0; i < this.cuenta; i++){
            if (aux.valor === valor) {
                console.log(`El valor ${valor} se encuentra en la posicion ${i}`);
            }
            aux = aux.siguiente;
        }
    }

    recorrer(): void {
        let aux = this.primero;
        for (let i = 0; i < this.cuenta; i++){
            console.log(aux.valor);
            aux = aux.siguiente;
        }
    }
}
