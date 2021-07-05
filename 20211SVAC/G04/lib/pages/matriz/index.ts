class NodoEncabezado {

    public id: any
    public siguiente: any
    public anterior: any
    public nodoacceso: any

    constructor(id: any, siguiente: any, anterior: any, nodoacceso: any) {

        this.id = id

        this.siguiente = siguiente

        this.anterior = anterior

        this.nodoacceso = nodoacceso
    }
}
