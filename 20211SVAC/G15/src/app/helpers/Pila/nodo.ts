export class nodo{
    private dato: number|string
    private id:number;
    private siguiente: nodo

    constructor(dato:number|string,id:number){
        this.dato = dato;
        this.id = id;
        this.siguiente = null
    }

    setDato(dato:number|string){
        this.dato = dato
    }
    
    setSiguiente(siguiente:nodo){
        this.siguiente = siguiente
    }


    getDato(){
        return this.dato
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




}