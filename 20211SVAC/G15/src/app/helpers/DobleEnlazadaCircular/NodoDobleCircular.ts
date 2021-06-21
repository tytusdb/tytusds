export class NodoDobleCircular{
    private numero: number|string
    private id:number;
    private siguiente: NodoDobleCircular
    private anterior: NodoDobleCircular

    constructor(numero:number|string,id:number){
        this.numero = numero;
        this.id = id;
        this.siguiente = null
        this.anterior = null
    }

    setNumero(numero:number|string){
        this.numero = numero
    }
    
    setSiguiente(siguiente:NodoDobleCircular){
        this.siguiente = siguiente
    }

    setAnterior(anterior:NodoDobleCircular){
        this.anterior = anterior
    }

    getNumero(){
        return this.numero
    }

    setId(id:number){
        this.id = id
    }

    getId(){
        return this.id
    }

    getSiguiente(){
        return this.siguiente
    }

    getAnterior(){
        return this.anterior
    }


}