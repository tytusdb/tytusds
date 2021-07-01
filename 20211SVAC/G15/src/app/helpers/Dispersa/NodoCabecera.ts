import { Lista } from "./Lista";

export class NodoCabecera {
    private id: number;
    private value: number | string;
    private siguiente: NodoCabecera;
    private anterior: NodoCabecera;
    private lista: Lista




    constructor(id: number, value: number | string) {
        this.id = id
        this.value = value
        this.siguiente = null
        this.anterior = null
        this.lista = new Lista()
    }


    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getValue(): number | string {
        let temp:any = this.value
        if (isNaN(temp)) return this.value
        return +this.value
    }

    public setValue(value: number | string): void {
        this.value = value;
    }

    public getSiguiente(): NodoCabecera {
        return this.siguiente;
    }

    public setSiguiente(siguiente: NodoCabecera): void {
        this.siguiente = siguiente;
    }

    public getAnterior(): NodoCabecera {
        return this.anterior;
    }

    public setAnterior(anterior: NodoCabecera): void {
        this.anterior = anterior;
    }

    public getLista(): Lista {
        return this.lista;
    }

    public setLista(lista: Lista): void {
        this.lista = lista;
    }


}