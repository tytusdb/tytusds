export class NodoSimpleCircular{
    private numero: number | string
    private id:number;
    private siguiente: NodoSimpleCircular

    constructor(numero:number|string,id:number){
        this.numero = numero ;
        this.id = id;
        this.siguiente = null
    }

    setNumero(numero:number|string){
        this.numero = numero
    }
    
    setSiguiente(siguiente:NodoSimpleCircular){
        this.siguiente = siguiente
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




}