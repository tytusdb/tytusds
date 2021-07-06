export class nodo{
    private dato: number|string
    private id:number;
    private siguiente: nodo

    private estructura:any

   


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

    setId(id:number){
        this.id = id
    }

    getDato(){
        return this.dato
    }

    getId(){
        return this.id
    }

    getSiguiente(){
        return this.siguiente
    }


    public getEstructura(): any {
        return this.estructura;
    }

    public setEstructura(estructura: any): void {
        this.estructura = estructura;
    }


}