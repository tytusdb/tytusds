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

    verRepetido(valor: any): boolean {
        let aux = this.primero;
        let repetido = false;
        for (let i = 0; i < this.cuenta; i++) {
            if (aux.valor === valor) {
                repetido = true;
            }
            aux = aux.siguiente
        }
        return repetido;
    }

    agregarFinal(valor: any): void {
        if (this.vacia()){
            this.primero = this.ultimo = new NodoDoble(valor);
        }else {
            const aux = this.ultimo;
            this.ultimo = aux.siguiente = new NodoDoble(valor);
            this.ultimo.anterior = aux;
        }
        this.cuenta += 1;
    }

    agregarInicio(valor: any): void {
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

    eliminar(posicion: number): void {
        if (posicion === 0) {
             let aux = this.primero;
             this.primero = aux.siguiente;
             this.primero.anterior = null;
             this.cuenta -= 1;
             return;        
        }

        if (posicion === this.cuenta - 1) {
            let aux = this.ultimo;
            this.ultimo = aux.anterior;
            this.ultimo.siguiente = null;
            this.cuenta -= 1;
            return;
        }
        let aux = this.primero;
        for (let i = 0; i < this.cuenta; i++) {
            if (posicion === i) {
                aux.anterior.siguiente = aux.siguiente;
                aux.siguiente.anterior = aux.anterior;
            }
            aux = aux.siguiente;
        }
        this.cuenta -= 1;
    }

    actualizar(posicion: number, valor: any): void {
        let aux = this.primero;
        for (let i = 0; i < this.cuenta; i++) {
            if (i === posicion) {
                aux.valor = valor;
            }
            aux = aux.siguiente;
        }
    }

    recorrer(): void {
        let aux = this.primero;
        while (aux){
            console.log(aux.valor);
            aux = aux.siguiente;
        }
    }

    getNodos(): any[] {
        let nodos: any[] = [];
        let aux = this.primero;
        for (let i = 0; i < this.cuenta; i++) {
            const nodo = {
                id: i,
                label: aux.valor
            };
            nodos.push(nodo);
            aux = aux.siguiente;
        }
        return nodos;
    }

    getEdges(): any[] {
        let edges: any[] = [];
        for (let i = 0; i < this.cuenta; i++) {
            if (i < this.cuenta - 1) {
                const edge1 = {
                    from: i,
                    to: i + 1 
                };
                edges.push(edge1);
                const edge2 = {
                    from: i + 1,
                    to: i
                };
                edges.push(edge2);
            }
        }
        return edges;
    }
}
