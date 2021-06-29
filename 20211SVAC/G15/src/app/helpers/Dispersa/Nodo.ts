export class Nodo{
    private id:number|string;
    private value:number|string;
    private siguiente:Nodo;
    private anterior:Nodo;
    private arriba:Nodo;
    private abajo:Nodo; 


    constructor(id:number|string,value:number|string){
        this.id = id 
        this.value = value 
        this.siguiente = null 
        this.anterior = null 
        this.arriba = null 
        this.abajo = null
    }

    public getId(): number|string {
        return this.id;
    }

    public setId(id: number|string): void {
        this.id = id;
    }

    public getValue(): number|string {
        return this.value;
    }

    public setValue(value: number|string): void {
        this.value = value;
    }

    public getSiguiente(): Nodo {
        return this.siguiente;
    }

    public setSiguiente(siguiente: Nodo): void {
        this.siguiente = siguiente;
    }

    public getAnterior(): Nodo {
        return this.anterior;
    }

    public setAnterior(anterior: Nodo): void {
        this.anterior = anterior;
    }

    public getArriba(): Nodo {
        return this.arriba;
    }

    public setArriba(arriba: Nodo): void {
        this.arriba = arriba;
    }

    public getAbajo(): Nodo {
        return this.abajo;
    }

    public setAbajo(abajo: Nodo): void {
        this.abajo = abajo;
    }



}